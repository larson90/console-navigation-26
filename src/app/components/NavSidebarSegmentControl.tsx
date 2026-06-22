import React from 'react';
import { NavSidebarPanelMenu } from './NavSidebarPanelMenu';

export type NavSidebarPanelSegment = 'favorites' | 'recent';

const SEGMENTS: { id: NavSidebarPanelSegment; label: string }[] = [
  { id: 'favorites', label: 'Избранное' },
  { id: 'recent', label: 'Недавнее' },
];

export function NavSidebarSegmentControl({
  value,
  onChange,
  onSortFavorites,
  onClearFavorites,
  onClearRecent,
}: {
  value: NavSidebarPanelSegment;
  onChange: (value: NavSidebarPanelSegment) => void;
  onSortFavorites: () => void;
  onClearFavorites: () => void;
  onClearRecent: () => void;
}) {
  return (
    <div className="nav-sidebar-toolbar">
      <div className="nav-sidebar-segment" role="tablist" aria-label="Избранное и недавние сервисы">
        <div className="nav-sidebar-segment__track">
          {SEGMENTS.map((segment) => (
            <button
              key={segment.id}
              type="button"
              role="tab"
              aria-selected={value === segment.id}
              className={`nav-sidebar-segment__btn nav-tab-btn${value === segment.id ? ' nav-sidebar-segment__btn--active' : ''}`}
              onClick={() => onChange(segment.id)}
            >
              {segment.label}
            </button>
          ))}
        </div>
      </div>
      <NavSidebarPanelMenu
        onSortFavorites={onSortFavorites}
        onClearFavorites={onClearFavorites}
        onClearRecent={onClearRecent}
      />
    </div>
  );
}
