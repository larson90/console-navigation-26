import { useEffect, type Dispatch, type SetStateAction } from 'react';

interface UseExpandCategoriesOnSearchOptions {
  searchQuery: string;
  platformCategoryIds: string[];
  controlCategoryIds: string[];
  platformMegaserviceIds?: string[];
  controlMegaserviceIds?: string[];
  setExpandedPlatformCategories: Dispatch<SetStateAction<string[]>>;
  setExpandedCategories: Dispatch<SetStateAction<string[]>>;
  setExpandedPlatformMegaservices?: (ids: string[] | null) => void;
  setExpandedControlMegaservices?: (ids: string[] | null) => void;
}

/** Раскрывает категории с результатами при активном поиске. */
export function useExpandCategoriesOnSearch({
  searchQuery,
  platformCategoryIds,
  controlCategoryIds,
  platformMegaserviceIds = [],
  controlMegaserviceIds = [],
  setExpandedPlatformCategories,
  setExpandedCategories,
  setExpandedPlatformMegaservices,
  setExpandedControlMegaservices,
}: UseExpandCategoriesOnSearchOptions) {
  const platformIdsKey = platformCategoryIds.join('\0');
  const controlIdsKey = controlCategoryIds.join('\0');
  const platformMegaserviceIdsKey = platformMegaserviceIds.join('\0');
  const controlMegaserviceIdsKey = controlMegaserviceIds.join('\0');

  useEffect(() => {
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      setExpandedPlatformMegaservices?.(null);
      setExpandedControlMegaservices?.(null);
      return;
    }

    setExpandedPlatformCategories(platformCategoryIds);
    setExpandedCategories(controlCategoryIds);
    setExpandedPlatformMegaservices?.(platformMegaserviceIds);
    setExpandedControlMegaservices?.(controlMegaserviceIds);
  }, [
    searchQuery,
    platformIdsKey,
    controlIdsKey,
    platformMegaserviceIdsKey,
    controlMegaserviceIdsKey,
    platformCategoryIds,
    controlCategoryIds,
    platformMegaserviceIds,
    controlMegaserviceIds,
    setExpandedPlatformCategories,
    setExpandedCategories,
    setExpandedPlatformMegaservices,
    setExpandedControlMegaservices,
  ]);
}
