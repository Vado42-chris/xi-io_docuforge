import type { ReactNode } from 'react';

type XiEmptyStateProps = {
  title: string;
  children: ReactNode;
};

export function XiEmptyState({ title, children }: XiEmptyStateProps) {
  return (
    <section className="xi-empty-state" aria-label={title}>
      <h2>{title}</h2>
      <p>{children}</p>
    </section>
  );
}
