export type PlatformId = 'evolution' | 'advanced' | 'vmware' | 'partner' | 'marketplace';

export interface PlatformOption {
  id: PlatformId;
  title: string;
  section: 'cloud' | 'other';
}

export const PLATFORMS: PlatformOption[] = [
  { id: 'evolution', title: 'Evolution', section: 'cloud' },
  { id: 'advanced', title: 'Advanced', section: 'cloud' },
  { id: 'vmware', title: 'Облако VMware', section: 'cloud' },
  { id: 'partner', title: 'Партнерский кабинет', section: 'other' },
  { id: 'marketplace', title: 'Маркетплейс', section: 'other' },
];
