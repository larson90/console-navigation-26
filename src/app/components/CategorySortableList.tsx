import { LayoutGroup } from 'motion/react';
import { useCategoryDrag } from './CategoryDragContext';

interface CategorySortableListProps {
  children: React.ReactNode;
  className?: string;
}

export function CategorySortableList({ children, className = '' }: CategorySortableListProps) {
  const { isDragging } = useCategoryDrag();

  return (
    <LayoutGroup id="nav-category-list">
      <div
        className={`nav-category-list${isDragging ? ' nav-category-list--dragging' : ''} ${className}`.trim()}
      >
        {children}
      </div>
    </LayoutGroup>
  );
}
