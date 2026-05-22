import type { ReactNode } from 'react';

type XiNoticeTone = 'info' | 'success' | 'warning' | 'danger';

type XiNoticeProps = {
  title: string;
  children: ReactNode;
  tone?: XiNoticeTone;
};

export function XiNotice({ title, children, tone = 'info' }: XiNoticeProps) {
  return (
    <section className={`xi-notice xi-notice--${tone}`} aria-label={title}>
      <strong>{title}</strong>
      <div>{children}</div>
    </section>
  );
}
