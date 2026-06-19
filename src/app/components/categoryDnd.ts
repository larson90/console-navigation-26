import type { VerticalDragBounds } from './verticalDrag';

export const PLATFORM_CATEGORY_TYPE = 'PLATFORM_CATEGORY';
export const CONTROL_CATEGORY_TYPE = 'CATEGORY';
/** Общий тип DnD для platform- и control-категорий в одном списке. */
export const NAV_CATEGORY_TYPE = 'NAV_CATEGORY';

export const CATEGORY_SLOT_HEIGHT = 56;
export const CATEGORY_LIST_GAP = 4;
export const CATEGORY_COLLAPSE_MS = 440;

export interface CategoryDragItem extends VerticalDragBounds {
  index: number;
  title: string;
  accentColor: string | null;
  hasAccentPadding: boolean;
  listTop: number;
  listBottom: number;
}
