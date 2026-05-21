import React, { useEffect, useRef } from 'react';
import { PLATFORMS, type PlatformOption } from '../data/platformCatalog';
import { usePlatform } from '../context/PlatformContext';
import { PlatformItemIcon } from './PlatformIcons';

const ASSETS = '/assets/lk-header';

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

  const renderOption = (platform: PlatformOption) => {
    const isSelected = platform.id === selectedId;

    return (
      <button
        key={platform.id}
        type="button"
        role="option"
        aria-selected={isSelected}
        onClick={() => {
          selectPlatform(platform.id);
          onOpenChange(false);
        }}
        className={`lk-header__platform-option${isSelected ? ' lk-header__platform-option--selected' : ''}`}
      >
        {isSelected && <span className="lk-header__platform-option-marker" aria-hidden />}
        <PlatformItemIcon id={platform.id} size="sm" />
        <span className="lk-header__platform-option-title">{platform.title}</span>
      </button>
    );
  };

  return (
    <div className="lk-header__platform-wrap" ref={rootRef}>
      <button
        type="button"
        className={`lk-header__platform-btn${open ? ' lk-header__platform-btn--open' : ''}`}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={selectedPlatform.title}
        onClick={() => onOpenChange(!open)}
      >
        <PlatformItemIcon id={selectedId} size="sm" />
        <img
          src={`${ASSETS}/lk-header-chev-down.svg`}
          alt=""
          width={16}
          height={16}
          className={`lk-header__platform-chev${open ? ' lk-header__platform-chev--up' : ''}`}
        />
      </button>

      {open && (
        <div className="lk-header__platform-dropdown" role="listbox">
          <p className="lk-header__platform-dropdown-label">Облачные платформы</p>
          {cloudPlatforms.map(renderOption)}
          <p className="lk-header__platform-dropdown-label lk-header__platform-dropdown-label--other">
            Другие продукты
          </p>
          {otherProducts.map(renderOption)}
        </div>
      )}
    </div>
  );
}
