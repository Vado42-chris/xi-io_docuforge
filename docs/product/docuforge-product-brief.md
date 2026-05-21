# DocuForge Product Brief

## One-line promise

Help users find the blank forms they need, then provide clean, well-structured fillable versions where permissions and provenance allow.

## Product type

DocuForge is a blank-form library and document reconstruction engine.

It is not, in its public/library mode, a filled legal-document storage product.

## Primary users

- People trying to find government, legal, administrative, benefit, housing, family, and small-business forms
- Self-represented users who need forms but do not want to fight hostile PDFs
- Internal Xibalba products that need reliable blank templates and stable field maps
- Future private workflow products that may use approved templates to auto-fill documents in secure user-controlled contexts

## First MVP

The first MVP should support:

1. Search blank-form records.
2. View form detail pages with source, jurisdiction, version, rights, and warnings.
3. Download official source PDFs when allowed.
4. Download reconstructed fillable PDFs when permissions allow.
5. Submit a blank form for private use or public-library review.
6. Declare source and permissions during submission.
7. Detect and block likely filled forms from public submission.
8. Maintain a canonical field map for approved reconstructed templates.

## Non-goals for MVP

- Store filled user forms in the public library.
- Auto-fill user forms.
- Provide legal advice.
- File forms with courts or government agencies.
- Scrape government form repositories without terms and permission review.
- Use cloud OCR or AI on sensitive documents without explicit consent and policy documentation.

## Core objects

- Form record
- Source record
- Distribution policy
- Template version
- Page model
- Section model
- Field line item
- Field group
- Table model
- Export artifact
- Review event

## Success criteria

A user can search for a form, understand where it came from, see whether a fillable helper copy exists, and download the safest available version.

An internal product can reference a template by `templateId`, a specific revision by `templateVersionId`, and any editable field by `fieldUuid` or `semanticKey` without guessing PDF coordinates.
