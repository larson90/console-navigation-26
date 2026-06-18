import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  NAVIGATION_PROTOTYPES,
  useNavigationPrototype,
} from '../../context/NavigationPrototypeContext';
import { usePlatform } from '../../context/PlatformContext';
import { Chips } from '../ui/chips';
import { HeaderPlatformSelector } from '../HeaderPlatformSelector';
import { HeaderLogoMorph } from '../HeaderLogoMorph';
import type { LkHeaderConfig } from './lkHeaderConfig';

const ASSETS = '/assets/lk-header';

interface ProjectItem {
  id: string;
  name: string;
}

interface ProjectOrganization {
  id: string;
  name: string;
  projects: ProjectItem[];
}

const PROJECT_ORGANIZATIONS: ProjectOrganization[] = [
  {
    id: 'org-1',
    name: 'ООО Рога и копыта',
    projects: [
      { id: 'p1', name: 'K8s прод-кластер' },
      { id: 'p2', name: 'Terraform IaC' },
      { id: 'p3', name: 'GitLab Runners' },
    ],
  },
  {
    id: 'org-2',
    name: 'Cloud SRE Team',
    projects: [
      { id: 'p4', name: 'Observability Stack' },
      { id: 'p5', name: 'Loki Logs' },
      { id: 'p6', name: 'On-call Bot' },
    ],
  },
  {
    id: 'org-3',
    name: 'Data Platform Ops',
    projects: [
      { id: 'p7', name: 'ArgoCD Deploy' },
      { id: 'p8', name: 'Backup and DR' },
      { id: 'p9', name: 'Bastion Access' },
    ],
  },
];

const ALL_ORGANIZATIONS_ID = 'all';

const DEFAULT_PROJECT_ID = 'p1';
const DEFAULT_PROJECT = { label: 'Проект' };
const DEFAULT_ORGANIZATION_ID = PROJECT_ORGANIZATIONS[0]?.id ?? '';

interface LkHeaderBaseProps {
  config: LkHeaderConfig;
}

