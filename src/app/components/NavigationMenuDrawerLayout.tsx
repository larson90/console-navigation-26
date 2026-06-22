import React from 'react';
import { NavigationMenuTopBar } from './NavigationMenuTopBar';

interface NavigationMenuDrawerLayoutProps {
  search: React.ReactNode;
  children: React.ReactNode;
}

export function NavigationMenuDrawerLayout({ search, children }: NavigationMenuDrawerLayoutProps) {
  return (
    <div className="nav-menu-drawer-layout">
      <NavigationMenuTopBar search={search} />
      <div className="nav-menu-drawer__body">{children}</div>
    </div>
  );
}
