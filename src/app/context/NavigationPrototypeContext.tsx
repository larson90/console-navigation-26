import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {
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

function readStoredPrototype(): NavigationPrototypeId {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === '1' || stored === '2' || stored === '3') return stored;
  return '1';
}

interface NavigationPrototypeContextValue {
  selectedPrototypeId: NavigationPrototypeId;
  setSelectedPrototypeId: (id: NavigationPrototypeId) => void;
  launchSelectedPrototype: () => void;
}

const NavigationPrototypeContext = createContext<NavigationPrototypeContextValue | null>(null);

export function NavigationPrototypeProvider({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [selectedPrototypeId, setSelectedPrototypeIdState] =
    useState<NavigationPrototypeId>(readStoredPrototype);

  useEffect(() => {
    const fromPath = getPrototypeIdFromPath(pathname);
    if (fromPath) {
      setSelectedPrototypeIdState(fromPath);
      localStorage.setItem(STORAGE_KEY, fromPath);
    }
  }, [pathname]);

  const setSelectedPrototypeId = useCallback((id: NavigationPrototypeId) => {
    setSelectedPrototypeIdState(id);
    localStorage.setItem(STORAGE_KEY, id);
  }, []);

  const launchSelectedPrototype = useCallback(() => {
    const prototype = NAVIGATION_PROTOTYPES.find((p) => p.id === selectedPrototypeId);
    if (prototype) navigate(prototype.path);
  }, [navigate, selectedPrototypeId]);

  const value = useMemo(
    () => ({ selectedPrototypeId, setSelectedPrototypeId, launchSelectedPrototype }),
    [selectedPrototypeId, setSelectedPrototypeId, launchSelectedPrototype],
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
