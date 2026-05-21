# Upload Declaration Workflow v1

## Purpose

This workflow controls how a user or admin adds a blank form to DocuForge.

The goal is to preserve provenance, prevent accidental public upload of filled forms, and route each upload into the correct review lane.

## Workflow states

```txt
started
file_selected
preflight_pending
preflight_complete
declaration_pending
declaration_complete
filled_detection_pending
filled_detection_complete
routing_pending
private_saved
workspace_saved
public_review_requested
blocked_filled_content
rejected
```

## Step 1: File selected

User selects a PDF or supported image format.

System records:

- original filename
- file size
- MIME type
- file signature result
- upload timestamp
- user/session identifier when available

## Step 2: Preflight

System checks:

- allowed file type
- valid file signature
- file size limit
- page count
- encrypted/password-protected status
- unsafe embedded content where detectable
- malware scan status when available

Failure routes to `rejected` or quarantine.

## Step 3: Declaration questions

Ask the uploader:

1. Is this form blank?
2. Who owns or issued this form?
3. Where did the form come from?
4. Is there an official source URL?
5. Can this form be shared publicly?
6. Should this upload remain private, workspace-only, or be submitted to the public library?

## Step 4: Source classification

System classifies source as one of:

```txt
official_url
user_created
business_or_organization
found_online
unknown
```

## Step 5: Rights classification

System proposes one rights status:

```txt
official_public_source
permission_needed
user_owned
open_license
third_party_copyrighted
unknown
rejected
```

Uploader can provide notes or evidence, but public-library approval requires review.

## Step 6: Filled-form detection

System attempts to detect filled content before public submission.

Detection targets:

- handwriting
- typed values inside form fields
- signatures
- phone numbers
- email addresses
- addresses
- birthdates
- government identifiers
- account/case/file numbers
- personal narrative statements

If likely filled content is detected:

- public-library submission is blocked
- uploader may delete the file
- uploader may save privately only if a private workspace exists and policy allows it
- no public template is created from the file

## Step 7: Routing

### Private

Used when:

- user wants private use only
- rights are unknown
- filled content is detected and private workspace is enabled

### Workspace

Used when:

- form should be shared only within a trusted workspace
- public rights are unclear

### Public review

Used when:

- form appears blank
- source metadata exists
- uploader requests public submission
- rights are plausible but need review

## Step 8: Review queue handoff

Public review submission creates:

- `FormLibraryRecord` draft
- source record
- rights status
- security status
- upload audit event
- review queue item

No public listing is created until review approval.

## UX copy principles

Use plain language.

Good:

```txt
This looks like it may contain filled-in personal information. Public submission is blocked.
```

Bad:

```txt
Potential PII entity entropy detected in source payload.
```

## Event log

Recommended events:

- `form.upload_started`
- `form.preflight_completed`
- `form.source_declared`
- `form.rights_declared`
- `form.filled_detection_completed`
- `form.public_submission_blocked`
- `form.private_saved`
- `form.public_review_requested`
- `form.rejected`

## Acceptance criteria

- User cannot submit directly to public library without declaration.
- Likely filled forms are blocked from public submission.
- Unknown-rights forms default to private or review, not public.
- Every public-review candidate has source, rights, security, and audit metadata.
