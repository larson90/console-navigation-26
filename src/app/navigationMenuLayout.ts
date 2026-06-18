export const NAV_SIDEBAR_WIDTH = 216;
export const NAV_DIVIDER_WIDTH = 32;

/** Ширина всего меню (дровер) */
export const NAV_MENU_MIN_DRAWER_WIDTH = 888;
export const NAV_MENU_MAX_DRAWER_WIDTH = 1120;

/** Ширина основной части (категории и сервисы) */
export const NAV_MENU_MIN_MAIN_WIDTH =
  NAV_MENU_MIN_DRAWER_WIDTH - NAV_SIDEBAR_WIDTH - NAV_DIVIDER_WIDTH;
export const NAV_MENU_MAX_MAIN_WIDTH =
  NAV_MENU_MAX_DRAWER_WIDTH - NAV_SIDEBAR_WIDTH - NAV_DIVIDER_WIDTH;

/** Порог с гистерезисом: 2 колонки ниже, 3 — выше (по ширине основной части) */
export const NAV_MENU_COL_2_MAX_WIDTH = 740;
export const NAV_MENU_COL_3_MIN_WIDTH = 780;

export function clampMainWidth(width: number): number {
  return Math.min(NAV_MENU_MAX_MAIN_WIDTH, Math.max(NAV_MENU_MIN_MAIN_WIDTH, width));
}

export function mainWidthToDrawerWidth(mainWidth: number): number {
  return NAV_SIDEBAR_WIDTH + NAV_DIVIDER_WIDTH + clampMainWidth(mainWidth);
}

export function resolveServiceColumns(width: number, previous: 2 | 3): 2 | 3 {
  if (previous === 2 && width >= NAV_MENU_COL_3_MIN_WIDTH) return 3;
  if (previous === 3 && width <= NAV_MENU_COL_2_MAX_WIDTH) return 2;
  return previous;
}
