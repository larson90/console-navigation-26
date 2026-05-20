import { createContext, useContext } from 'react';

export const NavigationOverlayContext = createContext<(() => void) | null>(null);

export function useNavigationOverlayClose() {
  return useContext(NavigationOverlayContext);
}
