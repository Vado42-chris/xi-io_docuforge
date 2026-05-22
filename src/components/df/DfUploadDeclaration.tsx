import { useMemo, useState } from 'react';
import {
  deriveUploadWorkflowState,
  initialUploadDeclarationDraft,
  type UploadDeclarationDraft,
  type UploadSourceType,
  type UploadVisibilityChoice,
} from '../../domain/uploadDeclaration';
import { XiBadge } from '../xi/XiBadge';
import { XiButton } from '../xi/XiButton';
import { XiNotice } from '../xi/XiNotice';

type DfUploadDeclarationProps = {
  initialDraft?: UploadDeclarationDraft;
};

const sourceOptions: Array<{ value: UploadSourceType; label: string }> = [
  { value: 'official_url', label: 'Official government, court, or agency source' },
  { value: 'user_created', label: 'I created this form' },
  { value: 'business_or_organization', label: 'Business or organization form' },
  { value: 'found_online', label: 'Found online' },
  { value: 'unknown', label: 'I am not sure yet' },
];

const visibilityOptions: Array<{ value: UploadVisibilityChoice; label: string; description: string }> = [
  {
    value: 'private',
    label: 'Private draft',
    description: 'Keep this out of the public library. Best default when source or rights are unclear.',
  },
  {
    value: 'workspace',
    label: 'Workspace review',
    description: 'Share only inside a trusted workspace once that feature exists.',
  },
  {
    value: 'public_review',
    label: 'Submit for public-library review',
    description: 'Requires blank-form attestation, rights review, and no filled personal data.',
  },
];

function workflowTone(state: ReturnType<typeof deriveUploadWorkflowState>) {
  if (state === 'public_review_requested' || state === 'private_saved' || state === 'workspace_saved') return 'success';
  if (state === 'blocked_filled_content') return 'danger';
  return 'warning';
}

