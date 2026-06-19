export type ServiceResourceLayout = 'single' | 'many';
export type ServicePageView = 'overview' | 'subpage';

export interface ServicePageDisplaySettings {
  resourceLayout: ServiceResourceLayout;
  hasData: boolean;
}

export interface ServiceSubpageNavItem {
  id: string;
  title: string;
  icon?: string;
}

/** Контекст мегасервиса / блока с несколькими ресурсами из меню. */
export interface MegaservicePageContext {
  id: string;
  title: string;
  icon: string;
  subpages: ServiceSubpageNavItem[];
}

export interface ServiceNavState {
  title: string;
  icon?: string;
  subtitle?: string;
  megaservice?: MegaservicePageContext;
  /** Id подсервиса, по которому перешли из меню (для открытия subpage). */
  activeSubpageId?: string;
}

export const SERVICE_SUBPAGES_MANY: ServiceSubpageNavItem[] = [
  { id: 'subpage-1', title: 'Subpage 1' },
  { id: 'subpage-2', title: 'Subpage 2' },
  { id: 'subpage-3', title: 'Subpage 3' },
  { id: 'monitoring', title: 'Мониторинг' },
  { id: 'quotas', title: 'Квоты' },
  { id: 'settings', title: 'Настройки' },
];

export const SERVICE_SUBPAGES_SINGLE: ServiceSubpageNavItem[] = [
  { id: 'subpage-1', title: 'Subpage 1' },
];

export const RELATED_SERVICES = ['Service Name 1', 'Service Name 2', 'Service Name 3'];
