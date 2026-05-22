export type RightsStatusKind =
  | 'official_public_source'
  | 'permission_needed'
  | 'user_owned'
  | 'open_license'
  | 'third_party_copyrighted'
  | 'unknown'
  | 'rejected';

export type DocumentClass =
  | 'blank_public_form'
  | 'blank_restricted_form'
  | 'blank_unknown_rights_form'
  | 'private_user_document'
  | 'filled_sensitive_document'
  | 'rejected_document';

export type LifecycleStatus =
  | 'draft'
  | 'private'
  | 'workspace'
  | 'needs_review'
  | 'approved'
  | 'published'
  | 'retired'
  | 'rejected';

export type ReviewState =
  | 'not_reviewed'
  | 'source_review_needed'
  | 'permissions_review_needed'
  | 'field_map_review_needed'
  | 'approved_for_private_use'
  | 'approved_for_public_library'
  | 'rejected';

export type SourceRecord = {
  sourceType: 'official_url' | 'user_upload' | 'admin_upload' | 'manual_entry';
  sourceUrl?: string;
  issuingAuthority?: string;
  jurisdiction?: string;
  verifiedAt?: string;
  licenseStatus: 'verified' | 'permission_needed' | 'unknown' | 'user_owned' | 'open_license';
  sourceConfidence: 'low' | 'medium' | 'high';
};

export type FormLibraryRecord = {
  id: string;
  templateId: string;
  title: string;
  normalizedTitle: string;
  formNumber?: string;
  jurisdiction?: string;
  issuingBody?: string;
  categories: string[];
  tags: string[];
  description?: string;
  plainLanguagePurpose?: string;
  source: SourceRecord;
  rights: {
    status: RightsStatusKind;
    attributionRequired: boolean;
    commercialUseAllowed: boolean | 'unknown';
    allowPublicListing: boolean;
    allowOriginalDownload: boolean;
    allowHelperPdfDownload: boolean;
    allowCloneTemplate: boolean;
  };
  security: {
    documentClass: DocumentClass;
    filledDataDetected: boolean;
    publicEligible: boolean;
    sensitiveAdjacent: boolean;
    malwareScanStatus: 'not_scanned' | 'passed' | 'failed' | 'not_required';
  };
  lifecycle: {
    status: LifecycleStatus;
    currentTemplateVersionId?: string;
    versionLabel?: string;
    versionDate?: string;
    lastVerifiedAt?: string;
  };
  review: {
    reviewState: ReviewState;
    reviewNotes?: string;
  };
};

export type Geometry = {
  x: number;
  y: number;
  width: number;
  height: number;
  units: 'pdf_points';
  coordinateSystem: 'pdf_bottom_left' | 'screen_top_left';
};

export type FormField = {
  fieldUuid: string;
  templateVersionId: string;
  label: string;
  canonicalName: string;
  semanticKey?: string;
  fieldType: 'text' | 'textarea' | 'date' | 'number' | 'currency' | 'checkbox' | 'radio' | 'select' | 'signature' | 'initials' | 'computed' | 'static';
  pageIndex: number;
  geometry: Geometry;
  required: boolean;
  pdfBinding: {
    pdfFieldName: string;
    exportable: boolean;
  };
  reviewState: 'detected' | 'needs_review' | 'approved' | 'rejected';
};

export type FormTemplate = {
  templateId: string;
  templateVersionId: string;
  libraryRecordId: string;
  title: string;
  fields: FormField[];
  reviewState: 'draft' | 'field_map_review_needed' | 'field_map_approved' | 'approved_for_private_use' | 'approved_for_public_library' | 'rejected';
};
