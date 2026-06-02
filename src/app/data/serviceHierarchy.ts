import { imgIconColor7 as hierarchyIcon } from '../../imports/MainMenuDesktop-1/svg-vz3cs';

/** Уровень в иерархии навигации. */
export type ServiceHierarchyKind = 'megaservice' | 'service' | 'subservice';

/** Узел иерархии сервиса (мегасервис → сервис → подсервис). */
export interface ServiceHierarchyNode {
  id: string;
  title: string;
  kind: ServiceHierarchyKind;
  subtitle?: string;
  children?: ServiceHierarchyNode[];
}

export interface ServiceHierarchyRoot {
  categoryId: string;
  categoryTitle: string;
  icon: string;
  root: ServiceHierarchyNode;
}

/**
 * Демо-иерархия для глубокого поиска и вложенных подсервисов в каталоге.
 * «Правила алертов» — 3-й уровень: Мониторинг / Алерты мониторинга / Правила алертов.
 */
export const SERVICE_HIERARCHY_ROOTS: ServiceHierarchyRoot[] = [
  {
    categoryId: 'containers',
    categoryTitle: 'Контейнеры',
    icon: hierarchyIcon,
    root: {
      id: 'artifact-registry',
      title: 'Artifact Registry',
      kind: 'service',
      children: [{ id: 'ar-monitoring', title: 'Мониторинг', kind: 'subservice' }],
    },
  },
  {
    categoryId: 'monitoring',
    categoryTitle: 'Мониторинг',
    icon: hierarchyIcon,
    root: {
      id: 'monitoring-megaservice',
      title: 'Мониторинг',
      kind: 'megaservice',
      children: [
        { id: 'dashboards', title: 'Дашборды', kind: 'service' },
        {
          id: 'monitoring-alerts',
          title: 'Алерты мониторинга',
          kind: 'service',
          children: [{ id: 'alert-rules', title: 'Правила алертов', kind: 'subservice' }],
        },
        { id: 'metric-management', title: 'Управление метриками', kind: 'service' },
        { id: 'public-api', title: 'Публичные API', kind: 'service' },
        { id: 'logging', title: 'Логирование', kind: 'service' },
        { id: 'notifications', title: 'Нотификации', kind: 'service' },
      ],
    },
  },
];

function buildSubservicesByParentId(): Map<string, ServiceHierarchyNode[]> {
  const map = new Map<string, ServiceHierarchyNode[]>();

  const walk = (node: ServiceHierarchyNode) => {
    if (node.children?.length) {
      map.set(node.id, node.children);
      node.children.forEach(walk);
    }
  };

  for (const entry of SERVICE_HIERARCHY_ROOTS) {
    walk(entry.root);
  }

  return map;
}

export const SUBSERVICES_BY_PARENT_ID = buildSubservicesByParentId();

export function getSubservicesForParent(parentId: string): ServiceHierarchyNode[] {
  return SUBSERVICES_BY_PARENT_ID.get(parentId) ?? [];
}

export function normalizeSearchQuery(query: string): string {
  return query
    .trim()
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/\s+/g, ' ');
}

/** Сопоставление с учётом словоформ: «правило алертов» → «Правила алертов». */
export function matchesSearchQuery(text: string, query: string): boolean {
  const q = normalizeSearchQuery(query);
  if (!q) return true;

  const normalizedTitle = normalizeSearchQuery(text);
  if (normalizedTitle.includes(q)) return true;

  const queryTokens = q.split(' ').filter(Boolean);
  if (queryTokens.length === 0) return false;

  const titleTokens = normalizedTitle.split(' ').filter(Boolean);
  return queryTokens.every((qToken) =>
    titleTokens.some((tToken) => {
      if (tToken.includes(qToken) || qToken.includes(tToken)) return true;
      const minPrefix = Math.min(5, qToken.length, tToken.length);
      return minPrefix >= 3 && tToken.slice(0, minPrefix) === qToken.slice(0, minPrefix);
    }),
  );
}

export function filterSubservicesForSearch(
  parentId: string,
  query: string,
): ServiceHierarchyNode[] {
  const children = getSubservicesForParent(parentId);
  const q = normalizeSearchQuery(query);
  if (!q) return children;
  return children.filter((child) => matchesSearchQuery(child.title, query));
}

export function serviceMatchesSearch(
  serviceId: string,
  title: string,
  subtitle: string,
  query: string,
): boolean {
  if (!normalizeSearchQuery(query)) return true;
  if (matchesSearchQuery(title, query) || matchesSearchQuery(subtitle, query)) {
    return true;
  }
  return filterSubservicesForSearch(serviceId, query).length > 0;
}
