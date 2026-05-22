import type { ReactNode } from 'react';

type XiBadgeTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

type XiBadgeProps = {
  children: ReactNode;
  tone?: XiBadgeTone;
};

export function XiBadge({ children, tone = 'neutral' }: XiBadgeProps) {
  return <span className={`xi-badge xi-badge--${tone}`}>{children}</span>;
}
