import React from 'react';
import {
  NAV_MENU_LEADING_WIDTH,
  NAV_MENU_MAIN_GUTTER,
} from '../navigationMenuLayout';
import { NavigationMenuSidebarHeader } from './NavigationMenuSidebarHeader';

interface NavigationMenuTopBarProps {
  search: React.ReactNode;
}

export function NavigationMenuTopBar({ search }: NavigationMenuTopBarProps) {
  return (
    <div
      className="nav-menu-top-bar"
      style={
        {
          '--nav-menu-leading-width': `${NAV_MENU_LEADING_WIDTH}px`,
          '--nav-menu-main-gutter': `${NAV_MENU_MAIN_GUTTER}px`,
        } as React.CSSProperties
      }
    >
      <NavigationMenuSidebarHeader />
      <div className="nav-menu-top-bar__search">{search}</div>
    </div>
  );
}
