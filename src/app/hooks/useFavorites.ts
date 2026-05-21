import { useCallback, useMemo, useState } from 'react';
import { useDrop } from 'react-dnd';
import {
  buildServicesIndex,
  resolveFavoriteServices,
  type ServiceCard,
} from '../data/serviceCatalog';

export function useFavorites(controlItemIcon: string) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const servicesIndex = useMemo(
    () => buildServicesIndex(controlItemIcon),
    [controlItemIcon],
  );

  const favoriteServices = useMemo(
    () => resolveFavoriteServices(favoriteIds, servicesIndex),
    [favoriteIds, servicesIndex],
  );

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'SERVICE_CARD',
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

  const toggleFavorite = useCallback((id: string) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id],
    );
  }, []);

  return {
    favorites: favoriteIds,
    favoriteServices,
    isOver,
    drop,
    toggleFavorite,
  };
}

export type { ServiceCard };
