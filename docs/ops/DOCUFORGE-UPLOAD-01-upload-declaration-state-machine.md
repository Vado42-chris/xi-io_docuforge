# DOCUFORGE-UPLOAD-01 Upload Declaration State Machine

## Status

Implemented remotely through GitHub connector. Local validation still required.

## Goal

Build the first upload declaration UX as a front-end state machine only.

This slice establishes the user-facing safety declaration and routing contract before backend upload, OCR, PDF rendering, or file storage work begins.

## Scope completed

### Domain model

Added:

- `src/domain/uploadDeclaration.ts`

Includes:

- `UploadWorkflowState`
- `UploadSourceType`
- `UploadVisibilityChoice`
- `UploadDeclarationDraft`
- `initialUploadDeclarationDraft`
- `deriveUploadWorkflowState`

Key supported states:

- `preflight_complete`
- `declaration_complete`
- `private_saved`
- `workspace_saved`
- `public_review_requested`
- `blocked_filled_content`

### Upload declaration component

Added:

- `src/components/df/DfUploadDeclaration.tsx`

The component models:

1. file placeholder
2. simulated preflight checklist
3. blank-form attestation
4. permission-to-store attestation
5. source and ownership declaration
6. visibility/routing choice
7. filled-form warning simulation
8. review-ready summary

### Upload route

Added:

- `src/pages/DfUploadPage.tsx`

Updated:

- `src/App.tsx`

`/upload` now renders the real front-end declaration workflow instead of the placeholder page.

### Storybook coverage

Added:

- `src/components/df/DfUploadDeclaration.stories.tsx`

Stories include:

- default state
- public review blocked state
- public review ready state

### Styling

Updated:

- `src/styles/app.css`

Added layout and form treatment for:

- upload workflow shell
- fieldsets
- checkbox rows
- radio-card choices
- simulated checklist
- stacked summary facts
- danger notice state

### Validation

Updated:

- `scripts/check-docuforge-foundation.mjs`

The check now requires:

- upload domain file
- upload declaration component
- upload declaration story
- upload page
- `/upload` wired to `DfUploadPage`
- required upload states

## Explicit non-goals preserved

This slice did not implement:

- backend upload
- file persistence
- OCR
- PDF.js rendering
- pdf-lib export
- auto-fill
- filled-form storage
- cloud AI or document intelligence
- government scraping

## UX/security notes

The upload declaration deliberately says:

- this is front-end only
- no file is uploaded or stored yet
- blank forms only
- public submission is blocked when filled personal data is simulated

This preserves the public-library safety invariant.

## Local validation required

Run locally after pulling:

```bash
npm install
npm run check
npm run build
npm run storybook
npm run build-storybook
```

Then inspect:

- `http://localhost:5173/upload`
- Storybook story: `DocuForge/Workflows/DfUploadDeclaration`

## Known validation risk

Local TypeScript/Storybook validation may identify strict typing or Storybook package export issues because dependencies currently use `latest`.

## Next recommended slice

`DOCUFORGE-A11Y-01`

Purpose:

- add automated accessibility gates where practical
- review keyboard/focus behavior for library and upload flows
- document accessibility requirements before review cockpit/admin queue complexity begins

Alternative next slice:

`DOCUFORGE-ADMIN-01`

Only choose this after local validation confirms the upload declaration UI is healthy.
