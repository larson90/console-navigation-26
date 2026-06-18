import React from 'react';

export function NavCollapse({
  open,
  children,
  className = '',
}: {
  open: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`nav-collapse${open ? ' nav-collapse--open' : ''} ${className}`.trim()}>
      <div className="nav-collapse__inner">{children}</div>
    </div>
  );
}
