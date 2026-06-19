import { useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useCategoryDrag } from './CategoryDragContext';
import type { CategoryDragItem } from './categoryDnd';

interface CategoryListEndDropZoneProps {
  type: string;
  itemCount: number;
  onMove: (dragIndex: number, hoverIndex: number) => void;
}

/** Зона в конце списка — позволяет сбросить категорию на последнюю позицию. */
export function CategoryListEndDropZone({ type, itemCount, onMove }: CategoryListEndDropZoneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { canReorderRef } = useCategoryDrag();

  const [, drop] = useDrop({
    accept: type,
    hover: (item: CategoryDragItem) => {
      if (!ref.current || !canReorderRef.current || itemCount === 0) return;

      const dragIndex = item.index;
      const lastIndex = itemCount - 1;
      if (dragIndex >= lastIndex) return;

      onMove(dragIndex, lastIndex);
      item.index = lastIndex;
    },
  });

  drop(ref);

  return (
    <div
      ref={ref}
      className="nav-category-list-end-drop"
      aria-hidden
    />
  );
}
