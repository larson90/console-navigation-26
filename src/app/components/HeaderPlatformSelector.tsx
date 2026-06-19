import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { PLATFORMS, type PlatformId, type PlatformOption } from '../data/platformCatalog';
import { usePlatform } from '../context/PlatformContext';
import { isMarketplacePath, MARKETPLACE_TITLE } from '../navigation/marketplaceNavigation';
import { PlatformItemIcon } from './PlatformIcons';
import { AppTooltip } from './AppTooltip';
import { useScreenLoading } from '../context/ScreenLoadingContext';

const ASSETS = '/assets/lk-header';

interface HeaderPlatformSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HeaderPlatformSelector({ open, onOpenChange }: HeaderPlatformSelectorProps) {
  const { pathname } = useLocation();
  const { selectedId, selectedPlatform, selectPlatform } = usePlatform();
  const { startScreenLoading } = useScreenLoading();
  const rootRef = useRef<HTMLDivElement>(null);
  const isMarketplaceRoute = isMarketplacePath(pathname);
  const headerPlatformId: PlatformId = isMarketplaceRoute ? 'marketplace' : selectedId;
  const headerPlatformTitle = isMarketplaceRoute ? MARKETPLACE_TITLE : selectedPlatform.title;

  const cloudPlatforms = PLATFORMS.filter((p) => p.section === 'cloud');
  const otherProducts = PLATFORMS.filter((p) => p.section === 'other');

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        onOpenChange(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [open, onOpenChange]);

  const renderListItem = (platform: PlatformOption) => {
    const isSelected =
      platform.id === 'marketplace'
        ? isMarketplaceRoute
        : !isMarketplaceRoute && platform.id === selectedId;

    return (
      <button
        key={platform.id}
        type="button"
        role="option"
        aria-selected={isSelected}
        aria-label={platform.title}
        onClick={() => {
          if (!isSelected) {
            startScreenLoading();
          }
          selectPlatform(platform.id);
          onOpenChange(false);
        }}
        className={`lk-platform-list__item${isSelected ? ' lk-platform-list__item--selected' : ''}`}
      >
        <span className="lk-platform-list__icon" aria-hidden>
          <PlatformItemIcon id={platform.id} size="sm" />
        </span>
        <span className="lk-platform-list__content">
          <span className="lk-platform-list__title">{platform.title}</span>
          <span className="lk-platform-list__description">{platform.description}</span>
        </span>
      </button>
    );
  };

  return (
    <div className="lk-header__platform-wrap" ref={rootRef}>
      <AppTooltip label={headerPlatformTitle}>
        <button
          type="button"
          className={`lk-header__platform-btn lk-header__platform-btn--icon-only${open ? ' lk-header__platform-btn--open' : ''}`}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-label={headerPlatformTitle}
          onClick={() => onOpenChange(!open)}
        >
          <PlatformItemIcon id={headerPlatformId} size="sm" />
          <img
            src={`${ASSETS}/lk-header-chev-down.svg`}
            alt=""
            width={16}
            height={16}
            className={`lk-header__platform-chev${open ? ' lk-header__platform-chev--up' : ''}`}
            aria-hidden
          />
        </button>
      </AppTooltip>

      {open && (
        <div className="lk-header__platform-dropdown lk-header__platform-dropdown--list" role="listbox">
          <p className="lk-header__platform-dropdown-label">Облачные платформы</p>
          <div className="lk-platform-list">{cloudPlatforms.map(renderListItem)}</div>
          <p className="lk-header__platform-dropdown-label lk-header__platform-dropdown-label--other">
            Другие продукты
          </p>
          <div className="lk-platform-list">{otherProducts.map(renderListItem)}</div>
        </div>
      )}
    </div>
  );
}
