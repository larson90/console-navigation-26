import { useCallback, useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useCategoryDrag } from './CategoryDragContext';
import type { CategoryDragItem } from './categoryDnd';
import { getCategoryDragBounds, getCategorySlotCenterY } from './verticalDrag';

const DRAG_CLICK_THRESHOLD_PX = 4;

export function useCategoryBlockDrag({
  type,
  index,
  title,
  accentColor,
  hasAccentPadding,
  onMove,
}: {
  type: string;
  index: number;
  title: string;
  accentColor: string | null;
  hasAccentPadding: boolean;
  onMove: (dragIndex: number, hoverIndex: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const didDragRef = useRef(false);
  const { beginDrag, endDrag, canReorderRef } = useCategoryDrag();

  const [{ isDragging }, drag, preview] = useDrag({
    type,
    item: (monitor): CategoryDragItem => {
      beginDrag();

      const row = ref.current;
      if (!row) {
        return {
          index,
          title,
          accentColor,
          hasAccentPadding,
          lockX: 0,
          width: 0,
          height: 0,
          grabOffsetY: 0,
          minY: 0,
          maxY: 0,
          listTop: 0,
          listBottom: 0,
        };
      }

      return {
        index,
        title,
        accentColor,
        hasAccentPadding,
        ...getCategoryDragBounds(row, monitor),
      };
    },
    end: (_, monitor) => {
      endDrag();
      const offset = monitor.getDifferenceFromInitialOffset();
      if (offset && Math.hypot(offset.x, offset.y) > DRAG_CLICK_THRESHOLD_PX) {
        didDragRef.current = true;
        requestAnimationFrame(() => {
          didDragRef.current = false;
        });
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: type,
    hover: (item: CategoryDragItem, monitor) => {
      if (!ref.current || !canReorderRef.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;

      const slotCenterY = getCategorySlotCenterY(ref.current);

      if (dragIndex < hoverIndex && clientOffset.y < slotCenterY) return;
      if (dragIndex > hoverIndex && clientOffset.y > slotCenterY) return;

      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  drop(ref);
  drag(headerRef);

  const shouldIgnoreHeaderClick = useCallback(() => didDragRef.current, []);

  return { ref, headerRef, isDragging, shouldIgnoreHeaderClick };
}
