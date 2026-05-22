import { XiEmptyState } from '../components/xi/XiEmptyState';
import { XiNotice } from '../components/xi/XiNotice';
import { XiPageHeader } from '../components/xi/XiPageHeader';

type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  nextStep: string;
};

export function PlaceholderPage({ eyebrow, title, description, nextStep }: PlaceholderPageProps) {
  return (
    <div className="df-page-stack">
      <XiPageHeader eyebrow={eyebrow} title={title} description={description} />
      <XiNotice title="Not implemented in DOCUFORGE-SHELL-01" tone="info">
        This route exists to lock the navigation contract. Feature work starts only after the shell and library page are stable.
      </XiNotice>
      <XiEmptyState title="Next controlled slice">
        {nextStep}
      </XiEmptyState>
    </div>
  );
}
