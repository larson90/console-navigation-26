import { useEffect, type Dispatch, type SetStateAction } from 'react';

interface UseExpandCategoriesOnSearchOptions {
  searchQuery: string;
  platformCategoryIds: string[];
  controlCategoryIds: string[];
  megaserviceIds?: string[];
  setExpandedPlatformCategories: Dispatch<SetStateAction<string[]>>;
  setExpandedCategories: Dispatch<SetStateAction<string[]>>;
  setExpandedMegaservices?: Dispatch<SetStateAction<string[]>>;
}

/** Раскрывает категории с результатами при активном поиске. */
export function useExpandCategoriesOnSearch({
  searchQuery,
  platformCategoryIds,
  controlCategoryIds,
  megaserviceIds = [],
  setExpandedPlatformCategories,
  setExpandedCategories,
  setExpandedMegaservices,
}: UseExpandCategoriesOnSearchOptions) {
  const platformIdsKey = platformCategoryIds.join('\0');
  const controlIdsKey = controlCategoryIds.join('\0');
  const megaserviceIdsKey = megaserviceIds.join('\0');

  useEffect(() => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    setExpandedPlatformCategories(platformCategoryIds);
    setExpandedCategories(controlCategoryIds);
    setExpandedMegaservices?.(megaserviceIds);
  }, [
    searchQuery,
    platformIdsKey,
    controlIdsKey,
    megaserviceIdsKey,
    platformCategoryIds,
    controlCategoryIds,
    megaserviceIds,
    setExpandedPlatformCategories,
    setExpandedCategories,
    setExpandedMegaservices,
  ]);
}
