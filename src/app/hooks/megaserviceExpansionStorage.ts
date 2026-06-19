export type MegaserviceExpansionScope = 'platform' | 'control';

export interface MegaserviceExpansionPrefs {
  platform?: Record<string, boolean>;
  control?: Record<string, boolean>;
}

export function loadMegaserviceExpansionPrefs(storageKey: string): MegaserviceExpansionPrefs {
  if (typeof window === 'undefined') return {};

  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as MegaserviceExpansionPrefs;
    return {
      platform: parsed.platform ?? {},
      control: parsed.control ?? {},
    };
  } catch {
    return {};
  }
}

export function saveMegaserviceExpansionPrefs(storageKey: string, prefs: MegaserviceExpansionPrefs) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(storageKey, JSON.stringify(prefs));
}

export function isMegaserviceExpanded(
  scope: MegaserviceExpansionScope,
  id: string,
  defaultExpanded: boolean,
  prefs: MegaserviceExpansionPrefs,
): boolean {
  const scopePrefs = prefs[scope];
  if (scopePrefs && Object.prototype.hasOwnProperty.call(scopePrefs, id)) {
    return scopePrefs[id]!;
  }
  return defaultExpanded;
}

export function buildExpandedMegaserviceIds(
  scope: MegaserviceExpansionScope,
  ids: string[],
  defaultExpanded: boolean,
  prefs: MegaserviceExpansionPrefs,
): string[] {
  return ids.filter((id) => isMegaserviceExpanded(scope, id, defaultExpanded, prefs));
}

export function setMegaserviceExpansionPref(
  prefs: MegaserviceExpansionPrefs,
  scope: MegaserviceExpansionScope,
  id: string,
  expanded: boolean,
): MegaserviceExpansionPrefs {
  return {
    ...prefs,
    [scope]: {
      ...prefs[scope],
      [id]: expanded,
    },
  };
}

export function setAllMegaserviceExpansionPrefs(
  prefs: MegaserviceExpansionPrefs,
  scope: MegaserviceExpansionScope,
  ids: string[],
  expanded: boolean,
): MegaserviceExpansionPrefs {
  const nextScopePrefs = { ...prefs[scope] };
  for (const id of ids) {
    nextScopePrefs[id] = expanded;
  }
  return {
    ...prefs,
    [scope]: nextScopePrefs,
  };
}
