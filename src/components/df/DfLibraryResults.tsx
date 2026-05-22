import type { FormLibraryRecord } from '../../domain/forms';
import { XiBadge } from '../xi/XiBadge';
import { XiEmptyState } from '../xi/XiEmptyState';

type DfLibraryResultsProps = {
  records: FormLibraryRecord[];
};

function rightsTone(status: FormLibraryRecord['rights']['status']) {
  if (status === 'user_owned' || status === 'open_license' || status === 'official_public_source') return 'success';
  if (status === 'permission_needed' || status === 'unknown') return 'warning';
  if (status === 'rejected' || status === 'third_party_copyrighted') return 'danger';
  return 'neutral';
}

function lifecycleTone(status: FormLibraryRecord['lifecycle']['status']) {
  if (status === 'published' || status === 'approved') return 'success';
  if (status === 'needs_review' || status === 'draft') return 'warning';
  if (status === 'rejected' || status === 'retired') return 'danger';
  return 'info';
}

export function DfLibraryResults({ records }: DfLibraryResultsProps) {
  if (records.length === 0) {
    return (
      <XiEmptyState title="No matching blank forms yet">
        Try another keyword, or start an upload declaration when that workflow is enabled.
      </XiEmptyState>
    );
  }

  return (
    <section className="df-results" aria-label="Blank form search results">
      {records.map((record) => (
        <article className="df-record-card" key={record.id}>
          <div className="df-record-card__header">
            <div>
              <p className="df-record-card__meta">{record.jurisdiction ?? 'General'} · {record.issuingBody ?? 'Unknown source'}</p>
              <h2>{record.title}</h2>
            </div>
            <div className="df-record-card__badges" aria-label="Record status">
              <XiBadge tone={lifecycleTone(record.lifecycle.status)}>{record.lifecycle.status.replaceAll('_', ' ')}</XiBadge>
              <XiBadge tone={rightsTone(record.rights.status)}>{record.rights.status.replaceAll('_', ' ')}</XiBadge>
              {record.security.sensitiveAdjacent ? <XiBadge tone="info">sensitive adjacent</XiBadge> : null}
            </div>
          </div>
          <p>{record.plainLanguagePurpose ?? record.description}</p>
          <dl className="df-record-card__facts">
            <div>
              <dt>Public eligible</dt>
              <dd>{record.security.publicEligible ? 'Yes' : 'No, review required'}</dd>
            </div>
            <div>
              <dt>Helper PDF</dt>
              <dd>{record.rights.allowHelperPdfDownload ? 'Allowed' : 'Blocked until permissions clear'}</dd>
            </div>
            <div>
              <dt>Filled data</dt>
              <dd>{record.security.filledDataDetected ? 'Detected, blocked' : 'Not detected'}</dd>
            </div>
          </dl>
        </article>
      ))}
    </section>
  );
}
