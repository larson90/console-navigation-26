import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  buildServicesIndex,
  resolveFavoriteServices,
  type ServiceCard,
} from '../data/serviceCatalog';
import {
  readRecentServiceIds,
  RECENT_SERVICES_CHANGED_EVENT,
  clearRecentServiceIds,
} from './recentServicesStorage';

export function useRecentServices(controlItemIcon: string) {
  const [recentIds, setRecentIds] = useState(() => readRecentServiceIds());

  const servicesIndex = useMemo(
    () => buildServicesIndex(controlItemIcon),
    [controlItemIcon],
  );

  const recentServices = useMemo(
    () => resolveFavoriteServices(recentIds, servicesIndex),
    [recentIds, servicesIndex],
  );

  useEffect(() => {
    const sync = () => setRecentIds(readRecentServiceIds());

    window.addEventListener(RECENT_SERVICES_CHANGED_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(RECENT_SERVICES_CHANGED_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const clearRecentServices = useCallback(() => {
    clearRecentServiceIds();
    setRecentIds([]);
  }, []);

  return { recentIds, recentServices, clearRecentServices };
}

export type { ServiceCard };
