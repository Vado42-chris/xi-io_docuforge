# DocuForge Accessibility Standard v1

## Purpose

DocuForge will eventually handle legal, government, financial, medical, and identity-adjacent blank forms. The UI must be usable by people under stress, on older devices, with assistive technology, and with limited time.

Accessibility is a product requirement, not a polish pass.

## Scope

This standard applies to:

- public blank-form library
- upload declaration workflow
- future review cockpit
- future admin queue
- future PDF viewer and field-map editor

## Baseline rules

1. All interactive controls must have visible labels or accessible names.
2. Form groups must use semantic grouping where appropriate, especially `fieldset` and `legend`.
3. Navigation must expose the active page with `aria-current="page"`.
4. Focus must be visible and tokenized through the xi-io token bridge.
5. Status must not rely on color alone.
6. Warnings must use clear text and semantic structure.
7. Public blocked states must explain what happened and what the user can safely do next.
8. Keyboard users must be able to reach every interactive control in a predictable order.
9. Empty states must communicate next actions in plain language.
10. Accessibility checks must run before dense workflow screens are added.

## Color and status

Badges may use color, but every badge must also contain visible text.

Examples:

```txt
permission needed
sensitive adjacent
public review requested
blocked filled content
```

Do not use color-only meaning.

## Focus behavior

All focusable controls should inherit the global `:focus-visible` rule from `src/styles/app.css`.

Required tokens:

- `--xi-color-focus`
- `--xi-focus-ring`

## Library page requirements

The `/library` route must include:

- primary navigation with active route state
- page heading
- clear blank-form safety notice
- search input with linked label
- search result region with semantic section or article structure
- status badges with visible text
- empty state when no results match

## Upload page requirements

The `/upload` route must include:

- page heading
- no-file-persistence notice while upload is front-end only
- blank-form safety notice
- grouped declaration controls using fieldsets and legends
- visible labels for text inputs and selects
- radio choices for routing
- checkbox controls for attestations
- explicit blocked state when filled content is detected and public review is selected

## Manual keyboard path checklist

For every new workflow page:

1. Tab from the browser address bar into the page.
2. Confirm focus is visible.
3. Confirm navigation links are reachable.
4. Confirm form fields are reached in visual order.
5. Confirm radio and checkbox groups can be operated by keyboard.
6. Confirm disabled actions are visibly disabled.
7. Confirm warning states are readable without mouse interaction.
8. Confirm there is no keyboard trap.

## Future requirements

Before PDF viewer work:

- define keyboard behavior for page navigation, zoom, and field selection
- define non-visual summary of PDF page and field map status
- define keyboard path for field-map editing
- define alternative text strategy for page thumbnails and scanned previews

Before admin/review work:

- define table/list keyboard navigation
- define review decision semantics
- define error summary behavior
- define bulk-action safeguards

## Static checks

`npm run check:a11y` should catch obvious structural regressions. It is not a replacement for browser testing, screen reader testing, or automated axe checks.

Static checks may verify:

- linked labels exist for known inputs
- `aria-current` exists on active navigation
- Storybook a11y addon remains configured
- fieldsets and legends remain present in upload declaration
- blocked public submission copy remains present
- focus tokens remain present

## Product tone

Use plain language.

Good:

```txt
Public submission is blocked because this appears to contain entered values or personal data.
```

Bad:

```txt
PII payload confidence exceeded public ingest threshold.
```
