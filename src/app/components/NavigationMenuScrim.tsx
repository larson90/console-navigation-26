import React from 'react';
import { useNavigationOverlayClose } from '../context/NavigationOverlayContext';

interface NavigationMenuScrimProps {
  children: React.ReactNode;
}

/** Обёртка меню: клик по затемнённой области справа от дровера закрывает оверлей. */
export function NavigationMenuScrim({ children }: NavigationMenuScrimProps) {
  const closeOverlay = useNavigationOverlayClose();

  const handleScrimClick = () => {
    closeOverlay?.();
  };

  return (
    <div
      className={`bg-[rgba(0,0,0,0.32)] absolute inset-0 ${closeOverlay ? 'nav-proto-scrim' : ''}`}
      onClick={closeOverlay ? handleScrimClick : undefined}
      onKeyDown={undefined}
    >
      <div
        className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pr-[20px] relative size-full"
        onClick={closeOverlay ? handleScrimClick : undefined}
      >
        <div
          className="bg-[#eeeff3] flex-[1_0_0] h-full max-w-[900px] min-w-[744px] relative shadow-[0px_0px_16px_0px_rgba(0,0,0,0.08),0px_24px_16px_0px_rgba(0,0,0,0.08)]"
          onClick={(e) => e.stopPropagation()}
          role="presentation"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
