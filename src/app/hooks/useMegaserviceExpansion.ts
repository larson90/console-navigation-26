import { useCallback, useMemo, useState } from 'react';
import {
  buildExpandedMegaserviceIds,
  isMegaserviceExpanded,
  loadMegaserviceExpansionPrefs,
  saveMegaserviceExpansionPrefs,
  setAllMegaserviceExpansionPrefs,
  setMegaserviceExpansionPref,
  type MegaserviceExpansionPrefs,
  type MegaserviceExpansionScope,
} from './megaserviceExpansionStorage';

interface UseMegaserviceExpansionOptions {
  storageKey: string;
  platformIds: string[];
  controlIds: string[];
  platformDefaultExpanded?: boolean;
  controlDefaultExpanded: boolean;
}

export function useMegaserviceExpansion({
  storageKey,
  platformIds,
  controlIds,
  platformDefaultExpanded = true,
  controlDefaultExpanded,
}: UseMegaserviceExpansionOptions) {
  const [prefs, setPrefs] = useState<MegaserviceExpansionPrefs>(() =>
    loadMegaserviceExpansionPrefs(storageKey),
  );
  const [sessionPlatformIds, setSessionPlatformIds] = useState<string[] | null>(null);
  const [sessionControlIds, setSessionControlIds] = useState<string[] | null>(null);

  const computedPlatformIds = useMemo(
    () => buildExpandedMegaserviceIds('platform', platformIds, platformDefaultExpanded, prefs),
    [platformIds, platformDefaultExpanded, prefs],
  );

  const computedControlIds = useMemo(
    () => buildExpandedMegaserviceIds('control', controlIds, controlDefaultExpanded, prefs),
    [controlIds, controlDefaultExpanded, prefs],
  );

  const expandedPlatformMegaservices = sessionPlatformIds ?? computedPlatformIds;
  const expandedControlMegaservices = sessionControlIds ?? computedControlIds;

  const toggleMegaservice = useCallback(
    (scope: MegaserviceExpansionScope, megaserviceId: string) => {
      if (scope === 'platform') {
        setSessionPlatformIds(null);
      } else {
        setSessionControlIds(null);
      }

      setPrefs((currentPrefs) => {
        const defaultExpanded = scope === 'platform' ? platformDefaultExpanded : controlDefaultExpanded;
        const nextExpanded = !isMegaserviceExpanded(scope, megaserviceId, defaultExpanded, currentPrefs);
        const nextPrefs = setMegaserviceExpansionPref(currentPrefs, scope, megaserviceId, nextExpanded);
        saveMegaserviceExpansionPrefs(storageKey, nextPrefs);
        return nextPrefs;
      });
    },
    [controlDefaultExpanded, platformDefaultExpanded, storageKey],
  );

  const togglePlatformMegaservice = useCallback(
    (megaserviceId: string) => toggleMegaservice('platform', megaserviceId),
    [toggleMegaservice],
  );

  const toggleControlMegaservice = useCallback(
    (megaserviceId: string) => toggleMegaservice('control', megaserviceId),
    [toggleMegaservice],
  );

  const setAllPlatformMegaservicesExpanded = useCallback(
    (expanded: boolean) => {
      setSessionPlatformIds(null);
      setPrefs((currentPrefs) => {
        const nextPrefs = setAllMegaserviceExpansionPrefs(currentPrefs, 'platform', platformIds, expanded);
        saveMegaserviceExpansionPrefs(storageKey, nextPrefs);
        return nextPrefs;
      });
    },
    [platformIds, storageKey],
  );

  const setAllControlMegaservicesExpanded = useCallback(
    (expanded: boolean) => {
      setSessionControlIds(null);
      setPrefs((currentPrefs) => {
        const nextPrefs = setAllMegaserviceExpansionPrefs(currentPrefs, 'control', controlIds, expanded);
        saveMegaserviceExpansionPrefs(storageKey, nextPrefs);
        return nextPrefs;
      });
    },
    [controlIds, storageKey],
  );

  const setExpandedPlatformMegaservices = useCallback((ids: string[] | null) => {
    setSessionPlatformIds(ids);
  }, []);

  const setExpandedControlMegaservices = useCallback((ids: string[] | null) => {
    setSessionControlIds(ids);
  }, []);

  const restoreMegaserviceExpansion = useCallback((platform: string[], control: string[]) => {
    setSessionPlatformIds(platform);
    setSessionControlIds(control);
  }, []);

  return {
    expandedPlatformMegaservices,
    expandedControlMegaservices,
    togglePlatformMegaservice,
    toggleControlMegaservice,
    setAllPlatformMegaservicesExpanded,
    setAllControlMegaservicesExpanded,
    setExpandedPlatformMegaservices,
    setExpandedControlMegaservices,
    restoreMegaserviceExpansion,
  };
}
