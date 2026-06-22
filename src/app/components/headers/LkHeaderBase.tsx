import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useMatch, useNavigate } from 'react-router';
import {
  NAVIGATION_PROTOTYPES,
  useNavigationPrototype,
} from '../../context/NavigationPrototypeContext';
import { usePlatform } from '../../context/PlatformContext';
import { lookupMegaservicePageContext, lookupServiceById } from '../../data/serviceCatalog';
import { imgIconColor13 as defaultServiceIcon } from '../../../imports/MainMenuDesktop/svg-3dkbq';
import { useServicePageBreadcrumb } from '../../context/ServicePageBreadcrumbContext';
import { buildMegaservicePageNavState, buildServicePath } from '../../navigation/serviceNavigation';
import type { ServiceNavState } from '../servicePage/types';
import { AppTooltip } from '../AppTooltip';
import { HeaderPlatformSelector } from '../HeaderPlatformSelector';
import { HeaderLogoMorph } from '../HeaderLogoMorph';
import { HeaderProjectSelector } from '../HeaderProjectSelector';
import { HeaderAppSwitcherIcon } from '../NavigationMenuSidebarHeader';
import type { LkHeaderConfig } from './lkHeaderConfig';

const ASSETS = '/assets/lk-header';

interface LkHeaderBaseProps {
  config: LkHeaderConfig;
}

