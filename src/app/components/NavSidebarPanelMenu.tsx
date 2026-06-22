import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

function SidebarPanelMenuIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="4" r="1.25" fill="currentColor" />
      <circle cx="8" cy="8" r="1.25" fill="currentColor" />
      <circle cx="8" cy="12" r="1.25" fill="currentColor" />
    </svg>
  );
}

export interface NavSidebarPanelMenuProps {
  onSortFavorites: () => void;
  onClearFavorites: () => void;
  onClearRecent: () => void;
}

export function NavSidebarPanelMenu({
  onSortFavorites,
  onClearFavorites,
  onClearRecent,
}: NavSidebarPanelMenuProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="nav-sidebar-panel-menu-btn nav-icon-btn"
          aria-label="Действия с избранным и недавними"
          onClick={(event) => event.stopPropagation()}
        >
          <SidebarPanelMenuIcon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={4} className="nav-sidebar-panel-menu">
        <DropdownMenuItem
          className="nav-sidebar-panel-menu__item"
          onSelect={() => onSortFavorites()}
        >
          Отсортировать Избранное по алфавиту
        </DropdownMenuItem>
        <DropdownMenuItem
          className="nav-sidebar-panel-menu__item"
          onSelect={() => onClearFavorites()}
        >
          Удалить все из Избранного
        </DropdownMenuItem>
        <DropdownMenuItem
          className="nav-sidebar-panel-menu__item"
          onSelect={() => onClearRecent()}
        >
          Очистить список Недавнее
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
