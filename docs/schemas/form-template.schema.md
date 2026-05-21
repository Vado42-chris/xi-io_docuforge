# FormTemplate Schema Contract v1

## Purpose

`FormTemplate` is the canonical structured representation of one specific form layout version.

It answers:

- which pages exist
- which sections exist
- which tables exist
- which editable fields exist
- where fields appear
- what each field means
- how each field maps to PDF and web exports

## Core invariant

The template is the source of truth.

PDF field names, web input IDs, and generated artifacts must map back to template identities.

## TypeScript contract

```ts
export type FormTemplate = {
  templateId: string;
  templateVersionId: string;
  libraryRecordId: string;
  title: string;
  versionLabel?: string;
  sourceDocumentId?: string;

  pages: FormPage[];
  sections: FormSection[];
  fields: FormField[];
  groups: FormFieldGroup[];
  tables: FormTable[];

  exports: TemplateExportMapping;
  review: TemplateReviewStatus;
  audit: TemplateAuditSummary;
};
```

## Pages

```ts
export type FormPage = {
  pageUuid: string;
  pageIndex: number;
  sourcePageNumber: number;
  width: number;
  height: number;
  units: 'pdf_points';
  rotation?: 0 | 90 | 180 | 270;
  thumbnailId?: string;
};
```

## Sections

```ts
export type FormSection = {
  sectionUuid: string;
  label: string;
  canonicalName: string;
  pageIndex: number;
  geometry?: Geometry;
  order: number;
  parentSectionUuid?: string;
};
```

## Fields

```ts
export type FormField = {
  fieldUuid: string;
  templateVersionId: string;
  label: string;
  canonicalName: string;
  semanticKey?: string;
  fieldType:
    | 'text'
    | 'textarea'
    | 'date'
    | 'number'
    | 'currency'
    | 'checkbox'
    | 'radio'
    | 'select'
    | 'signature'
    | 'initials'
    | 'computed'
    | 'static';
  widgetType: 'pdf_text' | 'pdf_checkbox' | 'pdf_radio' | 'pdf_dropdown' | 'web_only' | 'static_text';
  pageIndex: number;
  geometry: Geometry;
  required: boolean;
  readOnly?: boolean;
  maxLength?: number;
  validation?: FieldValidation;
  options?: FieldOption[];
  groupUuid?: string;
  tableUuid?: string;
  cellUuid?: string;
  pdfBinding: PdfFieldBinding;
  webBinding: WebFieldBinding;
  dataBinding?: DataBinding;
  detection: FieldDetectionMetadata;
  review: FieldReviewStatus;
};
```

## Geometry

```ts
export type Geometry = {
  x: number;
  y: number;
  width: number;
  height: number;
  units: 'pdf_points';
  coordinateSystem: 'pdf_bottom_left' | 'screen_top_left';
};
```

All stored PDF mappings should preserve original PDF-space geometry. UI layers may convert coordinates for display, but persisted geometry must declare its coordinate system.

## Field options

```ts
export type FieldOption = {
  optionUuid: string;
  label: string;
  value: string;
  fieldUuid?: string;
};
```

## Field groups

```ts
export type FormFieldGroup = {
  groupUuid: string;
  groupType: 'radio_group' | 'checkbox_set' | 'repeated_group';
  label: string;
  semanticKey?: string;
  fieldUuids: string[];
  required?: boolean;
};
```

## Tables

```ts
export type FormTable = {
  tableUuid: string;
  label?: string;
  semanticKey?: string;
  pageIndex: number;
  geometry: Geometry;
  rows: TableRow[];
  columns: TableColumn[];
  cells: TableCell[];
  detectionSource: 'manual' | 'ocr' | 'pdf_existing' | 'ai_inferred';
  confidence: number;
};

export type TableRow = {
  rowUuid: string;
  label?: string;
  rowKey?: string;
  order: number;
};

export type TableColumn = {
  columnUuid: string;
  label?: string;
  columnKey?: string;
  order: number;
};

export type TableCell = {
  cellUuid: string;
  rowUuid: string;
  columnUuid: string;
  geometry: Geometry;
  fieldUuid?: string;
  semanticKey?: string;
};
```

## Bindings

```ts
export type PdfFieldBinding = {
  pdfFieldName: string;
  appearanceRole: 'text_line' | 'text_box' | 'checkbox' | 'radio' | 'dropdown' | 'signature_line' | 'static';
  exportable: boolean;
};

export type WebFieldBinding = {
  webInputId: string;
  formName: string;
  componentHint?: string;
};

export type DataBinding = {
  semanticKey: string;
  bindingConfidence: number;
  bindingNotes?: string;
};
```

## Validation

```ts
export type FieldValidation = {
  pattern?: string;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  format?: 'email' | 'phone' | 'postal_code' | 'date' | 'currency' | 'integer' | 'decimal';
  conditionalRequired?: ConditionalRequirement[];
};

export type ConditionalRequirement = {
  whenSemanticKey: string;
  operator: 'equals' | 'not_equals' | 'present' | 'not_present';
  value?: string | number | boolean;
};
```

## Detection metadata

```ts
export type FieldDetectionMetadata = {
  detectionSource: 'manual' | 'ocr' | 'pdf_existing' | 'ai_inferred';
  confidence: number;
  detectedLabel?: string;
  nearbyText?: string[];
  warnings?: string[];
};
```

## Review status

```ts
export type FieldReviewStatus = {
  reviewState: 'detected' | 'needs_review' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNotes?: string;
};

export type TemplateReviewStatus = {
  reviewState:
    | 'draft'
    | 'field_map_review_needed'
    | 'field_map_approved'
    | 'approved_for_private_use'
    | 'approved_for_public_library'
    | 'rejected';
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNotes?: string;
};
```

## Export mapping

```ts
export type TemplateExportMapping = {
  pdf?: {
    generatedPdfId?: string;
    allPdfFieldsMapped: boolean;
  };
  web?: {
    schemaId?: string;
    allWebInputsMapped: boolean;
  };
  jsonSchema?: {
    schemaId?: string;
  };
};
```

## Audit summary

```ts
export type TemplateAuditSummary = {
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  lastEventType?: string;
  lastEventAt?: string;
};
```

## Publication gate

A template cannot be approved for public library helper download unless:

1. Every editable field has `fieldUuid`.
2. Every meaningful field has either `semanticKey` or an explicit `bindingNotes` reason.
3. Every PDF export field maps back to `fieldUuid`.
4. Every field has geometry with declared coordinate system.
5. Every field has review state.
6. Every table cell with editable content maps to a `fieldUuid`.
7. Template review state is `approved_for_public_library`.
8. The parent `FormLibraryRecord` is public eligible.

## Future auto-fill rule

Future auto-fill products must fill by semantic key when available, then resolve to `fieldUuid`, then resolve to export-specific bindings.

They must not visually guess field positions when a reviewed template map exists.
