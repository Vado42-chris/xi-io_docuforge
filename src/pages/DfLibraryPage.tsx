import { useMemo, useState } from 'react';
import { seedForms } from '../data/seedForms';
import { DfFormSearchBar } from '../components/df/DfFormSearchBar';
import { DfLibraryResults } from '../components/df/DfLibraryResults';
import { XiNotice } from '../components/xi/XiNotice';
import { XiPageHeader } from '../components/xi/XiPageHeader';
import { XiButton } from '../components/xi/XiButton';

export function DfLibraryPage() {
  const [query, setQuery] = useState('');

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return seedForms;

    return seedForms.filter((record) => {
      const haystack = [
        record.title,
        record.normalizedTitle,
        record.jurisdiction,
        record.issuingBody,
        record.description,
        record.plainLanguagePurpose,
        ...record.categories,
        ...record.tags,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [query]);

  return (
    <div className="df-page-stack">
      <XiPageHeader
        eyebrow="Blank-form library"
        title="Find the form first. Fill it somewhere safe."
        description="DocuForge starts as a trusted library of blank forms, provenance notes, permissions status, and helper templates. Filled personal forms are out of scope for this public/library shell."
        actions={<XiButton variant="secondary" disabled>Upload workflow pending</XiButton>}
      />

      <XiNotice title="Library safety rule" tone="warning">
        Public library records are for blank forms only. Completed, signed, identity-bearing, legal, financial, or medical documents must not be published here.
      </XiNotice>

      <section className="df-panel" aria-label="Search and filters">
        <DfFormSearchBar query={query} onQueryChange={setQuery} />
        <div className="df-filter-strip" aria-label="Filter placeholders">
          <span>Jurisdiction filter pending</span>
          <span>Rights filter pending</span>
          <span>Review state filter pending</span>
        </div>
      </section>

      <DfLibraryResults records={filteredRecords} />
    </div>
  );
}
