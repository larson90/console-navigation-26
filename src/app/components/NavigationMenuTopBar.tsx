import React from 'react';
import {
  NAV_MENU_LEADING_WIDTH,
  NAV_MENU_MAIN_GUTTER,
} from '../navigationMenuLayout';
import { useNavigationMenuWidth } from '../context/NavigationMenuWidthContext';
import { NavigationMenuSidebarHeader } from './NavigationMenuSidebarHeader';

interface NavigationMenuTopBarProps {
  search: React.ReactNode;
}

export function NavigationMenuTopBar({ search }: NavigationMenuTopBarProps) {
  const { drawerWidth, isResizing } = useNavigationMenuWidth();

  return (
    <div
      className="nav-menu-top-bar nav-menu-top-bar--pinned"
      style={
        {
          '--nav-menu-leading-width': `${NAV_MENU_LEADING_WIDTH}px`,
          '--nav-menu-main-gutter': `${NAV_MENU_MAIN_GUTTER}px`,
          width: drawerWidth,
          transition: isResizing ? 'none' : 'width 0.2s ease',
        } as React.CSSProperties
      }
    >
      <NavigationMenuSidebarHeader />
      <div className="nav-menu-top-bar__search">{search}</div>
    </div>
  );
}
