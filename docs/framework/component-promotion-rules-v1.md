# Component Promotion Rules v1

## Purpose

DocuForge is being used as a proving ground for xi-io UI framework patterns.

This document defines which components can be promoted into the shared xi-io framework and which must remain DocuForge-specific.

## Naming rule

```txt
Xi* = framework-promotable shared primitive or layout component
Df* = DocuForge-specific organism, page, or workflow component
```

## Xi component requirements

A component can remain under the `Xi*` prefix only when it is:

1. Domain-neutral.
2. Useful across multiple xi-io products.
3. Styled only through xi tokens and generic state classes.
4. Accessible by default.
5. Free of DocuForge-specific copy, form concepts, PDF concepts, permissions logic, or library-specific state.

## Df component requirements

A component should use the `Df*` prefix when it knows about:

- blank forms
- source/provenance
- permissions review
- filled-form warnings
- form records
- form templates
- field maps
- PDF viewer/editor workflows
- DocuForge route decisions

## Current component inventory

### Framework-promotable candidates

- `XiAppShell`
- `XiBadge`
- `XiButton`
- `XiEmptyState`
- `XiNotice`
- `XiPageHeader`

These are intentionally simple and generic in `DOCUFORGE-SHELL-01`.

### DocuForge-specific components

- `DfFormSearchBar`
- `DfLibraryResults`
- `DfLibraryPage`
- `PlaceholderPage`

`PlaceholderPage` may later become a generic xi-io route placeholder if it remains domain-neutral.

## Storybook rule

Every `Xi*` primitive should have Storybook coverage before being promoted to a shared framework package.

Each story should include:

- normal state
- disabled or empty state where applicable
- warning/error state where applicable
- focus-visible behavior inherited from token CSS
- plain-language examples

## Promotion process

1. Build locally in DocuForge.
2. Add Storybook stories.
3. Confirm accessibility expectations.
4. Confirm no DocuForge-specific references remain.
5. Promote to xi-io framework package or copy into the framework repo with matching story files.
6. Replace DocuForge local import paths with framework import paths.

## Anti-patterns

Do not promote components that contain hidden product assumptions.

Examples:

- a generic badge that knows about `permissions_review_needed`
- a generic shell that hardcodes DocuForge nav
- a generic notice that contains blank-form safety copy
- a generic table that expects `FormLibraryRecord`

Those belong in `Df*` components or product adapters.