export function LkHeaderBase({ config }: LkHeaderBaseProps) {
  const navigate = useNavigate();
  const { setSelectedProjectName } = usePlatform();
  const { selectedPrototypeId, setSelectedPrototypeId, launchSelectedPrototype } =
    useNavigationPrototype();
  const [profileOpen, setProfileOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [organizationFilterOpen, setOrganizationFilterOpen] = useState(false);
  const [projectSearch, setProjectSearch] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState(DEFAULT_PROJECT_ID);
  const [selectedOrganizationId, setSelectedOrganizationId] = useState(DEFAULT_ORGANIZATION_ID);
  const profileWrapRef = useRef<HTMLDivElement>(null);
  const projectWrapRef = useRef<HTMLDivElement>(null);

  const selectedProject =
    PROJECT_ORGANIZATIONS.flatMap((org) => org.projects).find((p) => p.id === selectedProjectId) ??
    { id: DEFAULT_PROJECT_ID, name: 'Чат-бот' };

  const isAllOrganizationsSelected = selectedOrganizationId === ALL_ORGANIZATIONS_ID;

  const selectedOrganization = PROJECT_ORGANIZATIONS.find(
    (organization) => organization.id === selectedOrganizationId,
  );

  const organizationFilterLabel = isAllOrganizationsSelected
    ? 'Все'
    : (selectedOrganization?.name ?? 'Организация');

  const organizationsForList = isAllOrganizationsSelected
    ? PROJECT_ORGANIZATIONS
    : PROJECT_ORGANIZATIONS.filter((organization) => organization.id === selectedOrganizationId);

  const filteredOrganizations = organizationsForList.map((organization) => ({
    ...organization,
    projects: organization.projects.filter((p) =>
      p.name.toLowerCase().includes(projectSearch.trim().toLowerCase()),
    ),
  })).filter((organization) => organization.projects.length > 0);

  useEffect(() => {
    if (!profileOpen && !projectOpen && !organizationFilterOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (profileOpen && profileWrapRef.current && !profileWrapRef.current.contains(target)) {
        setProfileOpen(false);
      }
      if (projectOpen && projectWrapRef.current && !projectWrapRef.current.contains(target)) {
        setProjectOpen(false);
        setOrganizationFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [organizationFilterOpen, profileOpen, projectOpen]);

  useEffect(() => {
    setSelectedProjectName(selectedProject.name);
  }, [selectedProject.name, setSelectedProjectName]);

  const selectPrototype = (id: typeof selectedPrototypeId) => {
    setSelectedPrototypeId(id);
    setProfileOpen(false);
  };

  return (
    <header className="lk-header" data-prototype={config.prototypeId}>
      <a
        href="/"
        className="lk-header__logo lk-header__logo--leading"
        aria-label="На главную"
        title="На главную"
        onClick={(e) => {
          e.preventDefault();
          navigate('/');
        }}
      >
        <HeaderLogoMorph />
      </a>

      {config.showPlatformSelector && (
        <HeaderPlatformSelector
          open={platformOpen}
          onOpenChange={(open) => {
            setPlatformOpen(open);
            if (open) {
              setProjectOpen(false);
              setOrganizationFilterOpen(false);
              setProfileOpen(false);
            }
          }}
        />
      )}

      <button
        type="button"
        className="lk-header__appswitcher"
        title="Сервисы"
        aria-label={`Сервисы — прототип ${config.prototypeId}`}
        onClick={() => {
          setProfileOpen(false);
          setProjectOpen(false);
          setOrganizationFilterOpen(false);
          setPlatformOpen(false);
          launchSelectedPrototype();
        }}
      >
        <img src={`${ASSETS}/lk-header-appswitcher.svg`} alt="" width={24} height={24} />
      </button>

      <div className="lk-header__project-wrap" ref={projectWrapRef}>
        <button
          type="button"
          className={`lk-header__project${projectOpen ? ' lk-header__project--open' : ''}`}
          aria-expanded={projectOpen}
          aria-haspopup="listbox"
          onClick={() => {
            setProjectOpen((o) => !o);
            setOrganizationFilterOpen(false);
            setPlatformOpen(false);
            setProfileOpen(false);
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
                  placeholder="Поиск по проектам и организациям"
                  className="lk-header__project-search-input"
                />
                <button type="button" className="lk-header__project-sort" aria-label="Сортировка">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6V2M4 2L2 4M4 2L6 4" stroke="#8B8E9B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 10V14M12 14L10 12M12 14L14 12" stroke="#8B8E9B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              <div className="lk-header__project-org-wrap">
                <Chips
                  type="button"
                  size="xs"
                  className={`lk-header__project-org${organizationFilterOpen ? ' lk-header__project-org--open' : ''}`}
                  aria-haspopup="listbox"
                  aria-expanded={organizationFilterOpen}
                  onClick={() => setOrganizationFilterOpen((open) => !open)}
                >
                  <span className="lk-header__project-org-chip-icon" aria-hidden>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 10.5L12 4L20 10.5V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V10.5Z"
                        stroke="#8B8E9B"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M9.5 20V14H14.5V20" stroke="#8B8E9B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="lk-header__project-org-text">{organizationFilterLabel}</span>
                </Chips>

                {organizationFilterOpen && (
                  <div className="lk-header__project-org-select" role="listbox">
                    <button
                      type="button"
                      role="option"
                      aria-selected={isAllOrganizationsSelected}
                      className={`lk-header__project-org-option${isAllOrganizationsSelected ? ' lk-header__project-org-option--selected' : ''}`}
                      onClick={() => {
                        setSelectedOrganizationId(ALL_ORGANIZATIONS_ID);
                        setOrganizationFilterOpen(false);
                        setProjectSearch('');
                      }}
                    >
                      <span className="lk-header__project-org-option-name">Все</span>
                    </button>
                    {PROJECT_ORGANIZATIONS.map((organization) => (
                      <button
                        key={organization.id}
                        type="button"
                        role="option"
                        aria-selected={selectedOrganizationId === organization.id}
                        className={`lk-header__project-org-option${selectedOrganizationId === organization.id ? ' lk-header__project-org-option--selected' : ''}`}
                        onClick={() => {
                          setSelectedOrganizationId(organization.id);
                          setOrganizationFilterOpen(false);
                          setProjectSearch('');
                          if (!organization.projects.some((project) => project.id === selectedProjectId)) {
                            setSelectedProjectId(organization.projects[0]?.id ?? selectedProjectId);
                          }
                        }}
                      >
                        <span className="lk-header__project-org-option-name">{organization.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="lk-header__project-divider" />

              <div className="lk-header__project-list">
                {filteredOrganizations.map((organization) => (
                  <div key={organization.id} className="lk-header__project-org-group">
                    {isAllOrganizationsSelected && (
                      <div className="lk-header__project-row-wrap lk-header__project-row-wrap--organization">
                        <div className="lk-header__project-row lk-header__project-row--organization">
                          <span className="lk-header__project-row-icon lk-header__project-row-icon--organization" aria-hidden>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M3 21H21M5 21V7L12 3L19 7V21M9 21V12H15V21"
                                stroke="#F28B3E"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <span className="lk-header__project-row-name lk-header__project-org-title">
                            {organization.name}
                          </span>
                        </div>
                        <button
                          type="button"
                          className="lk-header__project-row-menu lk-header__project-row-menu--visible"
                          aria-label={`Действия: ${organization.name}`}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="3" r="1.25" fill="#8B8E9B" />
                            <circle cx="8" cy="8" r="1.25" fill="#8B8E9B" />
                            <circle cx="8" cy="13" r="1.25" fill="#8B8E9B" />
                          </svg>
                        </button>
                      </div>
                    )}
                    {organization.projects.map((project) => (
                      <div key={project.id} className="lk-header__project-row-wrap">
                        <button
                          type="button"
                          role="option"
                          aria-selected={selectedProjectId === project.id}
                          className={`lk-header__project-row${selectedProjectId === project.id ? ' lk-header__project-row--selected' : ''}${isAllOrganizationsSelected ? ' lk-header__project-row--nested' : ''}`}
                          onClick={() => {
                            setSelectedProjectId(project.id);
                            setProjectOpen(false);
                            setOrganizationFilterOpen(false);
                            setProjectSearch('');
                          }}
                        >
                          {selectedProjectId === project.id && (
                            <span className="lk-header__project-row-marker" aria-hidden />
                          )}
                          <span className="lk-header__project-row-icon lk-header__project-row-icon--project" aria-hidden>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M3 7C3 5.89543 3.89543 5 5 5H9L11 7H19C20.1046 7 21 7.89543 21 9V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7Z"
                                stroke="#7F8496"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <circle cx="10.5" cy="13.5" r="3" stroke="#7F8496" strokeWidth="1.6" />
                              <path d="M10.5 11.7V15.3M8.7 13.5H12.3" stroke="#7F8496" strokeWidth="1.6" strokeLinecap="round" />
                            </svg>
                          </span>
                          <span className="lk-header__project-row-name">{project.name}</span>
                        </button>
                        <button
                          type="button"
                          className="lk-header__project-row-menu lk-header__project-row-menu--visible"
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
                {filteredOrganizations.length === 0 && (
                  <div className="lk-header__project-empty">Нет проектов в выбранной организации</div>
                )}
              </div>

              <div className="lk-header__project-divider" />

              <button type="button" className="lk-header__project-add">
                <span className="lk-header__project-add-icon" aria-hidden>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3V13M3 8H13" stroke="#6D707F" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                Создать проект
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

      <div className="lk-header__avatar-wrap" ref={profileWrapRef}>
        <button
          type="button"
          className={`lk-header__avatar${profileOpen ? ' lk-header__avatar--open' : ''}`}
          title="Владимир Чумаков — выбор прототипа"
          aria-label="Профиль — выбор прототипа навигации"
          aria-expanded={profileOpen}
          aria-haspopup="menu"
          onClick={() => {
            setProfileOpen((o) => !o);
            setProjectOpen(false);
            setOrganizationFilterOpen(false);
            setPlatformOpen(false);
          }}
        >
          ВЧ
        </button>

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
