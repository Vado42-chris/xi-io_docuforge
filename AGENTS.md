# AGENTS.md

## Project role

DocuForge is the xi-io blank-form library and document reconstruction project.

Agents working in this repository must protect the long-term product invariant:

> The backend template is the source of truth. PDFs are source artifacts or export artifacts, not the brain of the system.

## Current product scope

The first product is a searchable library of blank forms that helps users find, understand, and download the forms they need.

The first implementation must not become a filled-document storage product.

## Non-negotiable invariants

1. Public/library workflows store blank form templates, not completed user forms.
2. Filled user documents, legal evidence, private case material, medical data, identity records, and financial records require a separate private workspace with explicit security controls.
3. Every approved template must have stable field identities before publication.
4. Every editable field must have a backend `fieldUuid`.
5. Meaningful fields should have a durable `semanticKey` so future products can map user data into templates safely.
6. Native PDF field names are export mappings only. They are not canonical identities.
7. Official source links, provenance, rights status, and version information must be preserved.
8. Government, legal, medical, identity, and financial forms are sensitive-adjacent even when blank.
9. Public publishing requires permissions and provenance review.
10. Filled-form detection must block accidental public submission of personal data.

## xi-io architecture mapping

- Ingress: official URLs, blank PDFs, admin uploads, user-submitted blank forms
- Analysis: blank-vs-filled detection, source/provenance classification, permission risk, field detection, table reconstruction
- Lexicon: jurisdictions, issuing bodies, form aliases, legal/admin terms, semantic field keys
- Egress: official source links, reconstructed fillable PDFs, web previews, JSON schema, downstream private workflow handoff

## Development posture

Use small, reviewable slices.

Prefer documentation and contracts before implementation when architectural invariants are being introduced.

Do not introduce third-party APIs for OCR, AI, storage, analytics, or PDF processing without documenting:

- what data is sent
- why it is sent
- whether it may contain sensitive information
- retention behavior
- training/reuse behavior
- fallback/local-only behavior

## Validation

Run:

```bash
npm run check
```

The foundation check verifies required project documents and scans them for token-like secret strings.

## Current next work

1. Maintain the execution sequence.
2. Author and refine the field identity standard.
3. Author and refine the document security and permissions standard.
4. Build the first blank-form library shell only after the standards are stable enough to guide implementation.
