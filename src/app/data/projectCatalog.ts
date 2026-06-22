export interface ProjectItem {
  id: string;
  name: string;
}

export interface ProjectOrganization {
  id: string;
  name: string;
  projects: ProjectItem[];
}

export const PROJECT_ORGANIZATIONS: ProjectOrganization[] = [
  {
    id: 'org-1',
    name: 'ООО Рога и копыта',
    projects: [
      { id: 'p1', name: 'K8s прод-кластер' },
      { id: 'p2', name: 'Terraform IaC' },
      { id: 'p3', name: 'GitLab Runners' },
    ],
  },
  {
    id: 'org-2',
    name: 'Cloud SRE Team',
    projects: [
      { id: 'p4', name: 'Observability Stack' },
      { id: 'p5', name: 'Loki Logs' },
      { id: 'p6', name: 'On-call Bot' },
    ],
  },
  {
    id: 'org-3',
    name: 'Data Platform Ops',
    projects: [
      { id: 'p7', name: 'ArgoCD Deploy' },
      { id: 'p8', name: 'Backup and DR' },
      { id: 'p9', name: 'Bastion Access' },
    ],
  },
];

export const ALL_ORGANIZATIONS_ID = 'all';
export const DEFAULT_PROJECT_ID = 'p1';
export const DEFAULT_PROJECT_LABEL = 'Проект';

export function getProjectInitials(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return '—';
  return trimmed.slice(0, 2).toUpperCase();
}
