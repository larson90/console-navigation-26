import React, { useEffect, useRef } from 'react';
import { Chips } from './ui/chips';
import { useProjectSelection } from '../context/ProjectSelectionContext';
import {
  ALL_ORGANIZATIONS_ID,
  DEFAULT_PROJECT_LABEL,
  getProjectInitials,
  PROJECT_ORGANIZATIONS,
} from '../data/projectCatalog';

const ASSETS = '/assets/lk-header';

export interface HeaderProjectSelectorProps {
  variant: 'header' | 'menu';
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HeaderProjectSelector({ variant, open, onOpenChange }: HeaderProjectSelectorProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const {
    selectedProjectId,
    selectedProject,
    selectedOrganizationId,
    isAllOrganizationsSelected,
    organizationFilterLabel,
    filteredOrganizations,
    projectSearch,
    setProjectSearch,
    organizationFilterOpen,
    setOrganizationFilterOpen,
    setSelectedOrganizationId,
    selectProject,
  } = useProjectSelection();

  useEffect(() => {
    if (!open && !organizationFilterOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        onOpenChange(false);
        setOrganizationFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open, organizationFilterOpen, onOpenChange, setOrganizationFilterOpen]);

  const toggleOpen = () => {
    onOpenChange(!open);
    setOrganizationFilterOpen(false);
  };

  const handleSelectProject = (projectId: string) => {
    selectProject(projectId);
    onOpenChange(false);
  };

  return (
    <div
      className={`lk-header__project-wrap${variant === 'menu' ? ' lk-header__project-wrap--menu' : ''}`}
      ref={wrapRef}
    >
      <button
        type="button"
        className={`lk-header__project${open ? ' lk-header__project--open' : ''}${
          variant === 'menu' ? ' lk-header__project--menu' : ''
        }`}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={toggleOpen}
      >
        {variant === 'menu' ? (
          <>
            <span className="lk-header__project-avatar" aria-hidden>
              {getProjectInitials(selectedProject.name)}
            </span>
            <img
              src={`${ASSETS}/lk-header-chev-down.svg`}
              alt=""
              width={16}
              height={16}
              className={`lk-header__project-chev${open ? ' lk-header__project-chev--up' : ''}`}
            />
          </>
        ) : (
          <>
            <span className="lk-header__project-text">
              <span className="lk-header__project-name">{selectedProject.name}</span>
              <span className="lk-header__project-sub">{DEFAULT_PROJECT_LABEL}</span>
            </span>
            <img
              src={`${ASSETS}/lk-header-chev-down.svg`}
              alt=""
              width={16}
              height={16}
              className={`lk-header__project-chev${open ? ' lk-header__project-chev--up' : ''}`}
            />
          </>
        )}
      </button>

      {open && (
        <div
          className={`lk-header__project-dropdown${
            variant === 'menu' ? ' lk-header__project-dropdown--menu' : ''
          }`}
          role="listbox"
        >
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
                onChange={(event) => setProjectSearch(event.target.value)}
                placeholder="Поиск по проектам и организациям"
                className="lk-header__project-search-input"
              />
              <button type="button" className="lk-header__project-sort" aria-label="Сортировка">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4 6V2M4 2L2 4M4 2L6 4"
                    stroke="#8B8E9B"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 10V14M12 14L10 12M12 14L14 12"
                    stroke="#8B8E9B"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
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
                onClick={() => setOrganizationFilterOpen((value) => !value)}
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
                    <path
                      d="M9.5 20V14H14.5V20"
                      stroke="#8B8E9B"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="lk-header__project-org-text">{organizationFilterLabel}</span>
                <img
                  src={`${ASSETS}/lk-header-chev-down.svg`}
                  alt=""
                  width={10}
                  height={10}
                  className={`lk-header__project-org-chev${organizationFilterOpen ? ' lk-header__project-org-chev--up' : ''}`}
                  aria-hidden
                />
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
                          const nextProjectId = organization.projects[0]?.id;
                          if (nextProjectId) {
                            handleSelectProject(nextProjectId);
                          }
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
                        <span
                          className="lk-header__project-row-icon lk-header__project-row-icon--organization"
                          aria-hidden
                        >
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
                        onClick={() => handleSelectProject(project.id)}
                      >
                        {selectedProjectId === project.id && (
                          <span className="lk-header__project-row-marker" aria-hidden />
                        )}
                        <span
                          className="lk-header__project-row-icon lk-header__project-row-icon--project"
                          aria-hidden
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M3 7C3 5.89543 3.89543 5 5 5H9L11 7H19C20.1046 7 21 7.89543 21 9V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7Z"
                              stroke="#7F8496"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <circle cx="10.5" cy="13.5" r="3" stroke="#7F8496" strokeWidth="1.6" />
                            <path
                              d="M10.5 11.7V15.3M8.7 13.5H12.3"
                              stroke="#7F8496"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
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
  );
}
