import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  NAV_MENU_MIN_MAIN_WIDTH,
  clampMainWidth,
  mainWidthToDrawerWidth,
  resolveServiceColumns,
} from '../navigationMenuLayout';

interface NavigationMenuWidthContextValue {
  mainWidth: number;
  drawerWidth: number;
  serviceColumns: 2 | 3;
  isResizing: boolean;
  setMainWidth: (width: number) => void;
  beginResize: () => void;
  endResize: () => void;
}

const NavigationMenuWidthContext = createContext<NavigationMenuWidthContextValue | null>(null);

export function NavigationMenuWidthProvider({ children }: { children: React.ReactNode }) {
  const [mainWidth, setMainWidthState] = useState(NAV_MENU_MIN_MAIN_WIDTH);
  const [serviceColumns, setServiceColumns] = useState<2 | 3>(2);
  const [isResizing, setIsResizing] = useState(false);

  const setMainWidth = useCallback((width: number) => {
    const next = clampMainWidth(width);
    setMainWidthState(next);
    setServiceColumns((prev) => resolveServiceColumns(next, prev));
  }, []);

  const beginResize = useCallback(() => setIsResizing(true), []);
  const endResize = useCallback(() => setIsResizing(false), []);

  const value = useMemo(
    () => ({
      mainWidth,
      drawerWidth: mainWidthToDrawerWidth(mainWidth),
      serviceColumns,
      isResizing,
      setMainWidth,
      beginResize,
      endResize,
    }),
    [mainWidth, serviceColumns, isResizing, setMainWidth, beginResize, endResize],
  );

  return (
    <NavigationMenuWidthContext.Provider value={value}>
      {children}
    </NavigationMenuWidthContext.Provider>
  );
}

export function useNavigationMenuWidth() {
  const context = useContext(NavigationMenuWidthContext);
  if (!context) {
    throw new Error('useNavigationMenuWidth must be used within NavigationMenuWidthProvider');
  }
  return context;
}
