export const MARKETPLACE_PATH = '/marketplace';
export const MARKETPLACE_TITLE = 'Маркетплейс';

export interface MarketplaceNavState {
  title: string;
}

export function buildMarketplaceNavState(): MarketplaceNavState {
  return { title: MARKETPLACE_TITLE };
}

export function isMarketplacePath(pathname: string): boolean {
  return pathname === MARKETPLACE_PATH || pathname.endsWith(`${MARKETPLACE_PATH}`);
}
