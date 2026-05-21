# xi-io DocuForge

## Purpose

`xi-io_docuforge` is the Xibalba / xi-io blank-form library and document reconstruction project.

Its first purpose is practical and narrow:

- help users find the blank forms they need
- preserve official source links, provenance, permissions, and version status
- rebuild hostile non-editable PDFs into clean fillable PDFs where permissions allow
- save every approved form as a structured template with stable field identities
- prepare the foundation for future private products that can safely auto-fill forms from trusted user data

## Product invariant

DocuForge is not a sensitive-document hoarder.

The public/library product stores blank form templates, official source references, review metadata, and generated helper artifacts. Filled user documents, legal evidence, financial records, and private case data belong only in a separate private workspace with explicit security controls.

## Core architecture

DocuForge follows the xi-io ingress, analysis, lexicon, egress model:

- Ingress: official URLs, blank PDFs, admin uploads, user-submitted blank forms
- Analysis: blank-vs-filled detection, form classification, permission risk, field detection, table reconstruction
- Lexicon: jurisdictions, issuing bodies, form aliases, legal/admin terms, semantic field keys
- Egress: official source links, reconstructed fillable PDFs, web form previews, JSON schema, downstream private workflow handoff

## Field identity rule

The PDF is not the source of truth.

Every approved template must persist a canonical backend field map before publication:

- `templateId` identifies the form family
- `templateVersionId` identifies a specific source/layout revision
- `fieldUuid` identifies each editable field on that version
- `semanticKey` identifies what the field means across products
- `pdfFieldName` is only an export mapping, not the canonical identity

## Security posture

DocuForge treats legal, government, identity, medical, and financial forms as sensitive-adjacent even when blank.

Public-library publishing requires provenance and permissions review. Filled-form detection must block public submission when personal data appears to be present.

## Current status

Bootstrap planning repository. No production app code yet.

## xi-io.net management

This repo is intended to be registered with the private `xi-io.net` Workbench / Ops Console as an active managed project for portfolio tracking.