export function LkHeaderBase({ config }: LkHeaderBaseProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const serviceMatch = useMatch('service/:serviceId');
  const { selectedPlatform } = usePlatform();
  const {
    selectedPrototypeId,
    setSelectedPrototypeId,
    launchSelectedPrototype,
    isMenuOpen,
    closeMenu,
  } = useNavigationPrototype();
  const [profileOpen, setProfileOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const profileWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!profileOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (profileOpen && profileWrapRef.current && !profileWrapRef.current.contains(target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [profileOpen]);

  const selectPrototype = (id: typeof selectedPrototypeId) => {
    setSelectedPrototypeId(id);
    setProfileOpen(false);
  };

  const { subpageTitle: localSubpageTitle, goToOverview } = useServicePageBreadcrumb();
  const serviceNavState = location.state as ServiceNavState | null;
  const serviceId = serviceMatch?.params.serviceId ?? '';
  const catalogService = useMemo(
    () => (serviceId ? lookupServiceById(serviceId, defaultServiceIcon) : null),
    [serviceId],
  );
  const megaserviceContext = useMemo(
    () => (serviceId ? (serviceNavState?.megaservice ?? lookupMegaservicePageContext(serviceId)) : null),
    [serviceId, serviceNavState?.megaservice],
  );
  const activeSubpageFromUrl = useMemo(() => {
    if (!megaserviceContext || serviceId === megaserviceContext.id) {
      return null;
    }
    return megaserviceContext.subpages.find((item) => item.id === serviceId) ?? null;
  }, [megaserviceContext, serviceId]);
  const serviceBreadcrumbTitle =
    megaserviceContext?.title ?? serviceNavState?.title ?? catalogService?.title ?? serviceId;
  const breadcrumbSubpageTitle = activeSubpageFromUrl?.title ?? localSubpageTitle;

  const openServiceOverview = () => {
    if (megaserviceContext) {
      navigate(buildServicePath(megaserviceContext.id), {
        state: buildMegaservicePageNavState(megaserviceContext),
      });
      return;
    }
    goToOverview();
  };

  return (
    <header
      className={`lk-header${isMenuOpen ? ' lk-header--menu-open' : ''}`}
      data-prototype={config.prototypeId}
    >
      <AppTooltip label="На главную">
        <a
          href="/"
          className="lk-header__logo lk-header__logo--leading"
          aria-label="На главную"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
        >
          <HeaderLogoMorph />
        </a>
      </AppTooltip>

      {config.showPlatformSelector && (
        <HeaderPlatformSelector
          open={platformOpen}
          onOpenChange={(open) => {
            setPlatformOpen(open);
            if (open) {
              setProjectOpen(false);
              setProfileOpen(false);
            }
          }}
        />
      )}

      <AppTooltip label={isMenuOpen ? 'Закрыть меню' : 'Сервисы'}>
        <button
          type="button"
          className="lk-header__appswitcher"
          aria-label={isMenuOpen ? 'Закрыть меню' : `Сервисы — прототип ${config.prototypeId}`}
          onClick={() => {
            setProfileOpen(false);
            setProjectOpen(false);
            setPlatformOpen(false);
            if (isMenuOpen) {
              closeMenu();
              return;
            }
            launchSelectedPrototype();
          }}
        >
          <HeaderAppSwitcherIcon menuOpen={isMenuOpen} />
        </button>
      </AppTooltip>

      <HeaderProjectSelector
        variant="header"
        open={projectOpen}
        onOpenChange={(open) => {
          setProjectOpen(open);
          if (open) {
            setPlatformOpen(false);
            setProfileOpen(false);
          }
        }}
      />

      {serviceMatch && (
        <nav className="lk-header__breadcrumb" aria-label="Хлебные крошки">
          <button type="button" className="lk-header__breadcrumb-link" onClick={() => navigate('/')}>
            {selectedPlatform.title}
          </button>
          <span className="lk-header__breadcrumb-sep" aria-hidden>
            &gt;
          </span>
          {breadcrumbSubpageTitle ? (
            <>
              <button type="button" className="lk-header__breadcrumb-link" onClick={openServiceOverview}>
                {serviceBreadcrumbTitle}
              </button>
              <span className="lk-header__breadcrumb-sep" aria-hidden>
                &gt;
              </span>
              <span className="lk-header__breadcrumb-current">{breadcrumbSubpageTitle}</span>
            </>
          ) : (
            <span className="lk-header__breadcrumb-current">{serviceBreadcrumbTitle}</span>
          )}
        </nav>
      )}

      <div className="lk-header__spacer" />

      <button type="button" className="lk-header__balance" id="lk-balance">
        <span className="lk-header__balance-val">170,02 ₽</span>
        <img
          src={`${ASSETS}/lk-header-balance-wallet.svg`}
          alt=""
          width={20}
          height={20}
          className="lk-header__balance-icon"
        />
      </button>

      <AppTooltip label="Календарь">
        <button type="button" className="lk-header__icon-btn" aria-label="Календарь">
          <img src={`${ASSETS}/lk-header-calendar.svg`} alt="" width={20} height={20} />
        </button>
      </AppTooltip>

      <AppTooltip label="Помощь">
        <button type="button" className="lk-header__icon-btn" aria-label="Помощь">
          <img src={`${ASSETS}/lk-header-help.svg`} alt="" width={20} height={20} />
        </button>
      </AppTooltip>

      <AppTooltip label="Уведомления">
        <button type="button" className="lk-header__icon-btn" aria-label="Уведомления">
          <img src={`${ASSETS}/lk-header-bell.svg`} alt="" width={20} height={20} />
          <span className="lk-header__badge">2</span>
        </button>
      </AppTooltip>

      <div className="lk-header__avatar-wrap" ref={profileWrapRef}>
        <AppTooltip label="Владимир Чумаков — выбор прототипа">
          <button
            type="button"
            className={`lk-header__avatar${profileOpen ? ' lk-header__avatar--open' : ''}`}
            aria-label="Профиль — выбор прототипа навигации"
          aria-expanded={profileOpen}
          aria-haspopup="menu"
          onClick={() => {
            setProfileOpen((o) => !o);
            setProjectOpen(false);
            setPlatformOpen(false);
          }}
        >
          ВЧ
        </button>
        </AppTooltip>

        {profileOpen && (
          <div className="lk-header__proto-dropdown lk-header__proto-dropdown--profile" role="menu">
            <div className="lk-header__proto-dropdown-title">UX-тестирование навигации</div>
            {NAVIGATION_PROTOTYPES.map((p) => (
              <button
                key={p.id}
                type="button"
                role="menuitem"
                className="lk-header__proto-item"
                aria-current={selectedPrototypeId === p.id ? 'true' : undefined}
                onClick={() => selectPrototype(p.id)}
              >
                <span className="lk-header__proto-item-name">{p.title}</span>
                <span className="lk-header__proto-item-desc">{p.description}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
