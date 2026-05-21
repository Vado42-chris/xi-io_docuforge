# Form Template Field Identity Standard v1

## Purpose

This standard defines how DocuForge stores blank form templates so future products can render, validate, export, and eventually auto-fill forms without guessing.

## Core rule

The backend template is the source of truth.

Native PDF field names are export mappings only. They must never be treated as canonical field identity.

## Required identity hierarchy

```txt
FormTemplate
  templateId
  templateVersionId

Page
  pageUuid
  pageIndex

Section
  sectionUuid

Table
  tableUuid
    rowUuid
    columnUuid
    cellUuid

FieldGroup
  groupUuid

Field
  fieldUuid
  semanticKey
  pdfFieldName
  webInputId
  dataBinding
```

## Required template identifiers

### `templateId`

Stable identity for the form family.

Example:

```txt
sk-family-financial-statement
```

### `templateVersionId`

Specific source/layout revision of the form.

Example:

```txt
sk-family-financial-statement--2026-05
```

A new official PDF version, layout change, or field geometry change requires a new `templateVersionId`.

## Required field identifiers

### `fieldUuid`

Stable identity for one editable field on one template version.

Field UUIDs must not be reused across unrelated layouts.

### `semanticKey`

Human/data meaning of the field. Semantic keys may persist across template versions when the meaning remains the same.

Examples:

```txt
person.primary.full_name
person.primary.date_of_birth
case.family.file_number
financial.income.employment.monthly_gross
address.service.street
```

### `pdfFieldName`

Generated export field name used in a fillable PDF.

This must map back to `fieldUuid`.

Recommended pattern:

```txt
df__fld_01HY7ZK6T9QJ7ZVJFMN3K8M4AE
```

## Minimum field line item

```ts
type FieldLineItem = {
  fieldUuid: string;
  templateVersionId: string;
  label: string;
  canonicalName: string;
  semanticKey?: string;
  pageIndex: number;
  geometry: {
    x: number;
    y: number;
    width: number;
    height: number;
    units: 'pdf_points';
  };
  fieldType: string;
  widgetType: string;
  pdfExportName: string;
  tabOrder?: number;
  groupId?: string;
  required: boolean;
  maxLength?: number;
  validationPattern?: string;
  detectionSource: 'manual' | 'ocr' | 'pdf_existing' | 'ai_inferred';
  confidence: number;
  reviewedBy?: string;
  reviewedAt?: string;
};
```

## Field groups

Radio groups, checkbox sets, and repeated option groups must have a `groupUuid`.

Each individual option still gets its own `fieldUuid`.

## Tables

Table-heavy forms must persist table identities.

Required table identities:

- `tableUuid`
- `rowUuid`
- `columnUuid`
- `cellUuid`
- `fieldUuid` for editable cells

This allows future products to fill structured rows and columns by meaning instead of by screen position.

## Version mapping

When a source form changes, DocuForge may suggest mappings between old and new semantic keys.

A human reviewer must approve mappings before a new template version is published.

## Publication gate

A reconstructed form cannot be published as an approved fillable helper template unless:

1. Every editable field has a `fieldUuid`.
2. Every PDF export field maps back to a `fieldUuid`.
3. Field geometry is recorded in PDF points.
4. Field type is recorded.
5. Review status is recorded.
6. Permissions and source provenance are recorded.

## Future auto-fill rule

Future auto-fill products should resolve fields in this order:

1. `semanticKey`
2. `fieldUuid`
3. PDF export mapping

They should never rely on visual guessing when a template field map exists.
