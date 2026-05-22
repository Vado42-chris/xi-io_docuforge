import type { ReactNode } from 'react';

const navItems = [
  { href: '/library', label: 'Library' },
  { href: '/upload', label: 'Upload' },
  { href: '/review', label: 'Review' },
  { href: '/admin', label: 'Admin' },
];

type XiAppShellProps = {
  children: ReactNode;
  currentPath: string;
};

export function XiAppShell({ children, currentPath }: XiAppShellProps) {
  return (
    <div className="xi-app-shell">
      <aside className="xi-app-shell__rail" aria-label="Primary navigation">
        <a className="xi-app-shell__brand" href="/library" aria-label="DocuForge library home">
          <span className="xi-app-shell__brand-mark">DF</span>
          <span>
            <strong>DocuForge</strong>
            <small>xi-io managed project</small>
          </span>
        </a>
        <nav className="xi-app-shell__nav">
          {navItems.map((item) => (
            <a
              key={item.href}
              className={currentPath === item.href ? 'is-active' : undefined}
              href={item.href}
              aria-current={currentPath === item.href ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
      <main className="xi-app-shell__workspace" id="main-content">
        {children}
      </main>
    </div>
  );
}
