import React from 'react';
import { useNavigateToMarketplace } from '../hooks/useNavigateToMarketplace';
import { MarketplaceServicesIcon } from './MarketplaceServicesIcon';

function MarketplaceBannerIcon() {
  return (
    <div className="nav-menu-icon-shell nav-menu-icon-shell--fixed nav-solutions-marketplace-banner__icon-shell shrink-0">
      <MarketplaceServicesIcon className="nav-menu-icon-shell__glyph text-white" />
    </div>
  );
}

function MarketplaceBannerPattern() {
  return (
    <svg className="nav-solutions-marketplace-banner__pattern-svg" viewBox="0 0 120 120" preserveAspectRatio="xMaxYMid slice" aria-hidden>
      <defs>
        <pattern id="mp-swiss-cross" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M10 4V16M4 10H16" stroke="#c4ff7e" strokeWidth="1.5" strokeLinecap="round" />
        </pattern>
      </defs>
      <rect width="120" height="120" fill="url(#mp-swiss-cross)" />
    </svg>
  );
}

export function SolutionsMarketplaceBanner() {
  const navigateToMarketplace = useNavigateToMarketplace();

  return (
    <button
      type="button"
      className="nav-solutions-marketplace-banner group relative w-full shrink-0 overflow-hidden text-left cursor-pointer"
      aria-label="Маркетплейс — инструменты от ведущих вендоров"
      onClick={navigateToMarketplace}
    >
      <div className="nav-solutions-marketplace-banner__layout">
        <div className="nav-solutions-marketplace-banner__main nav-solutions-promo-main">
          <MarketplaceBannerIcon />
          <div className="nav-solutions-promo-copy">
            <div className="nav-solutions-marketplace-banner__title-row">
              <p className="nav-solutions-promo-title nav-solutions-marketplace-banner__title">Маркетплейс</p>
              <span className="nav-solutions-marketplace-banner__badge">150+ сервисов</span>
            </div>
            <p className="nav-solutions-promo-desc nav-solutions-marketplace-banner__desc">
              Инструменты от ведущих вендоров для разработки и анализа данных, безопасности и бизнес-приложений.
            </p>
          </div>
        </div>
        <div className="nav-solutions-marketplace-banner__pattern" aria-hidden>
          <MarketplaceBannerPattern />
        </div>
      </div>
    </button>
  );
}