export function DfUploadDeclaration({ initialDraft = initialUploadDeclarationDraft }: DfUploadDeclarationProps) {
  const [draft, setDraft] = useState(initialDraft);
  const workflowState = useMemo(() => deriveUploadWorkflowState(draft), [draft]);

  function updateDraft(patch: Partial<UploadDeclarationDraft>) {
    setDraft((current) => ({ ...current, ...patch }));
  }

  function updateAttestation(patch: Partial<UploadDeclarationDraft['attestation']>) {
    setDraft((current) => ({ ...current, attestation: { ...current.attestation, ...patch } }));
  }

  function updateSource(patch: Partial<UploadDeclarationDraft['source']>) {
    setDraft((current) => ({ ...current, source: { ...current.source, ...patch } }));
  }

  function updateRouting(patch: Partial<UploadDeclarationDraft['routing']>) {
    setDraft((current) => ({ ...current, routing: { ...current.routing, ...patch } }));
  }

  function updateSimulation(patch: Partial<UploadDeclarationDraft['simulation']>) {
    setDraft((current) => ({ ...current, simulation: { ...current.simulation, ...patch } }));
  }

  const publicReviewBlocked = workflowState === 'blocked_filled_content';

  return (
    <section className="df-upload" aria-label="Upload declaration workflow">
      <div className="df-upload__status">
        <div>
          <p className="df-record-card__meta">Front-end only workflow</p>
          <h2>Upload declaration</h2>
          <p>
            This does not upload or store a file yet. It proves the safety declaration, source metadata, and routing logic before backend work begins.
          </p>
        </div>
        <XiBadge tone={workflowTone(workflowState)}>{workflowState.replaceAll('_', ' ')}</XiBadge>
      </div>

      <XiNotice title="Blank forms only" tone="warning">
        Do not submit completed, signed, identity-bearing, legal, medical, or financial documents to the shared library.
      </XiNotice>

      <div className="df-upload__grid">
        <fieldset className="df-upload__card">
          <legend>1. File placeholder</legend>
          <label htmlFor="upload-file-name">Displayed filename</label>
          <input
            id="upload-file-name"
            value={draft.fileName}
            onChange={(event) => updateDraft({ fileName: event.target.value })}
          />
          <p>{draft.preflight.note}</p>
          <ul className="df-check-list" aria-label="Simulated preflight checks">
            <li>Allowed file type, PDF placeholder</li>
            <li>Size within limit, simulated</li>
            <li>Unsafe content not detected, simulated</li>
          </ul>
        </fieldset>

        <fieldset className="df-upload__card">
          <legend>2. Blank-form attestation</legend>
          <label className="df-checkbox-row">
            <input
              type="checkbox"
              checked={draft.attestation.confirmedBlank}
              onChange={(event) => updateAttestation({ confirmedBlank: event.target.checked })}
            />
            I confirm this is intended to be a blank form template.
          </label>
          <label className="df-checkbox-row">
            <input
              type="checkbox"
              checked={draft.attestation.hasPermissionToStore}
              onChange={(event) => updateAttestation({ hasPermissionToStore: event.target.checked })}
            />
            I believe I am allowed to store this form for the selected purpose.
          </label>
        </fieldset>

        <fieldset className="df-upload__card">
          <legend>3. Source and ownership</legend>
          <label htmlFor="source-type">Source type</label>
          <select
            id="source-type"
            value={draft.source.sourceType}
            onChange={(event) => updateSource({ sourceType: event.target.value as UploadSourceType })}
          >
            {sourceOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>

          <label htmlFor="source-url">Official or reference URL</label>
          <input
            id="source-url"
            value={draft.source.sourceUrl}
            placeholder="https://..."
            onChange={(event) => updateSource({ sourceUrl: event.target.value })}
          />

          <label htmlFor="issuing-body">Issuing body</label>
          <input
            id="issuing-body"
            value={draft.source.issuingBody}
            placeholder="Court, department, business, or creator"
            onChange={(event) => updateSource({ issuingBody: event.target.value })}
          />

          <label htmlFor="jurisdiction">Jurisdiction</label>
          <input
            id="jurisdiction"
            value={draft.source.jurisdiction}
            placeholder="Example: Saskatchewan, Canada"
            onChange={(event) => updateSource({ jurisdiction: event.target.value })}
          />
        </fieldset>

        <fieldset className="df-upload__card">
          <legend>4. Routing choice</legend>
          {visibilityOptions.map((option) => (
            <label className="df-radio-card" key={option.value}>
              <input
                type="radio"
                name="visibility"
                value={option.value}
                checked={draft.routing.visibility === option.value}
                onChange={() => updateRouting({ visibility: option.value, submitForPublicReview: option.value === 'public_review' })}
              />
              <span>
                <strong>{option.label}</strong>
                <small>{option.description}</small>
              </span>
            </label>
          ))}
        </fieldset>

        <fieldset className="df-upload__card">
          <legend>5. Safety simulation</legend>
          <label className="df-checkbox-row">
            <input
              type="checkbox"
              checked={draft.simulation.filledContentDetected}
              onChange={(event) => updateSimulation({ filledContentDetected: event.target.checked })}
            />
            Simulate filled personal data detected.
          </label>
          {publicReviewBlocked ? (
            <XiNotice title="Public submission blocked" tone="danger">
              This draft appears to contain entered values or personal data. Replace the file or keep it private. Public-library review is blocked by default.
            </XiNotice>
          ) : null}
        </fieldset>

        <section className="df-upload__card" aria-label="Review-ready summary">
          <h3>6. Review-ready summary</h3>
          <dl className="df-record-card__facts df-record-card__facts--stacked">
            <div>
              <dt>Filename</dt>
              <dd>{draft.fileName || 'Missing'}</dd>
            </div>
            <div>
              <dt>Blank confirmed</dt>
              <dd>{draft.attestation.confirmedBlank ? 'Yes' : 'No'}</dd>
            </div>
            <div>
              <dt>Route</dt>
              <dd>{draft.routing.visibility.replaceAll('_', ' ')}</dd>
            </div>
          </dl>
          <XiButton type="button" disabled={publicReviewBlocked || !draft.attestation.hasPermissionToStore}>
            Save declaration placeholder
          </XiButton>
        </section>
      </div>
    </section>
  );
}
