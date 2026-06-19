export type NavigationPrototypeId = '1' | '2' | '3';

export const DEFAULT_NAVIGATION_PROTOTYPE_ID: NavigationPrototypeId = '3';

export function getPrototypeIdFromPath(pathname: string): NavigationPrototypeId | null {
  const m = pathname.match(/^\/prototype-([123])$/);
  return m ? (m[1] as NavigationPrototypeId) : null;
}
