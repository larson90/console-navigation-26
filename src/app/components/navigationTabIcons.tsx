import React from 'react';

/** Иконка «4 кубика» 12×12 для вкладки «Сервисы» */
export function NavTabServicesGridIcon({ className = 'size-full' }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" className={className} aria-hidden>
      <rect x="1.2" y="1.2" width="3.2" height="3.2" rx="0.6" stroke="currentColor" strokeWidth="1" />
      <rect x="7.6" y="1.2" width="3.2" height="3.2" rx="0.6" stroke="currentColor" strokeWidth="1" />
      <rect x="1.2" y="7.6" width="3.2" height="3.2" rx="0.6" stroke="currentColor" strokeWidth="1" />
      <rect x="7.6" y="7.6" width="3.2" height="3.2" rx="0.6" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
