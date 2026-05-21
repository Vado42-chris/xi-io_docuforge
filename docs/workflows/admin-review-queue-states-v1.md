# Admin Review Queue States v1

## Purpose

The admin review queue protects DocuForge from publishing unsafe, stale, copyrighted, private, or malformed form records.

No public-library form record or reconstructed helper PDF should be published without passing the relevant review gates.

## Review lanes

```txt
source_review
permissions_review
filled_content_review
field_map_review
public_publish_review
retirement_review
```

## Queue item contract

```ts
export type ReviewQueueItem = {
  reviewItemId: string;
  libraryRecordId: string;
  templateVersionId?: string;
  lane: ReviewLane;
  state: ReviewState;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  riskFlags: string[];
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  dueAt?: string;
  decision?: ReviewDecision;
};
```

## Review lanes

### Source review

Confirms:

- source URL exists when claimed
- issuing body is plausible
- jurisdiction is plausible
- source metadata is complete enough for listing

### Permissions review

Confirms:

- rights status is not unknown
- attribution requirements are recorded
- public listing is allowed
- helper PDF distribution is allowed before publishing a reconstructed copy

### Filled-content review

Confirms:

- uploaded form appears blank
- any detected values are false positives or non-personal sample text
- public submission should remain blocked if private values are present

### Field map review

Confirms:

- every editable field has `fieldUuid`
- meaningful fields have `semanticKey` or binding notes
- PDF bindings map to field UUIDs
- table/cell fields are represented where needed
- field review state is complete

### Public publish review

Final gate before public listing.

Confirms:

- source review passed
- permissions review passed
- filled-content review passed or was not needed
- field map review passed if helper artifacts exist
- warnings and official-source links are visible

### Retirement review

Used when a form is stale, superseded, revoked, or unsafe.

## States

```txt
queued
in_review
blocked
changes_requested
approved
rejected
retired
```

## Decisions

```ts
export type ReviewDecision = {
  decisionType: 'approve' | 'reject' | 'request_changes' | 'block' | 'retire';
  decidedBy: string;
  decidedAt: string;
  notes?: string;
};
```

## Risk flags

Recommended risk flags:

```txt
unknown_rights
government_form
court_form
third_party_brand
possible_filled_data
possible_signature
possible_identifier
source_missing
source_stale
field_map_incomplete
table_mapping_incomplete
helper_pdf_not_allowed
```

## Publication gate summary

A public library record may be published only when:

1. Source review is approved.
2. Permissions review is approved.
3. Filled-content risk is cleared.
4. If helper artifacts exist, field map review is approved.
5. Public publish review is approved.

## Admin UX requirements

Each queue item should show:

- form title
- source URL
- jurisdiction
- issuing body
- rights status
- document class
- risk flags
- available artifacts
- review history
- recommended next action

## Event log

Recommended events:

- `review.item_created`
- `review.started`
- `review.blocked`
- `review.changes_requested`
- `review.approved`
- `review.rejected`
- `review.retired`
- `form.published`

## No-content-leak rule

Review logs may describe decisions and risk flags, but should not store private filled values, signatures, government identifiers, or personal narratives.
