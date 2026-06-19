import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
  DEFAULT_NAVIGATION_PROTOTYPE_ID,
  getPrototypeIdFromPath,
  type NavigationPrototypeId,
} from '../navigationPrototype';

const STORAGE_KEY = 'lk-selected-navigation-prototype';

export const NAVIGATION_PROTOTYPES: {
  id: NavigationPrototypeId;
  path: string;
  title: string;
  description: string;
}[] = [
  { id: '1', path: '/prototype-1', title: 'Прототип 1', description: 'Без переключения платформы' },
  { id: '2', path: '/prototype-2', title: 'Прототип 2', description: 'Стандартная навигация' },
  { id: '3', path: '/prototype-3', title: 'Прототип 3', description: 'Сервисы, Центр управления, Решения' },
];

interface SavedLocation {
  pathname: string;
  search: string;
  state: unknown;
}

function readStoredPrototype(): NavigationPrototypeId {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === '1' || stored === '2' || stored === '3') return stored;
  return DEFAULT_NAVIGATION_PROTOTYPE_ID;
}

interface NavigationPrototypeContextValue {
  selectedPrototypeId: NavigationPrototypeId;
  setSelectedPrototypeId: (id: NavigationPrototypeId) => void;
  isMenuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  completeMenuNavigation: () => void;
  launchSelectedPrototype: () => void;
}

const NavigationPrototypeContext = createContext<NavigationPrototypeContextValue | null>(null);

export function NavigationPrototypeProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPrototypeId, setSelectedPrototypeIdState] =
    useState<NavigationPrototypeId>(readStoredPrototype);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const returnLocationRef = useRef<SavedLocation>({
    pathname: '/',
    search: '',
    state: null,
  });
  const hasNavigatedFromMenuRef = useRef(false);

  useEffect(() => {
    const fromPath = getPrototypeIdFromPath(location.pathname);
    if (fromPath) {
      setSelectedPrototypeIdState(fromPath);
      localStorage.setItem(STORAGE_KEY, fromPath);
    }
  }, [location.pathname]);

  const setSelectedPrototypeId = useCallback((id: NavigationPrototypeId) => {
    setSelectedPrototypeIdState(id);
    localStorage.setItem(STORAGE_KEY, id);
  }, []);

  const openMenu = useCallback(() => {
    if (getPrototypeIdFromPath(location.pathname)) {
      returnLocationRef.current = { pathname: '/', search: '', state: null };
    } else {
      returnLocationRef.current = {
        pathname: location.pathname,
        search: location.search,
        state: location.state,
      };
    }
    hasNavigatedFromMenuRef.current = false;
    setIsMenuOpen(true);
  }, [location.pathname, location.search, location.state]);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);

    if (hasNavigatedFromMenuRef.current) {
      hasNavigatedFromMenuRef.current = false;
      if (getPrototypeIdFromPath(location.pathname)) {
        navigate('/', { replace: true });
      }
      return;
    }

    if (getPrototypeIdFromPath(location.pathname)) {
      navigate('/', { replace: true });
      return;
    }

    const saved = returnLocationRef.current;
    navigate(
      { pathname: saved.pathname, search: saved.search },
      { state: saved.state, replace: true },
    );
  }, [location.pathname, navigate]);

  const completeMenuNavigation = useCallback(() => {
    hasNavigatedFromMenuRef.current = true;
    setIsMenuOpen(false);
  }, []);

  const launchSelectedPrototype = useCallback(() => {
    if (isMenuOpen || getPrototypeIdFromPath(location.pathname)) {
      closeMenu();
      return;
    }
    openMenu();
  }, [closeMenu, isMenuOpen, location.pathname, openMenu]);

  const value = useMemo(
    () => ({
      selectedPrototypeId,
      setSelectedPrototypeId,
      isMenuOpen,
      openMenu,
      closeMenu,
      completeMenuNavigation,
      launchSelectedPrototype,
    }),
    [
      selectedPrototypeId,
      setSelectedPrototypeId,
      isMenuOpen,
      openMenu,
      closeMenu,
      completeMenuNavigation,
      launchSelectedPrototype,
    ],
  );

  return (
    <NavigationPrototypeContext.Provider value={value}>{children}</NavigationPrototypeContext.Provider>
  );
}

export function useNavigationPrototype() {
  const ctx = useContext(NavigationPrototypeContext);
  if (!ctx) {
    throw new Error('useNavigationPrototype must be used within NavigationPrototypeProvider');
  }
  return ctx;
}
