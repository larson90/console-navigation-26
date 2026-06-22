import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  ALL_ORGANIZATIONS_ID,
  DEFAULT_PROJECT_ID,
  PROJECT_ORGANIZATIONS,
  type ProjectItem,
  type ProjectOrganization,
} from '../data/projectCatalog';
import { usePlatform } from './PlatformContext';
import { useScreenLoading } from './ScreenLoadingContext';
import { useUserActionToast } from './UserActionToastContext';

interface ProjectSelectionContextValue {
  selectedProjectId: string;
  selectedProject: ProjectItem;
  selectedOrganizationId: string;
  isAllOrganizationsSelected: boolean;
  organizationFilterLabel: string;
  filteredOrganizations: ProjectOrganization[];
  projectSearch: string;
  setProjectSearch: (value: string) => void;
  organizationFilterOpen: boolean;
  setOrganizationFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedOrganizationId: (organizationId: string) => void;
  selectProject: (projectId: string) => void;
}

const ProjectSelectionContext = createContext<ProjectSelectionContextValue | null>(null);

const DEFAULT_ORGANIZATION_ID = PROJECT_ORGANIZATIONS[0]?.id ?? '';

export function ProjectSelectionProvider({ children }: { children: React.ReactNode }) {
  const { setSelectedProjectName } = usePlatform();
  const { startScreenLoading } = useScreenLoading();
  const { showUserAction } = useUserActionToast();

  const [selectedProjectId, setSelectedProjectId] = useState(DEFAULT_PROJECT_ID);
  const [selectedOrganizationId, setSelectedOrganizationId] = useState(DEFAULT_ORGANIZATION_ID);
  const [projectSearch, setProjectSearch] = useState('');
  const [organizationFilterOpen, setOrganizationFilterOpen] = useState(false);

  const selectedProject =
    PROJECT_ORGANIZATIONS.flatMap((organization) => organization.projects).find(
      (project) => project.id === selectedProjectId,
    ) ?? { id: DEFAULT_PROJECT_ID, name: 'Чат-бот' };

  const isAllOrganizationsSelected = selectedOrganizationId === ALL_ORGANIZATIONS_ID;

  const selectedOrganization = PROJECT_ORGANIZATIONS.find(
    (organization) => organization.id === selectedOrganizationId,
  );

  const organizationFilterLabel = isAllOrganizationsSelected
    ? 'Все'
    : (selectedOrganization?.name ?? 'Организация');

  const filteredOrganizations = useMemo(() => {
    const organizations = isAllOrganizationsSelected
      ? PROJECT_ORGANIZATIONS
      : PROJECT_ORGANIZATIONS.filter((organization) => organization.id === selectedOrganizationId);

    return organizations
      .map((organization) => ({
        ...organization,
        projects: organization.projects.filter((project) =>
          project.name.toLowerCase().includes(projectSearch.trim().toLowerCase()),
        ),
      }))
      .filter((organization) => organization.projects.length > 0);
  }, [isAllOrganizationsSelected, projectSearch, selectedOrganizationId]);

  useEffect(() => {
    setSelectedProjectName(selectedProject.name);
  }, [selectedProject.name, setSelectedProjectName]);

  const selectProject = useCallback(
    (projectId: string) => {
      if (projectId !== selectedProjectId) {
        startScreenLoading(undefined, () => showUserAction('Проект изменен'));
      }
      setSelectedProjectId(projectId);
      setOrganizationFilterOpen(false);
      setProjectSearch('');
    },
    [selectedProjectId, showUserAction, startScreenLoading],
  );

  const value = useMemo(
    () => ({
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
    }),
    [
      filteredOrganizations,
      isAllOrganizationsSelected,
      organizationFilterLabel,
      organizationFilterOpen,
      projectSearch,
      selectProject,
      selectedOrganizationId,
      selectedProject,
      selectedProjectId,
    ],
  );

  return (
    <ProjectSelectionContext.Provider value={value}>{children}</ProjectSelectionContext.Provider>
  );
}

export function useProjectSelection() {
  const context = useContext(ProjectSelectionContext);
  if (!context) {
    throw new Error('useProjectSelection must be used within ProjectSelectionProvider');
  }
  return context;
}
