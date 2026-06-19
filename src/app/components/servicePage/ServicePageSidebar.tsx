import React, { useState } from 'react';
import { COMPACT_SERVICE_ICON_SIZE, ServiceIcon } from '../navigationServiceUi';
import { AppTooltip } from '../AppTooltip';
import {
  RELATED_SERVICES,
  SERVICE_SUBPAGES_MANY,
  SERVICE_SUBPAGES_SINGLE,
  type ServicePageDisplaySettings,
  type ServicePageView,
  type ServiceSubpageNavItem,
} from './types';

function SidebarFallbackIcon({ active }: { active?: boolean }) {
  return (
    <span
      className={`svc-sidebar__icon svc-sidebar__icon--fallback${active ? ' svc-sidebar__icon--active' : ''}`}
      aria-hidden
    >
      <svg viewBox="0 0 16 16" fill="none" width={COMPACT_SERVICE_ICON_SIZE} height={COMPACT_SERVICE_ICON_SIZE}>
        <path
          d="M8 2.5L13.5 8L8 13.5L2.5 8L8 2.5Z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function SidebarMenuIcon({
  icon,
  active,
}: {
  icon?: string;
  active?: boolean;
}) {
  if (!icon) {
    return <SidebarFallbackIcon active={active} />;
  }

  return (
    <span className={`svc-sidebar__icon${active ? ' svc-sidebar__icon--active' : ''}`} aria-hidden>
      <ServiceIcon icon={icon} size={COMPACT_SERVICE_ICON_SIZE} active={active} />
    </span>
  );
}

function CollapseSidebarIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" width={16} height={16} aria-hidden>
      {collapsed ? (
        <>
          <path
            d="M6 4.5L9.5 8L6 11.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M3.5 3.5V12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path
            d="M10 4.5L6.5 8L10 11.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M12.5 3.5V12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

export interface ServicePageSidebarProps {
  serviceTitle: string;
  serviceIcon?: string;
  settings: ServicePageDisplaySettings;
  view: ServicePageView;
  activeSubpage: ServiceSubpageNavItem | null;
  subpages?: ServiceSubpageNavItem[];
  onOpenOverview: () => void;
  onOpenSubpage: (subpage: ServiceSubpageNavItem) => void;
}

export function ServicePageSidebar({
  serviceTitle,
  serviceIcon,
  settings,
  view,
  activeSubpage,
  subpages,
  onOpenOverview,
  onOpenSubpage,
}: ServicePageSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const navItems =
    settings.resourceLayout === 'many'
      ? (subpages ?? SERVICE_SUBPAGES_MANY)
      : subpages?.length
        ? [subpages[0]]
        : SERVICE_SUBPAGES_SINGLE;
  const isOverviewActive = view === 'overview';

  return (
    <aside className={`svc-sidebar${collapsed ? ' svc-sidebar--collapsed' : ''}`}>
      <div className="svc-sidebar__inner">
        <div className="svc-sidebar__top">
          <AppTooltip label={collapsed ? serviceTitle : ''} side="right">
            <button
              type="button"
              className={`svc-sidebar__link svc-sidebar__link--service${isOverviewActive ? ' svc-sidebar__link--active' : ''}`}
              onClick={onOpenOverview}
            >
              <SidebarMenuIcon icon={serviceIcon} active={isOverviewActive} />
              <span className="svc-sidebar__label svc-sidebar__label--service">{serviceTitle}</span>
            </button>
          </AppTooltip>

          <nav className="svc-sidebar__nav" aria-label="Навигация сервиса">
            {navItems.map((item) => {
              const isActive = view === 'subpage' && activeSubpage?.id === item.id;

              return (
                <AppTooltip key={item.id} label={collapsed ? item.title : ''} side="right">
                  <button
                    type="button"
                    className={`svc-sidebar__link${isActive ? ' svc-sidebar__link--active' : ''}`}
                    onClick={() => onOpenSubpage(item)}
                  >
                    <SidebarMenuIcon icon={item.icon} active={isActive} />
                    <span className="svc-sidebar__label">{item.title}</span>
                  </button>
                </AppTooltip>
              );
            })}
          </nav>
        </div>

        {settings.resourceLayout === 'many' && !collapsed && (
          <div className="svc-sidebar__related-block">
            <div className="svc-sidebar__related">
              <p className="svc-sidebar__related-title">Связанные сервисы</p>
              {RELATED_SERVICES.map((name) => (
                <button key={name} type="button" className="svc-sidebar__link svc-sidebar__link--related">
                  <SidebarMenuIcon />
                  <span className="svc-sidebar__label">{name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="svc-sidebar__footer">
          <button
            type="button"
            className="svc-sidebar__collapse"
            aria-label={collapsed ? 'Развернуть боковую панель' : 'Свернуть боковую панель'}
            aria-expanded={!collapsed}
            onClick={() => setCollapsed((value) => !value)}
          >
            <CollapseSidebarIcon collapsed={collapsed} />
          </button>
        </div>
      </div>
    </aside>
  );
}
