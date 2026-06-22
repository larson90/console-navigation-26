import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useNavigationOverlayClose } from '../context/NavigationOverlayContext';
import { useNavigationPrototype } from '../context/NavigationPrototypeContext';
import { usePlatform } from '../context/PlatformContext';
import { buildMarketplaceNavState, MARKETPLACE_PATH } from '../navigation/marketplaceNavigation';
import { AppTooltip } from './AppTooltip';
import { HeaderLogoMorph } from './HeaderLogoMorph';
import { HeaderPlatformSelector } from './HeaderPlatformSelector';

const ASSETS = '/assets/lk-header';

function HeaderMenuCloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M7 7L17 17M17 7L7 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function NavigationMenuSidebarHeader({
  showPlatformSelector = true,
}: {
  showPlatformSelector?: boolean;
}) {
  const navigate = useNavigate();
  const closeMenu = useNavigationOverlayClose();
  const { completeMenuNavigation } = useNavigationPrototype();
  const { selectedId } = usePlatform();
  const [platformOpen, setPlatformOpen] = useState(false);

  const closeSiblingDropdowns = () => {
    setPlatformOpen(false);
  };

  const goToPlatformHome = () => {
    closeSiblingDropdowns();
    if (selectedId === 'marketplace') {
      navigate(MARKETPLACE_PATH, { state: buildMarketplaceNavState() });
    } else {
      navigate('/');
    }
    completeMenuNavigation();
  };

  return (
    <div className="lk-header lk-header--menu-bridge" role="presentation">
      <AppTooltip label="На главную">
        <a
          href="/"
          className="lk-header__logo lk-header__logo--leading"
          aria-label="На главную"
          onClick={(event) => {
            event.preventDefault();
            goToPlatformHome();
          }}
        >
          <HeaderLogoMorph />
        </a>
      </AppTooltip>

      {showPlatformSelector && (
        <HeaderPlatformSelector
          open={platformOpen}
          onOpenChange={setPlatformOpen}
        />
      )}

      <AppTooltip label="Закрыть меню">
        <button
          type="button"
          className="lk-header__appswitcher"
          aria-label="Закрыть меню"
          onClick={() => {
            closeSiblingDropdowns();
            closeMenu?.();
          }}
        >
          <HeaderMenuCloseIcon />
        </button>
      </AppTooltip>
    </div>
  );
}

export function HeaderAppSwitcherIcon({ menuOpen }: { menuOpen: boolean }) {
  if (menuOpen) {
    return <HeaderMenuCloseIcon />;
  }

  return <img src={`${ASSETS}/lk-header-appswitcher.svg`} alt="" width={24} height={24} />;
}
