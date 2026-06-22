import React, { useMemo } from 'react';
import { ServiceCardItem } from './navigationServiceUi';
import type { ServiceCard } from '../data/serviceCatalog';

interface RecentServicesListProps {
  recentServices: ServiceCard[];
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
}

export function RecentServicesList({
  recentServices,
  favoriteIds,
  onToggleFavorite,
}: RecentServicesListProps) {
  const favoriteIdSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  return (
    <div className="nav-favorites-list flex flex-col gap-[4px] w-full">
      {recentServices.map((service) => (
        <div
          key={service.id}
          className="bg-[#fdfdfd] rounded-[4px] shrink-0 w-full relative"
        >
          <ServiceCardItem
            service={service}
            onAddToFavorites={onToggleFavorite}
            isFavorite={favoriteIdSet.has(service.id)}
            enableDrag={false}
          />
        </div>
      ))}
    </div>
  );
}
