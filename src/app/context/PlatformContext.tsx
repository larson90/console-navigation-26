import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { PLATFORMS, type PlatformId, type PlatformOption } from '../data/platformCatalog';

export function getPlatformPageTitle(platform: PlatformOption): string {
  return `Платформа Cloud.ru ${platform.title}`;
}

interface PlatformContextValue {
  selectedId: PlatformId;
  selectedPlatform: PlatformOption;
  pageTitle: string;
  selectPlatform: (id: PlatformId) => void;
}

const PlatformContext = createContext<PlatformContextValue | null>(null);

export function PlatformProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<PlatformId>('evolution');

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
      selectPlatform,
    }),
    [selectedId, selectedPlatform, pageTitle, selectPlatform],
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
