import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { usePlatform } from '../context/PlatformContext';
import { navigateToServiceTarget } from '../navigation/serviceNavigation';

const FIGMA = '/assets/lk-figma';

const PROJECT_QUICK_LINKS = [
  { label: 'Пользователи', serviceId: 'users-control' },
  { label: 'Квоты', serviceId: 'admin-quotas' },
  { label: 'Мониторинг', serviceId: 'monitoring' },
] as const;

export default function LkDashboard() {
  const navigate = useNavigate();
  const { pageTitle, selectedProjectName } = usePlatform();

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  const openQuickLink = (serviceId: string) => {
    navigateToServiceTarget(navigate, serviceId);
  };

  return (
    <div className="lk-page">
      <main className="lk-wrap">
        <h1 className="lk-h1">{pageTitle}</h1>

        <div className="lk-layout">
          <section className="lk-main">
            <div className="lk-card">
              <div className="proj-head">
                <div className="proj-head__icon">
                  <img src={`${FIGMA}/lk-folder.svg`} alt="" width={24} height={24} />
                </div>
                <div className="proj-head__title-block">
                  <h3 className="proj-head__title">{selectedProjectName}</h3>
                </div>
                <button type="button" className="proj-head__cta">
                  Создать ресурс +
                </button>
              </div>
              <div className="stat-row">
                {PROJECT_QUICK_LINKS.map((link) => (
                  <button
                    key={link.serviceId}
                    type="button"
                    className="stat-cell"
                    onClick={() => openQuickLink(link.serviceId)}
                  >
                    <span>{link.label}</span>
                    <span aria-hidden>›</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="lk-card">
              <div className="lk-card__head">
                <div className="lk-card__head-icon">
                  <img src={`${FIGMA}/lk-vm-icon.svg`} alt="" />
                </div>
                <h3 className="lk-card__title">Виртуальные машины</h3>
              </div>
              <p style={{ font: '400 14px/20px system-ui,sans-serif', color: '#6d707f', margin: 0 }}>
                Виртуальные машины от 0₽ в месяц под любую задачу — от тестирования простых приложений до
                высоконагруженной архитектуры.
              </p>
            </div>

            <div className="lk-card">
              <div className="lk-card__head">
                <div className="lk-card__head-icon">
                  <img src={`${FIGMA}/lk-svc-s3.svg`} alt="" />
                </div>
                <h3 className="lk-card__title">Object Storage</h3>
              </div>
              <p style={{ font: '400 14px/20px system-ui,sans-serif', color: '#8b8e9b', margin: 0 }}>
                Object Storage — масштабируемое хранилище данных любого типа и объема
              </p>
            </div>
          </section>

          <aside className="lk-rail">
            <div className="lk-card">
              <h4 className="rail-card__title">Быстрый старт</h4>
              <p className="rail-card__text">
                Откройте меню «9 точек» в шапке и выберите прототип навигации для UX-тестирования.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
