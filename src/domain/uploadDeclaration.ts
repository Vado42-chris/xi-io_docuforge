export type UploadWorkflowState =
  | 'started'
  | 'file_selected'
  | 'preflight_complete'
  | 'declaration_complete'
  | 'filled_detection_complete'
  | 'routing_pending'
  | 'private_saved'
  | 'workspace_saved'
  | 'public_review_requested'
  | 'blocked_filled_content';

export type UploadSourceType =
  | 'official_url'
  | 'user_created'
  | 'business_or_organization'
  | 'found_online'
  | 'unknown';

export type UploadVisibilityChoice = 'private' | 'workspace' | 'public_review';

export type UploadDeclarationDraft = {
  workflowState: UploadWorkflowState;
  fileName: string;
  fileKind: 'pdf_placeholder';
  preflight: {
    allowedType: boolean;
    sizeWithinLimit: boolean;
    unsafeContentNotDetected: boolean;
    note: string;
  };
  attestation: {
    confirmedBlank: boolean;
    hasPermissionToStore: boolean;
  };
  source: {
    sourceType: UploadSourceType;
    sourceUrl: string;
    issuingBody: string;
    jurisdiction: string;
  };
  routing: {
    visibility: UploadVisibilityChoice;
    submitForPublicReview: boolean;
  };
  simulation: {
    filledContentDetected: boolean;
  };
};

export const initialUploadDeclarationDraft: UploadDeclarationDraft = {
  workflowState: 'started',
  fileName: 'sample-blank-form.pdf',
  fileKind: 'pdf_placeholder',
  preflight: {
    allowedType: true,
    sizeWithinLimit: true,
    unsafeContentNotDetected: true,
    note: 'Preflight is simulated in this front-end-only slice.',
  },
  attestation: {
    confirmedBlank: false,
    hasPermissionToStore: false,
  },
  source: {
    sourceType: 'unknown',
    sourceUrl: '',
    issuingBody: '',
    jurisdiction: '',
  },
  routing: {
    visibility: 'private',
    submitForPublicReview: false,
  },
  simulation: {
    filledContentDetected: false,
  },
};

export function deriveUploadWorkflowState(draft: UploadDeclarationDraft): UploadWorkflowState {
  if (draft.simulation.filledContentDetected && draft.routing.visibility === 'public_review') {
    return 'blocked_filled_content';
  }

  if (draft.routing.visibility === 'public_review' && draft.attestation.confirmedBlank && draft.attestation.hasPermissionToStore) {
    return 'public_review_requested';
  }

  if (draft.routing.visibility === 'workspace' && draft.attestation.confirmedBlank && draft.attestation.hasPermissionToStore) {
    return 'workspace_saved';
  }

  if (draft.routing.visibility === 'private' && draft.attestation.hasPermissionToStore) {
    return 'private_saved';
  }

  if (draft.attestation.confirmedBlank || draft.attestation.hasPermissionToStore) {
    return 'declaration_complete';
  }

  return 'preflight_complete';
}
