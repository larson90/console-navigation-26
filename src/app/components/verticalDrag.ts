import { CATEGORY_LIST_GAP, CATEGORY_SLOT_HEIGHT } from './categoryDnd';

export interface VerticalDragBounds {
  lockX: number;
  width: number;
  height: number;
  grabOffsetY: number;
  minY: number;
  maxY: number;
}

export function getVerticalPreviewTop(item: VerticalDragBounds, pointerY: number) {
  const previewTop = pointerY - item.grabOffsetY;
  return Math.min(item.maxY, Math.max(item.minY, previewTop));
}

export function getVerticalDragBounds(
  row: HTMLElement,
  monitor: { getClientOffset(): { x: number; y: number } | null },
  listSelector = '.nav-category-list',
): VerticalDragBounds {
  const list = row.closest(listSelector);
  const listRect = list?.getBoundingClientRect();
  const rowRect = row.getBoundingClientRect();
  const clientOffset = monitor.getClientOffset();
  const grabOffsetY = clientOffset ? clientOffset.y - rowRect.top : 0;

  return {
    lockX: rowRect.left,
    width: rowRect.width,
    height: rowRect.height,
    grabOffsetY,
    minY: listRect?.top ?? 0,
    maxY: (listRect?.bottom ?? 0) - rowRect.height,
  };
}

export function getCategoryDragBounds(
  row: HTMLElement,
  monitor: { getClientOffset(): { x: number; y: number } | null },
  listSelector = '.nav-category-list',
) {
  const list = row.closest(listSelector);
  const listRect = list?.getBoundingClientRect();
  const rowRect = row.getBoundingClientRect();
  const clientOffset = monitor.getClientOffset();
  const grabOffsetY = clientOffset ? clientOffset.y - rowRect.top : 0;

  return {
    lockX: listRect?.left ?? rowRect.left,
    width: listRect?.width ?? rowRect.width,
    height: CATEGORY_SLOT_HEIGHT,
    grabOffsetY,
    minY: listRect?.top ?? 0,
    maxY: (listRect?.bottom ?? 0) - CATEGORY_SLOT_HEIGHT,
    listTop: listRect?.top ?? 0,
    listBottom: listRect?.bottom ?? 0,
  };
}

export function getCategorySlotCenterY(row: HTMLElement) {
  const rowRect = row.getBoundingClientRect();
  return rowRect.top + rowRect.height / 2;
}

export { CATEGORY_LIST_GAP, CATEGORY_SLOT_HEIGHT };
