export type CategoryScope = 'platform' | 'control';

export interface CategoryListEntry {
  scope: CategoryScope;
  id: string;
}

function entryKey(entry: CategoryListEntry): string {
  return `${entry.scope}:${entry.id}`;
}

export function buildVisibleCategoryEntries({
  platformOrder,
  controlOrder,
  visiblePlatformIds,
  visibleControlIds,
  excludePlatformIds = [],
}: {
  platformOrder: string[];
  controlOrder: string[];
  visiblePlatformIds: ReadonlySet<string>;
  visibleControlIds: ReadonlySet<string>;
  excludePlatformIds?: string[];
}): CategoryListEntry[] {
  const excluded = new Set(excludePlatformIds);

  const platformEntries = platformOrder
    .filter((id) => !excluded.has(id) && visiblePlatformIds.has(id))
    .map((id) => ({ scope: 'platform' as const, id }));

  const controlEntries = controlOrder
    .filter((id) => visibleControlIds.has(id))
    .map((id) => ({ scope: 'control' as const, id }));

  return [...platformEntries, ...controlEntries];
}

/** Переставляет категории в объединённом списке, сохраняя скрытые (при поиске) на местах. */
export function applyCategoryMoveToOrders(
  platformOrder: string[],
  controlOrder: string[],
  visibleEntries: CategoryListEntry[],
  dragIndex: number,
  hoverIndex: number,
): { platformOrder: string[]; controlOrder: string[] } {
  const reorderedVisible = [...visibleEntries];
  const [removed] = reorderedVisible.splice(dragIndex, 1);
  reorderedVisible.splice(hoverIndex, 0, removed);

  const fullEntries: CategoryListEntry[] = [
    ...platformOrder.map((id) => ({ scope: 'platform' as const, id })),
    ...controlOrder.map((id) => ({ scope: 'control' as const, id })),
  ];

  const visibleKeys = new Set(visibleEntries.map(entryKey));
  let visibleIndex = 0;
  const merged = fullEntries.map((entry) => {
    if (!visibleKeys.has(entryKey(entry))) return entry;
    return reorderedVisible[visibleIndex++];
  });

  return {
    platformOrder: merged.filter((entry) => entry.scope === 'platform').map((entry) => entry.id),
    controlOrder: merged.filter((entry) => entry.scope === 'control').map((entry) => entry.id),
  };
}
