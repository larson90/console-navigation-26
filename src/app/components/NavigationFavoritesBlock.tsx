import React, { useCallback, useEffect, useState } from 'react';
import type { ServiceCard } from '../data/serviceCatalog';
import { FavoritesList } from './FavoritesList';
import { NavSidebarSegmentControl, type NavSidebarPanelSegment } from './NavSidebarSegmentControl';
import { RecentServicesList } from './RecentServicesList';

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

function RecentEmptyStateIcon() {
  return (
    <svg
      className="shrink-0"
      width={FAVORITES_STAR_SIZE}
      height={FAVORITES_STAR_SIZE}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden
    >
      <circle cx="20" cy="20" r="14" stroke="#C4C6D0" strokeWidth="2" />
      <path
        d="M20 12v8l5 3"
        stroke="#C4C6D0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 8l-2 2 2 2"
        stroke="#C4C6D0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 10h4"
        stroke="#C4C6D0"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export interface NavigationFavoritesBlockProps {
  dropRef: (element: HTMLDivElement | null) => void;
  dragClassName: string;
  isDraggingService: boolean;
  favoriteServices: ServiceCard[];
  recentServices: ServiceCard[];
  onToggleFavorite: (id: string) => void;
  onMoveFavorite: (dragIndex: number, hoverIndex: number) => void;
  onSortFavorites: () => void;
  onClearFavorites: () => void;
  onClearRecent: () => void;
}

export function NavigationFavoritesBlock({
  dropRef,
  dragClassName,
  isDraggingService,
  favoriteServices,
  recentServices,
  onToggleFavorite,
  onMoveFavorite,
  onSortFavorites,
  onClearFavorites,
  onClearRecent,
}: NavigationFavoritesBlockProps) {
  const [segment, setSegment] = useState<NavSidebarPanelSegment>('favorites');
  const isFavoritesSegment = segment === 'favorites';
  const isDropTarget = isFavoritesSegment || isDraggingService;

  useEffect(() => {
    if (isDraggingService && segment === 'recent') {
      setSegment('favorites');
    }
  }, [isDraggingService, segment]);

  const setBlockRef = useCallback(
    (node: HTMLDivElement | null) => {
      dropRef(isDropTarget ? node : null);
    },
    [dropRef, isDropTarget],
  );

  return (
    <div
      ref={setBlockRef}
      className={`nav-favorites-block bg-[#fdfdfd] content-stretch flex flex-col items-start relative rounded-[4px] w-full shrink-0 ${
        isDropTarget ? dragClassName : ''
      }`}
    >
      <div className="nav-favorites-block__toolbar relative shrink-0 w-full p-[8px] pb-0">
        <NavSidebarSegmentControl
          value={isDraggingService ? 'favorites' : segment}
          onChange={setSegment}
          onSortFavorites={onSortFavorites}
          onClearFavorites={onClearFavorites}
          onClearRecent={onClearRecent}
        />
      </div>

      <div className="nav-favorites-block__content relative w-full shrink-0 px-[8px] pb-[8px] pt-[8px]">
        {isDropTarget ? (
          favoriteServices.length === 0 ? (
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
          )
        ) : recentServices.length === 0 ? (
          <div className="relative shrink-0 w-full">
            <div className="flex flex-col items-center w-full">
              <div className="content-stretch flex flex-col gap-[8px] items-center p-[12px] relative w-full">
                <RecentEmptyStateIcon />
                <div className="flex flex-col font-['SB_Sans_Interface:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#8b8e9b] text-[12px] text-center tracking-[0.1px] w-[153.494px]">
                  <p className="leading-[16px]">Здесь появятся сервисы, которые вы недавно открывали</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <RecentServicesList recentServices={recentServices} />
        )}
      </div>
    </div>
  );
}
