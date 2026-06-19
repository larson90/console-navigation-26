import React from 'react';

/** Иконка каталога сервисов маркетплейса — сетка приложений с плюсом. */
export function MarketplaceServicesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="4" width="7" height="7" rx="1.75" stroke="currentColor" strokeWidth="1.4" />
      <rect x="13" y="4" width="7" height="7" rx="1.75" stroke="currentColor" strokeWidth="1.4" />
      <rect x="4" y="13" width="7" height="7" rx="1.75" stroke="currentColor" strokeWidth="1.4" />
      <rect x="13" y="13" width="7" height="7" rx="1.75" stroke="currentColor" strokeWidth="1.4" />
      <path d="M16.5 16.5V19.5M15 18H18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
