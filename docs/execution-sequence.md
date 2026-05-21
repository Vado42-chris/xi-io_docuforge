# DocuForge Execution Sequence

## Current gate

`DOCUFORGE-BOOTSTRAP-01`

## Mission

Create the xi-io DocuForge foundation as a managed Xibalba project.

DocuForge begins as a blank-form library and document reconstruction project. Its first public value is helping users find the forms they need and download clean fillable versions where permissions allow.

Future products may use the same template registry and field identity model to auto-fill forms in private workspaces. That future depends on stable field identity from the first implementation.

## Product spine

1. Register DocuForge with xi-io.net Workbench tracking.
2. Establish product invariant and repo agent rules.
3. Define form template field identity standard.
4. Define document security and permissions standard.
5. Define product brief and MVP scope.
6. Build searchable blank-form library shell.
7. Add upload and permission declaration workflow for blank forms.
8. Add admin/review queue for provenance and public eligibility.
9. Add field map editor and fillable PDF export after standards are stable.
10. Add downstream private-workspace handoff only after public-library safety is working.

## Bootstrap acceptance criteria

- Repository has README with product invariant.
- Repository has AGENTS.md with agent rules.
- Repository has this execution sequence.
- Repository has product brief.
- Repository has field identity standard.
- Repository has security and permissions standard.
- Repository has `npm run check` foundation validation.
- xi-io.net project registry contains project id `docuforge`.
- xi-io.net GitHub repo registry contains `Vado42-chris/xi-io_docuforge`.

## Open risks

- Government and court forms may be public to download but not always safe to republish or modify commercially.
- Users may accidentally upload filled forms.
- PDF field names are fragile and must not become canonical identity.
- Version changes in official forms can break mappings if not tracked carefully.
- OCR and document AI vendors may create privacy exposure if used before consent and redaction gates exist.

## Next gate

`DOCUFORGE-STANDARDS-01`

Goal: harden the form template, field identity, provenance, permissions, and security standards before building the app shell.
