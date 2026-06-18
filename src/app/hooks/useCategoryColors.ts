import { useCallback, useState } from 'react';
import { DEFAULT_CATEGORY_COLORS } from '../data/serviceCatalog';

export function useCategoryColors() {
  const [colorsEnabled, setColorsEnabled] = useState(true);
  const [categoryColors, setCategoryColors] = useState<Record<string, string | null>>(
    () => ({ ...DEFAULT_CATEGORY_COLORS }),
  );

  const setCategoryColor = useCallback((categoryId: string, color: string | null) => {
    setCategoryColors((prev) => ({ ...prev, [categoryId]: color }));
  }, []);

  const resetCategoryColors = useCallback(() => {
    setColorsEnabled(true);
    setCategoryColors({ ...DEFAULT_CATEGORY_COLORS });
  }, []);

  return {
    categoryColors,
    colorsEnabled,
    setCategoryColor,
    setColorsEnabled,
    resetCategoryColors,
  };
}
