import { useDragLayer } from 'react-dnd';
import { ServiceIcon } from './navigationServiceUi';
import { FAVORITE_SERVICE_CARD, type FavoriteDragItem } from './favoritesDnd';
import { getVerticalPreviewTop } from './verticalDrag';

export function FavoritesDragLayer() {
  const { item, itemType, isDragging, clientOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem() as FavoriteDragItem | null,
    itemType: monitor.getItemType(),
    isDragging: monitor.isDragging(),
    clientOffset: monitor.getClientOffset(),
  }));

  if (!isDragging || itemType !== FAVORITE_SERVICE_CARD || !item || !clientOffset) {
    return null;
  }

  const top = getVerticalPreviewTop(item, clientOffset.y);

  return (
    <div
      className="nav-favorites-drag-preview pointer-events-none fixed z-[1200] overflow-hidden rounded-[4px] bg-[#fdfdfd] shadow-[0px_4px_12px_rgba(0,0,0,0.12)]"
      style={{
        left: item.lockX,
        top,
        width: item.width,
        height: item.height,
      }}
    >
      <div className="flex h-full min-h-[32px] items-center gap-[8px] p-[4px]">
        <ServiceIcon icon={item.icon} />
        <p className="min-w-0 flex-1 truncate font-['SB_Sans_Interface:Regular',sans-serif] text-[13px] leading-[16px] tracking-[0.1px] text-[#41424e]">
          {item.title}
        </p>
      </div>
    </div>
  );
}
