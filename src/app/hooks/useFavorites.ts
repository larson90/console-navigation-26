import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDragDropManager, useDrop } from 'react-dnd';
import {
  buildServicesIndex,
  resolveFavoriteServices,
  type ServiceCard,
} from '../data/serviceCatalog';

const SERVICE_CARD_TYPE = 'SERVICE_CARD';

export function useFavorites(controlItemIcon: string) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const dragDropManager = useDragDropManager();
  const [isDraggingService, setIsDraggingService] = useState(false);

  const servicesIndex = useMemo(
    () => buildServicesIndex(controlItemIcon),
    [controlItemIcon],
  );

  const favoriteServices = useMemo(
    () => resolveFavoriteServices(favoriteIds, servicesIndex),
    [favoriteIds, servicesIndex],
  );

  useEffect(() => {
    const monitor = dragDropManager.getMonitor();

    const updateDraggingState = () => {
      setIsDraggingService(
        monitor.isDragging() && monitor.getItemType() === SERVICE_CARD_TYPE,
      );
    };

    updateDraggingState();
    return monitor.subscribeToStateChange(updateDraggingState);
  }, [dragDropManager]);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: SERVICE_CARD_TYPE,
      drop: (item: { id: string }) => {
        setFavoriteIds((prev) =>
          prev.includes(item.id) ? prev : [...prev, item.id],
        );
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [],
  );

  const favoritesDragClassName = isOver
    ? 'nav-favorites-block--drop-over'
    : isDraggingService
      ? 'nav-favorites-block--drop-active'
      : '';

  const toggleFavorite = useCallback((id: string) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id],
    );
  }, []);

  const moveFavorite = useCallback((dragIndex: number, hoverIndex: number) => {
    setFavoriteIds((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(hoverIndex, 0, moved);
      return next;
    });
  }, []);

  return {
    favorites: favoriteIds,
    favoriteServices,
    isOver,
    isDraggingService,
    favoritesDragClassName,
    drop,
    toggleFavorite,
    moveFavorite,
  };
}

export type { ServiceCard };
