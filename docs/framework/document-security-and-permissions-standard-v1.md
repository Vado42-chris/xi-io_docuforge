# Document Security and Permissions Standard v1

## Purpose

This standard defines the public-library safety model for DocuForge.

DocuForge begins as a blank-form library. It must not accidentally become a public storage system for filled legal, medical, financial, identity, or private user documents.

## Core rule

Public/library mode stores blank forms, source records, template schemas, generated helper artifacts, and review metadata.

Filled user data belongs only in a separate private workspace with explicit security, consent, encryption, retention, and deletion rules.

## Document classes

```txt
blank_public_form
blank_restricted_form
blank_unknown_rights_form
private_user_document
filled_sensitive_document
rejected_document
```

## Public eligibility

A form is public-library eligible only when all conditions are true:

1. It appears to be blank.
2. It has source/provenance metadata.
3. Its rights status allows public listing or helper copy distribution.
4. It has passed review.
5. It does not contain personal user-entered data.
6. It does not contain malware or unsafe embedded content.

## Rights statuses

```txt
official_public_source
permission_needed
user_owned
open_license
third_party_copyrighted
unknown
rejected
```

## Upload declaration questions

When a user uploads a blank form, ask:

1. Who owns this form?
2. Where did it come from?
3. Is it blank?
4. Can it be shared?
5. Should it remain private, workspace-only, or be submitted for public-library review?

## Filled-form detection gate

Before public submission, DocuForge must attempt to detect:

- signatures
- handwriting
- typed values inside blank fields
- phone numbers
- emails
- addresses
- birthdates
- government identifiers
- case numbers
- account numbers
- obvious personal statements

If likely filled content is detected, public submission is blocked by default.

## Government and legal forms

Government and court forms may be publicly downloadable but still require source, attribution, terms, and republication review.

Do not assume a public PDF can be commercially modified or redistributed.

For official forms, the default public page should prefer:

1. Official source link
2. Source metadata
3. Helper/reconstructed artifact only when permissions allow
4. Warning to verify with the official source before filing

## Required source metadata

```ts
type SourceRecord = {
  sourceType: 'official_url' | 'user_upload' | 'admin_upload' | 'manual_entry';
  sourceUrl?: string;
  issuingAuthority?: string;
  jurisdiction?: string;
  retrievedAt?: string;
  verifiedAt?: string;
  copyrightNotice?: string;
  licenseStatus: 'verified' | 'permission_needed' | 'unknown' | 'user_owned' | 'open_license';
};
```

## Required distribution policy

```ts
type DistributionPolicy = {
  visibility: 'private' | 'workspace' | 'public';
  allowDownload: boolean;
  allowClone: boolean;
  allowEditReplica: boolean;
  attributionRequired: boolean;
  commercialUseAllowed: boolean | 'unknown';
  permissionEvidence?: string;
};
```

## Audit events

Audit events should track process integrity without leaking personal content.

Allowed examples:

- `form.uploaded`
- `form.source_declared`
- `form.filled_detection_completed`
- `form.public_submission_blocked`
- `form.permissions_review_requested`
- `form.permissions_review_completed`
- `form.template_generated`
- `form.field_map_approved`
- `form.published`
- `form.retired`

Do not store personal field values in public-library audit logs.

## Security posture

Minimum controls:

- validate file type and file signature
- reject unsafe extensions
- generate internal filenames
- enforce size limits
- quarantine suspicious uploads
- never execute embedded PDF JavaScript
- scan for likely personal data before public submission
- keep public-library artifacts separate from private user workspaces
- do not send documents to OCR or AI services without explicit policy and consent

## UX warnings

Public form pages should include:

- official source link where available
- last verified date
- version/date where available
- permissions status
- attribution requirements
- warning to verify with official source before filing

## Non-goal

This standard does not define a full private filled-document product. That must be handled in a separate private-workspace standard before implementation.
