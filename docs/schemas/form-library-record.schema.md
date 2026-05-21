# FormLibraryRecord Schema Contract v1

## Purpose

`FormLibraryRecord` is the public/library catalog record for one blank form family or one published template entry.

It answers:

- what form this is
- where it came from
- whether it can be shared
- which artifacts users can safely access
- whether the form is current, stale, private, or retired

## Core invariant

A `FormLibraryRecord` must never store filled user answers.

It may reference source artifacts, generated helper artifacts, preview artifacts, and template schema artifacts.

## TypeScript contract

```ts
export type FormLibraryRecord = {
  id: string;
  templateId: string;
  title: string;
  normalizedTitle: string;
  formNumber?: string;
  jurisdiction?: JurisdictionRef;
  issuingBody?: IssuingBodyRef;
  categories: string[];
  tags: string[];
  description?: string;
  plainLanguagePurpose?: string;

  source: SourceRecord;
  rights: RightsStatus;
  security: FormSecurityStatus;
  lifecycle: FormLifecycleStatus;
  artifacts: FormArtifacts;
  search: FormSearchMetadata;
  review: FormReviewStatus;
  audit: FormAuditSummary;
};
```

## Required fields

### `id`

Unique library record ID.

Recommended pattern:

```txt
flr_01HY7ZK6T9QJ7ZVJFMN3K8M4AE
```

### `templateId`

Stable form family identity used across versions.

Example:

```txt
sk-family-financial-statement
```

### `title`

Human-readable title.

Example:

```txt
Financial Statement
```

### `normalizedTitle`

Lowercase/search-normalized title for dedupe and matching.

Example:

```txt
financial statement
```

## Source record

```ts
export type SourceRecord = {
  sourceType: 'official_url' | 'user_upload' | 'admin_upload' | 'manual_entry';
  sourceUrl?: string;
  sourceHost?: string;
  issuingAuthority?: string;
  jurisdiction?: string;
  retrievedAt?: string;
  verifiedAt?: string;
  sourceHash?: string;
  originalFilename?: string;
  copyrightNotice?: string;
  licenseStatus: 'verified' | 'permission_needed' | 'unknown' | 'user_owned' | 'open_license';
  sourceConfidence: 'low' | 'medium' | 'high';
};
```

## Rights status

```ts
export type RightsStatus = {
  status:
    | 'official_public_source'
    | 'permission_needed'
    | 'user_owned'
    | 'open_license'
    | 'third_party_copyrighted'
    | 'unknown'
    | 'rejected';
  attributionRequired: boolean;
  commercialUseAllowed: boolean | 'unknown';
  allowPublicListing: boolean;
  allowOriginalDownload: boolean;
  allowHelperPdfDownload: boolean;
  allowCloneTemplate: boolean;
  permissionEvidence?: string;
  rightsNotes?: string;
};
```

## Security status

```ts
export type FormSecurityStatus = {
  documentClass:
    | 'blank_public_form'
    | 'blank_restricted_form'
    | 'blank_unknown_rights_form'
    | 'private_user_document'
    | 'filled_sensitive_document'
    | 'rejected_document';
  filledDataDetected: boolean;
  filledDetectionConfidence?: number;
  publicEligible: boolean;
  publicBlockReason?: string;
  sensitiveAdjacent: boolean;
  malwareScanStatus: 'not_scanned' | 'passed' | 'failed' | 'not_required';
};
```

## Lifecycle status

```ts
export type FormLifecycleStatus = {
  status:
    | 'draft'
    | 'private'
    | 'workspace'
    | 'needs_review'
    | 'approved'
    | 'published'
    | 'retired'
    | 'rejected';
  currentTemplateVersionId?: string;
  versionLabel?: string;
  versionDate?: string;
  lastVerifiedAt?: string;
  staleAfter?: string;
  supersededBy?: string;
};
```

## Artifacts

```ts
export type FormArtifacts = {
  originalPdfId?: string;
  officialSourceUrl?: string;
  fillablePdfId?: string;
  templateSchemaId?: string;
  previewImageIds?: string[];
  thumbnailId?: string;
};
```

## Search metadata

```ts
export type FormSearchMetadata = {
  aliases: string[];
  keywords: string[];
  jurisdictionTokens: string[];
  issuingBodyTokens: string[];
  formNumberTokens: string[];
  language?: string;
};
```

## Review status

```ts
export type FormReviewStatus = {
  reviewState:
    | 'not_reviewed'
    | 'source_review_needed'
    | 'permissions_review_needed'
    | 'field_map_review_needed'
    | 'approved_for_private_use'
    | 'approved_for_public_library'
    | 'rejected';
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNotes?: string;
};
```

## Audit summary

```ts
export type FormAuditSummary = {
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  lastEventType?: string;
  lastEventAt?: string;
};
```

## Minimal example

```json
{
  "id": "flr_01HY7ZK6T9QJ7ZVJFMN3K8M4AE",
  "templateId": "sk-family-financial-statement",
  "title": "Financial Statement",
  "normalizedTitle": "financial statement",
  "formNumber": "unknown",
  "jurisdiction": {
    "country": "CA",
    "province": "SK"
  },
  "issuingBody": {
    "name": "Unknown issuing body"
  },
  "categories": ["legal", "family_law"],
  "tags": ["financial_disclosure", "court_form"],
  "source": {
    "sourceType": "official_url",
    "sourceUrl": "https://example.invalid/form.pdf",
    "licenseStatus": "permission_needed",
    "sourceConfidence": "medium"
  },
  "rights": {
    "status": "permission_needed",
    "attributionRequired": true,
    "commercialUseAllowed": "unknown",
    "allowPublicListing": true,
    "allowOriginalDownload": false,
    "allowHelperPdfDownload": false,
    "allowCloneTemplate": false
  },
  "security": {
    "documentClass": "blank_restricted_form",
    "filledDataDetected": false,
    "publicEligible": false,
    "sensitiveAdjacent": true,
    "malwareScanStatus": "not_scanned"
  },
  "lifecycle": {
    "status": "needs_review"
  },
  "artifacts": {},
  "search": {
    "aliases": [],
    "keywords": ["financial", "statement"],
    "jurisdictionTokens": ["canada", "saskatchewan", "sk"],
    "issuingBodyTokens": [],
    "formNumberTokens": [],
    "language": "en"
  },
  "review": {
    "reviewState": "permissions_review_needed"
  },
  "audit": {
    "createdAt": "2026-05-21T00:00:00Z",
    "updatedAt": "2026-05-21T00:00:00Z"
  }
}
```

## Publication gate

A record cannot become `published` unless:

1. `source.licenseStatus` is not `unknown`.
2. `rights.allowPublicListing` is true.
3. `security.filledDataDetected` is false.
4. `security.publicEligible` is true.
5. `review.reviewState` is `approved_for_public_library`.
6. At least one safe egress path exists: official link, original download, or helper PDF download.
