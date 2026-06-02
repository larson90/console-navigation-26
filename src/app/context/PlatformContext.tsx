import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { PLATFORMS, type PlatformId, type PlatformOption } from '../data/platformCatalog';

const DEFAULT_PROJECT_NAME = 'K8s прод-кластер';

export function getPlatformPageTitle(platform: PlatformOption): string {
  return `Платформа Cloud.ru ${platform.title}`;
}

interface PlatformContextValue {
  selectedId: PlatformId;
  selectedPlatform: PlatformOption;
  pageTitle: string;
  selectedProjectName: string;
  selectPlatform: (id: PlatformId) => void;
  setSelectedProjectName: (name: string) => void;
}

const PlatformContext = createContext<PlatformContextValue | null>(null);

export function PlatformProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<PlatformId>('evolution');
  const [selectedProjectName, setSelectedProjectName] = useState(DEFAULT_PROJECT_NAME);

  const selectedPlatform = PLATFORMS.find((p) => p.id === selectedId) ?? PLATFORMS[0];
  const pageTitle = getPlatformPageTitle(selectedPlatform);

  const selectPlatform = useCallback(
    (id: PlatformId) => {
      setSelectedId(id);
      navigate('/');
    },
    [navigate],
  );

  const value = useMemo(
    () => ({
      selectedId,
      selectedPlatform,
      pageTitle,
      selectedProjectName,
      selectPlatform,
      setSelectedProjectName,
    }),
    [pageTitle, selectPlatform, selectedId, selectedPlatform, selectedProjectName],
  );

  return <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>;
}

export function usePlatform() {
  const ctx = useContext(PlatformContext);
  if (!ctx) {
    throw new Error('usePlatform must be used within PlatformProvider');
  }
  return ctx;
}
