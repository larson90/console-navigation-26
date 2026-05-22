import React, { useEffect, useRef } from 'react';
import { PLATFORMS, type PlatformOption } from '../data/platformCatalog';
import { usePlatform } from '../context/PlatformContext';
import { PlatformGridTile, PlatformItemIcon } from './PlatformIcons';

interface HeaderPlatformSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HeaderPlatformSelector({ open, onOpenChange }: HeaderPlatformSelectorProps) {
  const { selectedId, selectedPlatform, selectPlatform } = usePlatform();
  const rootRef = useRef<HTMLDivElement>(null);

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

  const renderGridItem = (platform: PlatformOption) => {
    const isSelected = platform.id === selectedId;

    return (
      <button
        key={platform.id}
        type="button"
        role="option"
        aria-selected={isSelected}
        aria-label={platform.title}
        onClick={() => {
          selectPlatform(platform.id);
          onOpenChange(false);
        }}
        className={`lk-platform-grid__item${isSelected ? ' lk-platform-grid__item--selected' : ''}`}
      >
        <PlatformGridTile id={platform.id} />
        <span className="lk-platform-grid__label">{platform.title}</span>
      </button>
    );
  };

  return (
    <div className="lk-header__platform-wrap" ref={rootRef}>
      <button
        type="button"
        className={`lk-header__platform-btn lk-header__platform-btn--icon-only${open ? ' lk-header__platform-btn--open' : ''}`}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={selectedPlatform.title}
        title={selectedPlatform.title}
        onClick={() => onOpenChange(!open)}
      >
        <PlatformItemIcon id={selectedId} size="sm" />
      </button>

      {open && (
        <div className="lk-header__platform-dropdown lk-header__platform-dropdown--grid" role="listbox">
          <div className="lk-header__platform-cloud-panel">
            <p className="lk-header__platform-dropdown-label">Облачные платформы</p>
            <div className="lk-platform-grid lk-platform-grid--cloud">{cloudPlatforms.map(renderGridItem)}</div>
          </div>

          <p className="lk-header__platform-dropdown-label lk-header__platform-dropdown-label--other">
            Другие продукты
          </p>
          <div className="lk-platform-grid lk-platform-grid--other">{otherProducts.map(renderGridItem)}</div>
        </div>
      )}
    </div>
  );
}
