import { useEffect, type Dispatch, type SetStateAction } from 'react';

interface UseExpandCategoriesOnSearchOptions {
  searchQuery: string;
  platformCategoryIds: string[];
  controlCategoryIds: string[];
  setExpandedPlatformCategories: Dispatch<SetStateAction<string[]>>;
  setExpandedCategories: Dispatch<SetStateAction<string[]>>;
}

/** Раскрывает категории с результатами при активном поиске. */
export function useExpandCategoriesOnSearch({
  searchQuery,
  platformCategoryIds,
  controlCategoryIds,
  setExpandedPlatformCategories,
  setExpandedCategories,
}: UseExpandCategoriesOnSearchOptions) {
  const platformIdsKey = platformCategoryIds.join('\0');
  const controlIdsKey = controlCategoryIds.join('\0');

  useEffect(() => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    setExpandedPlatformCategories(platformCategoryIds);
    setExpandedCategories(controlCategoryIds);
  }, [
    searchQuery,
    platformIdsKey,
    controlIdsKey,
    platformCategoryIds,
    controlCategoryIds,
    setExpandedPlatformCategories,
    setExpandedCategories,
  ]);
}
