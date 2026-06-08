import { useEffect, type Dispatch, type SetStateAction } from 'react';

interface UseExpandCategoriesOnSearchOptions {
  searchQuery: string;
  platformCategoryIds: string[];
  controlCategoryIds: string[];
  megaserviceCategoryIds?: string[];
  setExpandedPlatformCategories: Dispatch<SetStateAction<string[]>>;
  setExpandedCategories: Dispatch<SetStateAction<string[]>>;
  setExpandedMegaservices?: Dispatch<SetStateAction<string[]>>;
}

/** Раскрывает категории с результатами при активном поиске. */
export function useExpandCategoriesOnSearch({
  searchQuery,
  platformCategoryIds,
  controlCategoryIds,
  megaserviceCategoryIds = [],
  setExpandedPlatformCategories,
  setExpandedCategories,
  setExpandedMegaservices,
}: UseExpandCategoriesOnSearchOptions) {
  const platformIdsKey = platformCategoryIds.join('\0');
  const controlIdsKey = controlCategoryIds.join('\0');
  const megaserviceIdsKey = megaserviceCategoryIds.join('\0');

  useEffect(() => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    setExpandedPlatformCategories(platformCategoryIds);
    setExpandedCategories(controlCategoryIds);
    setExpandedMegaservices?.(megaserviceCategoryIds);
  }, [
    searchQuery,
    platformIdsKey,
    controlIdsKey,
    megaserviceIdsKey,
    platformCategoryIds,
    controlCategoryIds,
    megaserviceCategoryIds,
    setExpandedPlatformCategories,
    setExpandedCategories,
    setExpandedMegaservices,
  ]);
}
