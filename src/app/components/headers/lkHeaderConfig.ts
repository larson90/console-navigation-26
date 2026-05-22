import type { NavigationPrototypeId } from '../../navigationPrototype';

export interface LkHeaderConfig {
  prototypeId: NavigationPrototypeId;
  showPlatformSelector: boolean;
}

export const LK_HEADER_CONFIG: Record<NavigationPrototypeId, LkHeaderConfig> = {
  '1': {
    prototypeId: '1',
    showPlatformSelector: true,
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
