import React from 'react';
import { useNavigationOverlayClose } from '../context/NavigationOverlayContext';

function CloseMenuArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" width={16} height={16} aria-hidden>
      <path
        d="M10 4.5L6.5 8L10 11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Временно скрыта — используется шапка сайдбара с крестиком. */
export const NAV_MENU_CLOSE_BUTTON_ENABLED = false;

export function NavigationMenuCloseButton() {
  const closeMenu = useNavigationOverlayClose();

  if (!NAV_MENU_CLOSE_BUTTON_ENABLED || !closeMenu) return null;

  return (
    <button type="button" className="nav-menu-close-btn" onClick={closeMenu}>
      <CloseMenuArrowIcon />
      <span>Закрыть меню</span>
    </button>
  );
}
