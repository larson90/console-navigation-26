export type PlatformId = 'evolution' | 'advanced' | 'vmware' | 'partner' | 'marketplace';

export interface PlatformOption {
  id: PlatformId;
  title: string;
  section: 'cloud' | 'other';
  description: string;
}

export const PLATFORMS: PlatformOption[] = [
  {
    id: 'evolution',
    title: 'Evolution',
    section: 'cloud',
    description: 'Базовая облачная платформа для быстрых запусков сервисов.',
  },
  {
    id: 'advanced',
    title: 'Advanced',
    section: 'cloud',
    description: 'Расширенная платформа с гибкими сетями и управлением ресурсами.',
  },
  {
    id: 'vmware',
    title: 'Облако VMware',
    section: 'cloud',
    description: 'Инфраструктура VMware для миграции enterprise-нагрузок в облако.',
  },
  {
    id: 'partner',
    title: 'Партнерский кабинет',
    section: 'other',
    description: 'Управление партнерскими проектами, командами и доступами.',
  },
  {
    id: 'marketplace',
    title: 'Маркетплейс',
    section: 'other',
    description: 'Каталог готовых решений, образов и сервисов для быстрого старта.',
  },
];
