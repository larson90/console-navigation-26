import React from 'react';
import type { SolutionIllustrationId } from '../data/solutionsCatalog';

function TelegramBotIllustration() {
  return (
    <svg width="72" height="48" viewBox="0 0 72 48" fill="none" aria-hidden>
      <rect x="8" y="14" width="28" height="22" rx="6" fill="#dde0ea" />
      <circle cx="18" cy="24" r="3" fill="#389f74" />
      <circle cx="26" cy="24" r="3" fill="#99d7ba" />
      <rect x="40" y="18" width="22" height="16" rx="4" fill="#99d7ba" />
      <path d="M46 26h10M51 22v8" stroke="#389f74" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="52" y="10" width="12" height="8" rx="2" fill="#c8e8d8" />
    </svg>
  );
}

function JupyterIllustration() {
  return (
    <svg width="72" height="48" viewBox="0 0 72 48" fill="none" aria-hidden>
      <rect x="10" y="12" width="32" height="26" rx="4" fill="#fdfdfd" stroke="#dde0ea" strokeWidth="1.5" />
      <rect x="14" y="18" width="18" height="3" rx="1" fill="#99d7ba" />
      <rect x="14" y="24" width="24" height="3" rx="1" fill="#dde0ea" />
      <rect x="14" y="30" width="14" height="3" rx="1" fill="#dde0ea" />
      <rect x="46" y="20" width="16" height="16" rx="3" fill="#389f74" opacity="0.85" />
      <circle cx="54" cy="28" r="4" fill="#c8e8d8" />
    </svg>
  );
}

function KubernetesIllustration() {
  return (
    <svg width="72" height="48" viewBox="0 0 72 48" fill="none" aria-hidden>
      <polygon points="36,10 52,20 52,36 36,42 20,36 20,20" fill="#dde0ea" />
      <polygon points="36,16 46,22 46,32 36,36 26,32 26,22" fill="#99d7ba" />
      <circle cx="36" cy="26" r="5" fill="#389f74" />
      <rect x="8" y="30" width="10" height="10" rx="2" fill="#c8e8d8" />
      <rect x="54" y="14" width="10" height="10" rx="2" fill="#8b8e9b" opacity="0.6" />
    </svg>
  );
}

function HelmIllustration() {
  return (
    <svg width="72" height="48" viewBox="0 0 72 48" fill="none" aria-hidden>
      <path d="M14 34V18l16-8 16 8v16" stroke="#99d7ba" strokeWidth="2" fill="none" />
      <path d="M30 26l8-4 8 4v8l-8 4-8-4v-8z" fill="#389f74" opacity="0.9" />
      <rect x="46" y="16" width="18" height="22" rx="3" fill="#dde0ea" />
      <rect x="50" y="22" width="10" height="2" rx="1" fill="#8b8e9b" />
      <rect x="50" y="28" width="10" height="2" rx="1" fill="#8b8e9b" />
    </svg>
  );
}

function KedaIllustration() {
  return (
    <svg width="72" height="48" viewBox="0 0 72 48" fill="none" aria-hidden>
      <rect x="10" y="28" width="8" height="12" rx="2" fill="#dde0ea" />
      <rect x="22" y="20" width="8" height="20" rx="2" fill="#99d7ba" />
      <rect x="34" y="24" width="8" height="16" rx="2" fill="#389f74" />
      <rect x="46" y="14" width="8" height="26" rx="2" fill="#c8e8d8" />
      <path d="M12 14h44" stroke="#8b8e9b" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="58" cy="14" r="5" fill="#389f74" />
    </svg>
  );
}

const ILLUSTRATIONS: Record<SolutionIllustrationId, React.FC> = {
  'telegram-n8n': TelegramBotIllustration,
  'jupyter-container': JupyterIllustration,
  'kubernetes-terraform': KubernetesIllustration,
  'helm-yaml-deploy': HelmIllustration,
  'keda-event-scaling': KedaIllustration,
};

export function SolutionIllustration({ id }: { id: SolutionIllustrationId }) {
  const Component = ILLUSTRATIONS[id];
  return <Component />;
}
