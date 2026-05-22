# DOCUFORGE-SHELL-01 Foundation UI Shell

## Status

Implemented remotely through GitHub connector. Local validation still required.

## Goal

Establish the first xi-io-compliant DocuForge UI foundation without starting PDF processing, OCR, upload backend, auto-fill, or filled-document storage.

## Scope completed

### App shell

- Added Vite + React + TypeScript app scaffold.
- Added `index.html`, `vite.config.ts`, `tsconfig.json`, and `tsconfig.app.json`.
- Added route scaffold for:
  - `/`
  - `/library`
  - `/upload`
  - `/review`
  - `/admin`

### xi-io primitives

Temporary local `Xi*` primitives were added so they can be promoted into the wider xi-io framework later:

- `XiAppShell`
- `XiBadge`
- `XiButton`
- `XiEmptyState`
- `XiNotice`
- `XiPageHeader`

### DocuForge organisms and pages

Added the first product-specific `Df*` organisms:

- `DfFormSearchBar`
- `DfLibraryResults`
- `DfLibraryPage`
- `PlaceholderPage`

### Domain contracts

Added typed contracts aligned with the existing schema docs:

- `FormLibraryRecord`
- `FormTemplate`
- `FormField`
- `ReviewState`
- rights, lifecycle, source, document-class, and geometry types

### Static seed data

Added `src/data/seedForms.ts` with review-safe sample records only.

No real government forms, private user files, filled forms, or legal evidence were added.

### Token bridge and visual system

Added:

- `src/styles/tokens.css`
- `src/styles/app.css`

The visual direction is a restrained document-studio shell:

- textured neutral surfaces
- high-contrast text
- visible focus rings
- restrained typography
- rights/security status badges
- responsive layout
- no modal-driven workflow

### Validation scaffold

Expanded `scripts/check-docuforge-foundation.mjs` to require app shell files, route entries, and token bridge entries.

## Explicit non-goals preserved

This slice did not implement:

- OCR
- PDF rewriting
- upload backend
- auto-fill
- filled form storage
- cloud AI integration
- PDF.js rendering
- pdf-lib export
- legal workflow automation
- government form scraping
- Storybook setup

## Storybook decision

Storybook is deferred to the next controlled slice.

Reason: this slice establishes runtime app foundation first. Storybook should follow immediately once the first primitive/organism inventory is stable, rather than being configured before the component surface settles.

## Local validation required

Run locally after pulling:

```bash
npm install
npm run check
npm run build
```

Expected checks:

- foundation files exist
- route scaffold is present
- token bridge is present
- TypeScript build passes
- Vite build passes

## Framework compliance notes

- `Xi*` components are intentionally generic and framework-promotable.
- `Df*` components are intentionally product-specific and can reference form/library concepts.
- `/library` is the first vertical page because it proves shell, tokens, typed records, search, badges, and safety copy without backend risk.
- Upload, review, admin, PDF viewing, and field mapping remain placeholders by design.

## Next slice

Recommended next slice:

`DOCUFORGE-STORYBOOK-01`

Goal:

- add Storybook
- add stories for each `Xi*` primitive
- add stories for `DfFormSearchBar` and `DfLibraryResults`
- add accessibility addon/configuration if feasible
- document component promotion rules for xi-io framework reuse

Alternative next slice:

`DOCUFORGE-UPLOAD-01`

Only choose this if the team wants to prove upload declaration UX before component workbench setup.
