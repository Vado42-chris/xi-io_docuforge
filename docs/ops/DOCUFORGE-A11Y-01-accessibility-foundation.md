# DOCUFORGE-A11Y-01 Accessibility Foundation

## Status

Implemented remotely through GitHub connector. Local validation still required.

## Goal

Add accessibility gates and review documentation before DocuForge adds denser admin, review cockpit, PDF viewer, or field-map editor screens.

## Scope completed

### Accessibility standard

Added:

- `docs/framework/accessibility-standard-v1.md`

Defines baseline rules for:

- visible labels and accessible names
- fieldsets and legends
- `aria-current="page"` on active navigation
- tokenized focus visibility
- status text that does not rely on color alone
- warning and blocked-state copy
- keyboard usability
- future PDF viewer and admin/review requirements

### Keyboard path documentation

Added:

- `docs/ux/keyboard-paths-library-and-upload-v1.md`

Documents expected keyboard paths for:

- `/library`
- `/upload`

Includes manual QA checklist for tab order, focus visibility, checkbox/radio behavior, warning visibility, no keyboard traps, and 200 percent zoom review.

### Static accessibility gate

Added:

- `scripts/check-a11y-foundation.mjs`

The check validates:

- linked library search label
- active navigation `aria-current`
- tokenized focus styles
- Storybook a11y addon configuration
- upload fieldsets and legends
- upload labels
- upload named section
- explicit public blocked warning copy
- accessibility docs presence

### Package script

Updated:

- `package.json`

Added:

```bash
npm run check:a11y
```

`npm run check` now chains:

```bash
node scripts/check-docuforge-foundation.mjs && npm run check:a11y
```

### Foundation check

Updated:

- `scripts/check-docuforge-foundation.mjs`

Now requires:

- accessibility standard
- keyboard path doc
- accessibility check script
- `check:a11y` package script

## Explicit non-goals preserved

This slice did not implement:

- backend upload
- OCR
- PDF.js rendering
- PDF export
- auto-fill
- filled-form storage
- admin queue
- review cockpit
- visual redesign

## Local validation required

Run locally after pulling:

```bash
npm install
npm run check
npm run check:a11y
npm run build
npm run build-storybook
```

Then manually inspect:

- `/library` keyboard path
- `/upload` keyboard path
- Storybook a11y panel where available

## Known limitation

The static a11y gate catches structural regressions only. It does not replace browser testing, screen reader testing, automated axe runs, or high-zoom manual review.

## Next recommended slice

`DOCUFORGE-ADMIN-01`

Build the admin review queue shell using the existing review states, with static data only and no backend persistence.

Alternative:

`DOCUFORGE-LOCAL-VALIDATION-01`

Run local install/build/storybook validation and patch dependency or TypeScript issues before adding more features.
