import React, { useEffect, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { FavoritesDragLayer } from './FavoritesDragLayer';
import { FAVORITE_SERVICE_CARD, type FavoriteDragItem } from './favoritesDnd';
import { ServiceCardItem } from './navigationServiceUi';
import type { ServiceCard } from '../data/serviceCatalog';

interface FavoritesListProps {
  favoriteServices: ServiceCard[];
  onToggleFavorite: (id: string) => void;
  onMoveFavorite: (dragIndex: number, hoverIndex: number) => void;
}

interface FavoriteListRowProps {
  service: ServiceCard;
  index: number;
  listRef: React.RefObject<HTMLDivElement | null>;
  onToggleFavorite: (id: string) => void;
  onMoveFavorite: (dragIndex: number, hoverIndex: number) => void;
}

function FavoriteListRow({
  service,
  index,
  listRef,
  onToggleFavorite,
  onMoveFavorite,
}: FavoriteListRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag, preview] = useDrag({
    type: FAVORITE_SERVICE_CARD,
    item: (monitor): FavoriteDragItem => {
      const listRect = listRef.current?.getBoundingClientRect();
      const rowRect = rowRef.current?.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();
      const grabOffsetY =
        clientOffset && rowRect ? clientOffset.y - rowRect.top : 0;

      return {
        id: service.id,
        index,
        title: service.title,
        icon: service.icon,
        lockX: rowRect?.left ?? 0,
        width: rowRect?.width ?? 0,
        height: rowRect?.height ?? 32,
        grabOffsetY,
        minY: listRect?.top ?? 0,
        maxY: (listRect?.bottom ?? 0) - (rowRect?.height ?? 32),
      };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: FAVORITE_SERVICE_CARD,
    hover: (item: FavoriteDragItem) => {
      if (!rowRef.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      onMoveFavorite(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  drag(drop(rowRef));

  return (
    <div
      ref={rowRef}
      className={`bg-[#fdfdfd] rounded-[4px] shrink-0 w-full relative ${isDragging ? 'opacity-30' : ''}`}
    >
      <ServiceCardItem
        service={service}
        onAddToFavorites={onToggleFavorite}
        isFavorite
        enableDrag={false}
      />
    </div>
  );
}

export function FavoritesList({
  favoriteServices,
  onToggleFavorite,
  onMoveFavorite,
}: FavoritesListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <FavoritesDragLayer />
      <div ref={listRef} className="nav-favorites-list flex flex-col gap-[4px] w-full">
        {favoriteServices.map((service, index) => (
          <FavoriteListRow
            key={service.id}
            service={service}
            index={index}
            listRef={listRef}
            onToggleFavorite={onToggleFavorite}
            onMoveFavorite={onMoveFavorite}
          />
        ))}
      </div>
    </>
  );
}
