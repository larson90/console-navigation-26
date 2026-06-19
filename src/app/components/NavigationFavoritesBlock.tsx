import React from 'react';
import type { ServiceCard } from '../data/serviceCatalog';
import { FavoritesList } from './FavoritesList';

const FAVORITES_STAR_ICON = '/assets/lk-figma/favorites-star.png';
const FAVORITES_STAR_SIZE = 40;

function FavoritesEmptyStateIcon() {
  return (
    <img
      src={FAVORITES_STAR_ICON}
      alt=""
      width={FAVORITES_STAR_SIZE}
      height={FAVORITES_STAR_SIZE}
      className="shrink-0 object-contain"
      aria-hidden
    />
  );
}

export interface NavigationFavoritesBlockProps {
  dropRef: React.Ref<HTMLDivElement>;
  dragClassName: string;
  favoriteServices: ServiceCard[];
  onToggleFavorite: (id: string) => void;
  onMoveFavorite: (dragIndex: number, hoverIndex: number) => void;
}

export function NavigationFavoritesBlock({
  dropRef,
  dragClassName,
  favoriteServices,
  onToggleFavorite,
  onMoveFavorite,
}: NavigationFavoritesBlockProps) {
  return (
    <div
      ref={dropRef}
      className={`nav-favorites-block bg-[#fdfdfd] content-stretch flex flex-col items-start relative rounded-[4px] w-full shrink-0 ${dragClassName}`}
    >
      <div className="relative shrink-0 w-full">
        <div className="content-stretch flex flex-col gap-[4px] items-start p-[8px] relative size-full">
          <div className="relative shrink-0 w-full">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex gap-[4px] items-center pl-[4px] relative size-full">
                <div className="flex flex-[1_0_0] flex-col font-['SB_Sans_Interface:Semibold',sans-serif] justify-center leading-[0] min-w-px not-italic overflow-hidden relative text-[#6d707f] text-[12px] text-ellipsis text-left whitespace-nowrap">
                  <p className="leading-[16px] overflow-hidden text-ellipsis">Избранное</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="nav-favorites-block__content relative w-full shrink-0 px-[8px] pb-[8px]">
        {favoriteServices.length === 0 ? (
          <div className="relative shrink-0 w-full">
            <div className="flex flex-col items-center w-full">
              <div className="content-stretch flex flex-col gap-[8px] items-center p-[12px] relative w-full">
                <FavoritesEmptyStateIcon />
                <div className="flex flex-col font-['SB_Sans_Interface:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#8b8e9b] text-[12px] text-center tracking-[0.1px] w-[153.494px]">
                  <p className="leading-[16px]">Перетащите сюда карточки сервисов, расположенные справа</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <FavoritesList
            favoriteServices={favoriteServices}
            onToggleFavorite={onToggleFavorite}
            onMoveFavorite={onMoveFavorite}
          />
        )}
      </div>
    </div>
  );
}
