import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { HeaderPlatformSelector } from './HeaderPlatformSelector';

export type NavigationPrototypeId = '1' | '2' | '3';

const PROTOTYPES: { id: NavigationPrototypeId; path: string; title: string; description: string }[] = [
  { id: '1', path: '/prototype-1', title: 'Прототип 1', description: 'Без переключения платформы' },
  { id: '2', path: '/prototype-2', title: 'Прототип 2', description: 'Стандартная навигация' },
  { id: '3', path: '/prototype-3', title: 'Прототип 3', description: 'Сервисы, Центр управления, Решения' },
];

const ASSETS = '/assets/lk-header';

interface ProjectItem {
  id: string;
  name: string;
}

interface ProjectCatalog {
  id: string;
  title: string;
  projects: ProjectItem[];
}

const ORGANIZATION_NAME = 'Мое облако';

const PROJECT_CATALOGS: ProjectCatalog[] = [
  {
    id: 'catalog-1',
    title: 'Каталог 1',
    projects: [
      { id: 'p1', name: 'Чат-бот' },
      { id: 'p2', name: 'Проект 2' },
    ],
  },
  {
    id: 'catalog-2',
    title: 'Каталог 2',
    projects: [
      { id: 'p3', name: 'Проект 1' },
      { id: 'p4', name: 'Проект 2' },
    ],
  },
  {
    id: 'catalog-3',
    title: 'Каталог 3',
    projects: [
      { id: 'p5', name: 'Проект 1' },
      { id: 'p6', name: 'Проект 2' },
    ],
  },
];

const DEFAULT_PROJECT_ID = 'p1';
const DEFAULT_PROJECT = { label: 'Проект' };

interface LkHeaderProps {
  activePrototype?: NavigationPrototypeId | null;
}

