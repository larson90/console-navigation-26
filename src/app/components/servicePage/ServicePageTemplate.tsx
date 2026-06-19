import React, { useCallback, useEffect, useState } from 'react';
import { ServicePageSettingsPanel } from './ServicePageSettingsPanel';
import { ServicePageSidebar } from './ServicePageSidebar';
import { useServicePageBreadcrumb } from '../../context/ServicePageBreadcrumbContext';
import type {
  MegaservicePageContext,
  ServicePageDisplaySettings,
  ServicePageView,
  ServiceSubpageNavItem,
} from './types';

function NavDiamondIcon({ active }: { active?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="svc-nav-icon" aria-hidden>
      <path
        d="M8 2L14 8L8 14L2 8L8 2Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill={active ? 'currentColor' : 'none'}
        fillOpacity={active ? 0.15 : 0}
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="svc-chevron" aria-hidden>
      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" width={16} height={16} aria-hidden>
      <path d="M8 3.5V12.5M3.5 8H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="svc-section-icon" aria-hidden>
      <path d="M4 2H10L13 5V14H4V2Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10 2V5H13" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="svc-btn__icon" aria-hidden>
      <path
        d="M8 13.5C8 13.5 4 11 4 7.5C4 5.5 5.5 3.5 8 2.5C10.5 3.5 12 5.5 12 7.5C12 11 8 13.5 8 13.5Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="7.5" r="1.5" fill="currentColor" />
      <path d="M6 11.5L5 14M10 11.5L11 14" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

function BannerPattern() {
  return (
    <svg className="svc-banner__pattern" viewBox="0 0 420 104" preserveAspectRatio="xMaxYMid slice" aria-hidden>
      <defs>
        <pattern id="svc-arrows" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M8 24H32M32 24L24 16M32 24L24 32" stroke="#fdfdfd" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
          <path d="M28 8H40M40 8L36 4M40 8L36 12" stroke="#fdfdfd" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="420" height="104" fill="url(#svc-arrows)" />
    </svg>
  );
}

function EmptyStateIllustration() {
  return (
    <div className="svc-empty-illustration" aria-hidden>
      <svg viewBox="0 0 180 120" fill="none" className="svc-empty-illustration__svg">
        <path d="M30 88L55 68L80 78L105 58L130 72L150 62" stroke="#c4c7d4" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M55 68L68 55L92 62L105 58" stroke="#c4c7d4" strokeWidth="1" strokeLinecap="round" strokeDasharray="3 3" />
        <path d="M62 78L75 65L99 72" stroke="#dde0ea" strokeWidth="1" strokeLinecap="round" />
        <rect x="48" y="72" width="52" height="28" rx="2" stroke="#aaaebd" strokeWidth="1.2" />
        <path d="M48 80H100" stroke="#aaaebd" strokeWidth="1" />
        <path d="M60 72V68L68 60H84L92 68V72" stroke="#aaaebd" strokeWidth="1.2" strokeLinejoin="round" />
        <rect x="56" y="84" width="12" height="8" rx="1" fill="#eeeff3" stroke="#dde0ea" strokeWidth="0.8" />
        <rect x="72" y="84" width="12" height="8" rx="1" fill="#eeeff3" stroke="#dde0ea" strokeWidth="0.8" />
        <circle cx="132" cy="42" r="14" stroke="#389f74" strokeWidth="1.5" />
        <path d="M132 35V49M125 42H139" stroke="#389f74" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function SectionHead({
  title,
  icon,
  action,
  onTitleClick,
}: {
  title: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  onTitleClick?: () => void;
}) {
  return (
    <div className="svc-section__head">
      <button type="button" className="svc-section__title-btn" onClick={onTitleClick}>
        {icon ?? <NavDiamondIcon />}
        <span>{title}</span>
        <ChevronRightIcon />
      </button>
      {action && <div className="svc-section__head-actions">{action}</div>}
    </div>
  );
}

function CreateItemAction({ onClick }: { onClick?: () => void }) {
  return (
    <button type="button" className="svc-section__action-btn" onClick={onClick}>
      Создать &lt;item&gt; +
    </button>
  );
}

function AddIconAction({ onClick }: { onClick?: () => void }) {
  return (
    <button type="button" className="svc-section__icon-btn" aria-label="Добавить" onClick={onClick}>
      <PlusIcon />
    </button>
  );
}

function ItemCard({
  name,
  used,
  total,
  unlimited,
}: {
  name: string;
  used: string;
  total: string;
  unlimited?: boolean;
}) {
  const percent = unlimited ? 0 : 50;

  return (
    <div className="svc-item-card">
      <p className="svc-item-card__name">{name}</p>
      <div className="svc-item-card__volume">
        <p className="svc-item-card__label">Объем</p>
        <p className="svc-item-card__value">
          {used} / {unlimited ? 'Не ограничено' : total}
        </p>
      </div>
      {!unlimited && (
        <div className="svc-item-card__footer">
          <div className="svc-item-card__progress-row">
            <div className="svc-item-card__progress" aria-hidden>
              <div className="svc-item-card__progress-fill" style={{ width: `${percent}%` }} />
            </div>
            <p className="svc-item-card__percent">{percent}%</p>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCell({ count }: { count: string }) {
  return (
    <p className="svc-stat-cell">
      {count} <span>&lt;items&gt;</span>
    </p>
  );
}

function StatGrid({ counts }: { counts: string[] }) {
  return (
    <div className="svc-stat-grid">
      {counts.map((count, index) => (
        <StatCell key={`${count}-${index}`} count={count} />
      ))}
    </div>
  );
}

function OverviewContent({
  serviceTitle,
  description,
  settings,
  subpages,
  onOpenSubpage,
}: {
  serviceTitle: string;
  description: string;
  settings: ServicePageDisplaySettings;
  subpages?: ServiceSubpageNavItem[];
  onOpenSubpage: (subpage: ServiceSubpageNavItem) => void;
}) {
  const isMany = settings.resourceLayout === 'many';
  const subpage1 = subpages?.[0] ?? { id: 'subpage-1', title: 'Subpage 1' };
  const subpage2 = subpages?.[1] ?? { id: 'subpage-2', title: 'Subpage 2' };
  const subpage3 = subpages?.[2] ?? { id: 'subpage-3', title: 'Subpage 3' };
  const openSubpage1 = () => onOpenSubpage(subpage1);

  return (
    <div className="svc-overview">
      <div className="svc-banner">
        <BannerPattern />
        <div className="svc-banner__text">
          <h1 className="svc-banner__title">{serviceTitle}</h1>
          <p className="svc-banner__desc">{description}</p>
        </div>
      </div>

      <section className="svc-section svc-section--main">
        <SectionHead
          title={subpage1.title}
          action={settings.hasData ? <CreateItemAction onClick={openSubpage1} /> : undefined}
          onTitleClick={openSubpage1}
        />
        {settings.hasData ? (
          <div className="svc-items-grid">
            <ItemCard name="Item_1" used="125 ТБ" total="250 ТБ" />
            <ItemCard name="Item_2" used="125 ТБ" total="250 ТБ" />
            <ItemCard name="Item_3" used="125 ТБ" total="250 ТБ" unlimited />
            <ItemCard name="Item_4" used="125 ТБ" total="250 ТБ" />
          </div>
        ) : (
          <div className="svc-empty-card">
            <div className="svc-empty-card__body">
              <p className="svc-empty-card__text">Создайте свой первый Item, чтобы начать работу</p>
              <div className="svc-empty-card__actions">
                <button type="button" className="svc-btn svc-btn--primary">
                  Создать &lt;item&gt; +
                </button>
                {!isMany && (
                  <button type="button" className="svc-btn svc-btn--secondary">
                    <RocketIcon />
                    Быстрый старт
                  </button>
                )}
              </div>
            </div>
            <EmptyStateIllustration />
          </div>
        )}
      </section>

      {isMany && (
        <div className="svc-section-row">
          <section className="svc-section">
            <SectionHead
              title={subpage2.title}
              action={<AddIconAction onClick={() => onOpenSubpage(subpage2)} />}
              onTitleClick={() => onOpenSubpage(subpage2)}
            />
            <StatGrid counts={settings.hasData ? ['0'] : ['0', '0']} />
          </section>
          <section className="svc-section">
            <SectionHead
              title={subpage3.title}
              action={<AddIconAction onClick={() => onOpenSubpage(subpage3)} />}
              onTitleClick={() => onOpenSubpage(subpage3)}
            />
            <StatGrid counts={settings.hasData ? ['20', '100'] : ['0', '0']} />
          </section>
        </div>
      )}

      <section className="svc-section">
        <SectionHead title="Документация" icon={<DocIcon />} />
        <div className="svc-docs-grid">
          {Array.from({ length: 8 }, (_, i) => (
            <button key={i} type="button" className="svc-doc-link">
              Document
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function SubpageContent({ subpageTitle }: { subpageTitle: string }) {
  return (
    <div className="svc-subpage">
      <div className="svc-subpage__head">
        <h1 className="svc-subpage__title">{subpageTitle}</h1>
        <button type="button" className="svc-btn svc-btn--primary">
          Создать +
        </button>
      </div>
      <div className="svc-subpage__canvas" />
    </div>
  );
}

export interface ServicePageTemplateProps {
  serviceTitle: string;
  serviceIcon: string;
  description: string;
  megaserviceContext?: MegaservicePageContext;
  megaserviceView?: ServicePageView;
  megaserviceActiveSubpage?: ServiceSubpageNavItem | null;
  onMegaserviceOpenOverview?: () => void;
  onMegaserviceOpenSubpage?: (subpage: ServiceSubpageNavItem) => void;
}

export function ServicePageTemplate({
  serviceTitle,
  serviceIcon: _serviceIcon,
  description,
  megaserviceContext,
  megaserviceView,
  megaserviceActiveSubpage,
  onMegaserviceOpenOverview,
  onMegaserviceOpenSubpage,
}: ServicePageTemplateProps) {
  const isMegaserviceRoute = Boolean(megaserviceContext && onMegaserviceOpenOverview && onMegaserviceOpenSubpage);
  const { setSubpageTitle, registerOverviewHandler } = useServicePageBreadcrumb();

  const [settings, setSettings] = useState<ServicePageDisplaySettings>({
    resourceLayout: megaserviceContext ? 'many' : 'single',
    hasData: false,
  });
  const [localView, setLocalView] = useState<ServicePageView>('overview');
  const [localActiveSubpage, setLocalActiveSubpage] = useState<ServiceSubpageNavItem | null>(null);

  const view = isMegaserviceRoute ? megaserviceView! : localView;
  const activeSubpage = isMegaserviceRoute ? (megaserviceActiveSubpage ?? null) : localActiveSubpage;

  const subpages = megaserviceContext?.subpages;
  const firstSubpageId = subpages?.[0]?.id ?? 'subpage-1';

  const openSubpage = (subpage: ServiceSubpageNavItem) => {
    if (isMegaserviceRoute) {
      onMegaserviceOpenSubpage!(subpage);
      return;
    }
    setLocalActiveSubpage(subpage);
    setLocalView('subpage');
  };

  const openOverview = useCallback(() => {
    if (isMegaserviceRoute) {
      onMegaserviceOpenOverview!();
      return;
    }
    setLocalView('overview');
    setLocalActiveSubpage(null);
  }, [isMegaserviceRoute, onMegaserviceOpenOverview]);

  useEffect(() => {
    if (isMegaserviceRoute) {
      setSubpageTitle(null);
      registerOverviewHandler(null);
      return () => {
        setSubpageTitle(null);
        registerOverviewHandler(null);
      };
    }

    setSubpageTitle(view === 'subpage' ? activeSubpage?.title ?? null : null);
    registerOverviewHandler(() => {
      setLocalView('overview');
      setLocalActiveSubpage(null);
    });

    return () => {
      setSubpageTitle(null);
      registerOverviewHandler(null);
    };
  }, [isMegaserviceRoute, view, activeSubpage, setSubpageTitle, registerOverviewHandler]);

  const handleSettingsChange = (patch: Partial<ServicePageDisplaySettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      if (patch.resourceLayout === 'single' && view === 'subpage' && activeSubpage?.id !== firstSubpageId) {
        if (isMegaserviceRoute) {
          onMegaserviceOpenOverview!();
        } else {
          setLocalView('overview');
          setLocalActiveSubpage(null);
        }
      }
      return next;
    });
  };

  return (
    <div className="svc-page">
      <ServicePageSidebar
        serviceTitle={serviceTitle}
        serviceIcon={_serviceIcon}
        settings={settings}
        view={view}
        activeSubpage={activeSubpage}
        subpages={subpages}
        onOpenOverview={openOverview}
        onOpenSubpage={openSubpage}
      />

      <main className="svc-main">
        {view === 'overview' ? (
          <OverviewContent
            serviceTitle={serviceTitle}
            description={description}
            settings={settings}
            subpages={subpages}
            onOpenSubpage={openSubpage}
          />
        ) : (
          <SubpageContent subpageTitle={activeSubpage?.title ?? subpages?.[0]?.title ?? 'Subpage 1'} />
        )}
      </main>

      <ServicePageSettingsPanel settings={settings} onChange={handleSettingsChange} />
    </div>
  );
}
