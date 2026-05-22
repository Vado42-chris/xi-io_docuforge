import type { ReactNode } from 'react';

type XiPageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function XiPageHeader({ eyebrow, title, description, actions }: XiPageHeaderProps) {
  return (
    <header className="xi-page-header">
      <div>
        {eyebrow ? <p className="xi-page-header__eyebrow">{eyebrow}</p> : null}
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </div>
      {actions ? <div className="xi-page-header__actions">{actions}</div> : null}
    </header>
  );
}
