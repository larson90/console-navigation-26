const STORAGE_KEY = 'lk-recent-services';
export const MAX_RECENT_SERVICES = 10;
export const RECENT_SERVICES_CHANGED_EVENT = 'lk-recent-services-changed';

export function readRecentServiceIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === 'string');
  } catch {
    return [];
  }
}

export function clearRecentServiceIds(): void {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(RECENT_SERVICES_CHANGED_EVENT));
}

export function recordRecentServiceVisit(serviceId: string): string[] {
  if (!serviceId) return readRecentServiceIds();

  const next = [serviceId, ...readRecentServiceIds().filter((id) => id !== serviceId)].slice(
    0,
    MAX_RECENT_SERVICES,
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(RECENT_SERVICES_CHANGED_EVENT));
  return next;
}
