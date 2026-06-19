import type { SolutionIllustrationId } from '../data/solutionsCatalog';

export interface SolutionTheme {
  categoryLabel: string;
  accent: string;
}

export const SOLUTION_THEMES: Record<SolutionIllustrationId, SolutionTheme> = {
  'jupyter-container': {
    categoryLabel: 'АНАЛИТИКА И ML',
    accent: '#427bff',
  },
  'kubernetes-terraform': {
    categoryLabel: 'ИНФРАСТРУКТУРА',
    accent: '#8b5cf6',
  },
  'helm-yaml-deploy': {
    categoryLabel: 'ДЕПЛОЙ',
    accent: '#389f74',
  },
  'telegram-n8n': {
    categoryLabel: 'АВТОМАТИЗАЦИЯ',
    accent: '#f97316',
  },
  'keda-event-scaling': {
    categoryLabel: 'МАСШТАБИРОВАНИЕ',
    accent: '#0ea5e9',
  },
};

export function getSolutionTheme(illustrationId: SolutionIllustrationId): SolutionTheme {
  return SOLUTION_THEMES[illustrationId];
}
