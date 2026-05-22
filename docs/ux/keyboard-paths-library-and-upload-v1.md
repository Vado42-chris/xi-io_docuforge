# Keyboard Paths: Library and Upload v1

## Purpose

This document records the expected keyboard paths for the first DocuForge routes:

- `/library`
- `/upload`

These paths are intentionally simple so the project has a baseline before review cockpit, admin queue, PDF viewer, or field-map editor complexity is added.

## Global expectations

- Focus must be visible for every interactive element.
- Tab order should follow visual reading order.
- Navigation should be reachable before page workflow controls.
- Disabled actions should remain visible but not focusable as actionable controls.
- Users should not need a mouse to complete front-end-only declaration flows.

## `/library` keyboard path

Expected order:

1. Browser focus enters DocuForge brand/home link.
2. Navigation links:
   - Library
   - Upload
   - Review
   - Admin
3. Page action button, currently disabled: Upload workflow pending.
4. Search input.
5. Result card links/actions, none yet in the current shell.

Expected behavior:

- Active Library nav item exposes `aria-current="page"`.
- Search input has a visible label linked with `htmlFor="form-search"`.
- Typing in search filters seed records.
- Empty state appears when no records match.
- Status badges remain readable as text.

## `/upload` keyboard path

Expected order:

1. Browser focus enters DocuForge brand/home link.
2. Navigation links:
   - Library
   - Upload
   - Review
   - Admin
3. File placeholder input.
4. Blank-form attestation checkbox.
5. Permission-to-store checkbox.
6. Source type select.
7. Source URL input.
8. Issuing body input.
9. Jurisdiction input.
10. Routing radio buttons:
    - Private draft
    - Workspace review
    - Submit for public-library review
11. Filled personal data simulation checkbox.
12. Save declaration placeholder button, enabled or disabled depending on state.

Expected behavior:

- Active Upload nav item exposes `aria-current="page"`.
- Declaration sections use `fieldset` and `legend` where grouped inputs are present.
- Public review becomes blocked if filled-content simulation is active.
- Blocked state uses explicit visible warning copy.
- Save placeholder is disabled when public review is blocked or permission-to-store is unchecked.
- No real file upload control exists in this slice.

## Manual QA checklist

For each route:

1. Open route directly.
2. Use Tab only.
3. Confirm visible focus on each focusable element.
4. Confirm Shift+Tab reverses order predictably.
5. Confirm Enter/Space operate buttons, checkboxes, and radio controls where appropriate.
6. Confirm warning text appears without requiring hover.
7. Confirm no hidden control traps focus.
8. Confirm browser zoom to 200% remains usable.

## Known limitations

This document does not replace screen reader QA.

Before production, test at least:

- NVDA + Firefox or Chrome
- VoiceOver + Safari
- keyboard-only browser use
- high zoom / low vision scenario