export function LkHeader({ activePrototype }: LkHeaderProps) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [projectSearch, setProjectSearch] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState(DEFAULT_PROJECT_ID);
  const wrapRef = useRef<HTMLDivElement>(null);
  const projectWrapRef = useRef<HTMLDivElement>(null);

  const selectedProject =
    PROJECT_CATALOGS.flatMap((c) => c.projects).find((p) => p.id === selectedProjectId) ??
    { id: DEFAULT_PROJECT_ID, name: 'Чат-бот' };

  const filteredCatalogs = PROJECT_CATALOGS.map((catalog) => ({
    ...catalog,
    projects: catalog.projects.filter((p) =>
      p.name.toLowerCase().includes(projectSearch.trim().toLowerCase()),
    ),
  })).filter((catalog) => catalog.projects.length > 0);

  useEffect(() => {
    if (!menuOpen && !projectOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (menuOpen && wrapRef.current && !wrapRef.current.contains(target)) {
        setMenuOpen(false);
      }
      if (projectOpen && projectWrapRef.current && !projectWrapRef.current.contains(target)) {
        setProjectOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [menuOpen, projectOpen]);

  const openPrototype = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="lk-header">
      <div className="lk-header__appswitcher-wrap" ref={wrapRef}>
        <button
          type="button"
          className="lk-header__appswitcher"
          title="Сервисы"
          aria-label="Сервисы"
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <img src={`${ASSETS}/lk-header-appswitcher.svg`} alt="" width={24} height={24} />
        </button>

        {menuOpen && (
          <div className="lk-header__proto-dropdown" role="menu">
            <div className="lk-header__proto-dropdown-title">UX-тестирование навигации</div>
            {PROTOTYPES.map((p) => (
              <button
                key={p.id}
                type="button"
                role="menuitem"
                className="lk-header__proto-item"
                aria-current={activePrototype === p.id ? 'true' : undefined}
                onClick={() => openPrototype(p.path)}
              >
                <span className="lk-header__proto-item-name">{p.title}</span>
                <span className="lk-header__proto-item-desc">{p.description}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <a href="/" className="lk-header__logo" aria-label="Cloud.ru" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
        <img src={`${ASSETS}/lk-header-logo-c.svg`} alt="cloud.ru" width={20} height={20} />
      </a>

      <HeaderPlatformSelector
        open={platformOpen}
        onOpenChange={(open) => {
          setPlatformOpen(open);
          if (open) {
            setProjectOpen(false);
            setMenuOpen(false);
          }
        }}
      />

      <div className="lk-header__project-wrap" ref={projectWrapRef}>
        <button
          type="button"
          className={`lk-header__project${projectOpen ? ' lk-header__project--open' : ''}`}
          aria-expanded={projectOpen}
          aria-haspopup="listbox"
          onClick={() => {
            setProjectOpen((o) => !o);
            setPlatformOpen(false);
            setMenuOpen(false);
          }}
        >
          <span className="lk-header__project-text">
            <span className="lk-header__project-name">{selectedProject.name}</span>
            <span className="lk-header__project-sub">{DEFAULT_PROJECT.label}</span>
          </span>
          <img
            src={`${ASSETS}/lk-header-chev-down.svg`}
            alt=""
            width={16}
            height={16}
            className={`lk-header__project-chev${projectOpen ? ' lk-header__project-chev--up' : ''}`}
          />
        </button>

        {projectOpen && (
          <div className="lk-header__project-dropdown" role="listbox">
            <div className="lk-header__project-dropdown-body">
              <div className="lk-header__project-search">
                <span className="lk-header__project-search-icon" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                      stroke="#8B8E9B"
                      strokeWidth="2"
                    />
                    <path d="M21 21L16.65 16.65" stroke="#8B8E9B" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  placeholder="Поиск по проектам"
                  className="lk-header__project-search-input"
                />
                <button type="button" className="lk-header__project-sort" aria-label="Сортировка">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6V2M4 2L2 4M4 2L6 4" stroke="#8B8E9B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 10V14M12 14L10 12M12 14L14 12" stroke="#8B8E9B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              <div className="lk-header__project-org">
                <span className="lk-header__project-org-icon" aria-hidden>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 21H21M5 21V7L12 3L19 7V21M9 21V12H15V21"
                      stroke="#6D707F"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="lk-header__project-org-text">{ORGANIZATION_NAME}</span>
              </div>

              <div className="lk-header__project-divider" />

              <div className="lk-header__project-list">
                {filteredCatalogs.map((catalog) => (
                  <div key={catalog.id} className="lk-header__project-group">
                    <p className="lk-header__project-group-title">{catalog.title}</p>
                    {catalog.projects.map((project) => (
                      <div key={project.id} className="lk-header__project-row-wrap">
                        <button
                          type="button"
                          role="option"
                          aria-selected={selectedProjectId === project.id}
                          className={`lk-header__project-row${selectedProjectId === project.id ? ' lk-header__project-row--selected' : ''}`}
                          onClick={() => {
                            setSelectedProjectId(project.id);
                            setProjectOpen(false);
                            setProjectSearch('');
                          }}
                        >
                          {selectedProjectId === project.id && (
                            <span className="lk-header__project-row-marker" aria-hidden />
                          )}
                          <span className="lk-header__project-row-icon">ПР</span>
                          <span className="lk-header__project-row-name">{project.name}</span>
                        </button>
                        <button
                          type="button"
                          className="lk-header__project-row-menu"
                          aria-label={`Действия: ${project.name}`}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="3" r="1.25" fill="#8B8E9B" />
                            <circle cx="8" cy="8" r="1.25" fill="#8B8E9B" />
                            <circle cx="8" cy="13" r="1.25" fill="#8B8E9B" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="lk-header__project-divider" />

              <button type="button" className="lk-header__project-add">
                <span className="lk-header__project-add-icon" aria-hidden>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3V13M3 8H13" stroke="#6D707F" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                Добавить проект
              </button>
            </div>
          </div>
        )}
      </div>

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

      <button type="button" className="lk-header__icon-btn" title="Календарь" aria-label="Календарь">
        <img src={`${ASSETS}/lk-header-calendar.svg`} alt="" width={20} height={20} />
      </button>

      <button type="button" className="lk-header__icon-btn" title="Помощь" aria-label="Помощь">
        <img src={`${ASSETS}/lk-header-help.svg`} alt="" width={20} height={20} />
      </button>

      <button type="button" className="lk-header__icon-btn" title="Уведомления" aria-label="Уведомления">
        <img src={`${ASSETS}/lk-header-bell.svg`} alt="" width={20} height={20} />
        <span className="lk-header__badge">2</span>
      </button>

      <button type="button" className="lk-header__icon-btn lk-header__giga" title="Гига-помощник" aria-label="Гига-помощник">
        <img src={`${ASSETS}/lk-giga-fab.svg`} alt="" width={28} height={28} />
      </button>

      <span className="lk-header__avatar" title="Владимир Чумаков">
        ВЧ
      </span>
    </header>
  );
}

export function getPrototypeIdFromPath(pathname: string): NavigationPrototypeId | null {
  const m = pathname.match(/^\/prototype-([123])$/);
  return m ? (m[1] as NavigationPrototypeId) : null;
}
