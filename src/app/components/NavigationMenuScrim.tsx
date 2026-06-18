import React from 'react';
import { useNavigationOverlayClose } from '../context/NavigationOverlayContext';
import { NavigationMenuWidthProvider, useNavigationMenuWidth } from '../context/NavigationMenuWidthContext';
import { CategoryDragLayer } from './CategoryDragLayer';

interface NavigationMenuScrimProps {
  children: React.ReactNode;
}

function NavigationMenuScrimInner({ children }: NavigationMenuScrimProps) {
  const closeOverlay = useNavigationOverlayClose();
  const { drawerWidth, isResizing } = useNavigationMenuWidth();

  const handleScrimClick = () => {
    closeOverlay?.();
  };

  return (
    <>
      <CategoryDragLayer />
      <div
      className={`absolute inset-0 ${closeOverlay ? 'nav-proto-scrim' : 'bg-[rgba(0,0,0,0.32)]'}`}
      onClick={closeOverlay ? handleScrimClick : undefined}
      onKeyDown={undefined}
    >
      <div
        className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pr-[20px] relative size-full"
        onClick={closeOverlay ? handleScrimClick : undefined}
      >
        <div
          className="nav-menu-drawer bg-[#eeeff3] h-full relative shadow-[0px_0px_16px_0px_rgba(0,0,0,0.08),0px_24px_16px_0px_rgba(0,0,0,0.08)] shrink-0"
          style={{
            width: drawerWidth,
            transition: isResizing ? 'none' : 'width 0.2s ease',
          }}
          onClick={(e) => e.stopPropagation()}
          role="presentation"
        >
          {children}
        </div>
      </div>
    </div>
    </>
  );
}

/** Обёртка меню: клик по затемнённой области справа от дровера закрывает оверлей. */
export function NavigationMenuScrim({ children }: NavigationMenuScrimProps) {
  return (
    <NavigationMenuWidthProvider>
      <NavigationMenuScrimInner>{children}</NavigationMenuScrimInner>
    </NavigationMenuWidthProvider>
  );
}
