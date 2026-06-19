import React from 'react';
import type { SolutionIllustrationId } from '../data/solutionsCatalog';

function JupyterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-full">
      <path
        d="M8 5.5h8M8 9h8M8 12.5h5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7 18.5h10l-1.5-4.5H8.5L7 18.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="5" r="1.25" fill="currentColor" />
    </svg>
  );
}

function KubernetesIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-full">
      <path
        d="M12 4.5L18.5 8V16L12 19.5L5.5 16V8L12 4.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.25" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function HelmIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-full">
      <circle cx="12" cy="12" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8.5V15.5M8.5 12H15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-full">
      <path
        d="M5 12.5L18.5 7L15 17.5L11.5 14L9 16.5L9.5 12.5L5 12.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function KedaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-full">
      <rect x="6" y="13" width="3" height="6" rx="1" fill="currentColor" />
      <rect x="10.5" y="10" width="3" height="9" rx="1" fill="currentColor" />
      <rect x="15" y="7" width="3" height="12" rx="1" fill="currentColor" />
      <path d="M6 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
    </svg>
  );
}

const ICONS: Record<SolutionIllustrationId, React.FC> = {
  'jupyter-container': JupyterIcon,
  'kubernetes-terraform': KubernetesIcon,
  'helm-yaml-deploy': HelmIcon,
  'telegram-n8n': TelegramIcon,
  'keda-event-scaling': KedaIcon,
};

export function SolutionCategoryIcon({ id }: { id: SolutionIllustrationId }) {
  const Icon = ICONS[id];
  return <Icon />;
}
