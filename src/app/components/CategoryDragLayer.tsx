import { useDragLayer } from 'react-dnd';
import { CategoryCollapsedHeader } from './categoryBlockHeaderUi';
import {
  CONTROL_CATEGORY_TYPE,
  PLATFORM_CATEGORY_TYPE,
  type CategoryDragItem,
} from './categoryDnd';
import { getVerticalPreviewTop } from './verticalDrag';

function getLiveListGeometry(item: CategoryDragItem) {
  const list = document.querySelector('.nav-category-list--dragging');
  const listRect = list?.getBoundingClientRect();

  if (!listRect) {
    return {
      minY: item.minY,
      maxY: item.maxY,
      lockX: item.lockX,
      width: item.width,
    };
  }

  return {
    minY: listRect.top,
    maxY: listRect.bottom - item.height,
    lockX: listRect.left,
    width: listRect.width,
  };
}

export function CategoryDragLayer() {
  const { item, itemType, isDragging, clientOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem() as CategoryDragItem | null,
    itemType: monitor.getItemType(),
    isDragging: monitor.isDragging(),
    clientOffset: monitor.getClientOffset(),
  }));

  const isCategoryDrag =
    itemType === PLATFORM_CATEGORY_TYPE || itemType === CONTROL_CATEGORY_TYPE;

  if (!isDragging || !isCategoryDrag || !item || !clientOffset) {
    return null;
  }

  const { minY, maxY, lockX, width } = getLiveListGeometry(item);
  const top = getVerticalPreviewTop({ ...item, minY, maxY }, clientOffset.y);

  return (
    <div
      className="nav-category-drag-preview pointer-events-none fixed z-[1200] overflow-hidden rounded-[4px] bg-[#fdfdfd] shadow-[0px_4px_12px_rgba(0,0,0,0.12)]"
      style={{
        left: lockX,
        top,
        width,
        height: item.height,
      }}
    >
      {item.accentColor && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[4px] border-l-[6px] border-solid"
          style={{ borderColor: item.accentColor }}
        />
      )}
      <CategoryCollapsedHeader
        title={item.title}
        hasAccentPadding={item.hasAccentPadding}
        showDragHandle
      />
    </div>
  );
}
