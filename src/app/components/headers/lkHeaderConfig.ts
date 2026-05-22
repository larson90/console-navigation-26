import type { NavigationPrototypeId } from '../../navigationPrototype';

export interface LkHeaderConfig {
  prototypeId: NavigationPrototypeId;
  showPlatformSelector: boolean;
  /** Фиксированная платформа без переключателя (прототип 1) */
  staticPlatformId?: 'evolution';
}

export const LK_HEADER_CONFIG: Record<NavigationPrototypeId, LkHeaderConfig> = {
  '1': {
    prototypeId: '1',
    showPlatformSelector: false,
    staticPlatformId: 'evolution',
  },
  '2': {
    prototypeId: '2',
    showPlatformSelector: true,
  },
  '3': {
    prototypeId: '3',
    showPlatformSelector: true,
  },
};
