import { ServiceCardItem } from './navigationServiceUi';
import type { ServiceCard } from '../data/serviceCatalog';

interface FavoritesListProps {
  favoriteServices: ServiceCard[];
  onToggleFavorite: (id: string) => void;
}

export function FavoritesList({ favoriteServices, onToggleFavorite }: FavoritesListProps) {
  return (
    <div className="flex flex-col gap-[4px] w-full">
      {favoriteServices.map((service, index) => (
        <div
          key={`fav-${index}-${service.id}`}
          className="bg-[#fdfdfd] rounded-[4px] shrink-0 w-full relative"
        >
          <ServiceCardItem
            service={service}
            onAddToFavorites={onToggleFavorite}
            isFavorite
          />
        </div>
      ))}
    </div>
  );
}
