# DOCUFORGE-STORYBOOK-01 Component Workbench

## Status

Implemented remotely through GitHub connector. Local validation still required.

## Goal

Add Storybook as the component workbench for the first DocuForge UI foundation.

This lets the team review xi-io-compatible primitives and DocuForge-specific organisms before building upload, review cockpit, admin queue, PDF viewer, or field map editor workflows.

## Scope completed

### Storybook setup

Added:

- `.storybook/main.ts`
- `.storybook/preview.ts`
- `npm run storybook`
- `npm run build-storybook`
- Storybook React Vite dependency
- Storybook docs addon
- Storybook accessibility addon

Storybook preview imports the existing token bridge and app CSS:

- `src/styles/tokens.css`
- `src/styles/app.css`

### Xi primitive stories

Added stories for:

- `XiAppShell`
- `XiBadge`
- `XiButton`
- `XiEmptyState`
- `XiNotice`
- `XiPageHeader`

### DocuForge organism stories

Added stories for:

- `DfFormSearchBar`
- `DfLibraryResults`

### Framework promotion rules

Added:

- `docs/framework/component-promotion-rules-v1.md`

This document defines the boundary between:

- `Xi*`, framework-promotable shared primitives
- `Df*`, DocuForge-specific organisms and workflow components

## Explicit non-goals preserved

This slice did not implement:

- upload backend
- OCR
- PDF.js rendering
- pdf-lib export
- auto-fill
- filled-form storage
- PDF overlay editor
- admin queue logic
- cloud AI or analytics

## Validation scaffold

Expanded `scripts/check-docuforge-foundation.mjs` to require:

- Storybook config files
- all current story files
- Storybook package scripts
- Storybook CSS imports
- existing route and token checks

## Local validation required

Run locally after pulling:

```bash
npm install
npm run check
npm run build
npm run storybook
npm run build-storybook
```

## Known local-validation risk

Storybook packages use `latest` in `package.json`. If Storybook changes its package exports, local install may require pinning compatible versions. Treat local validation as the source of truth.

## Next slice options

### Recommended

`DOCUFORGE-UPLOAD-01`

Build upload declaration UX as a front-end state machine only:

- no backend upload
- no file persistence
- no OCR
- no PDF processing
- no cloud AI

### Alternative

`DOCUFORGE-A11Y-01`

Add automated accessibility testing with Storybook/aXe and document keyboard expectations before building upload UX.
