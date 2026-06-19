import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface ServicePageBreadcrumbContextValue {
  subpageTitle: string | null;
  setSubpageTitle: (title: string | null) => void;
  registerOverviewHandler: (handler: (() => void) | null) => void;
  goToOverview: () => void;
}

const ServicePageBreadcrumbContext = createContext<ServicePageBreadcrumbContextValue | null>(null);

export function ServicePageBreadcrumbProvider({ children }: { children: React.ReactNode }) {
  const [subpageTitle, setSubpageTitle] = useState<string | null>(null);
  const overviewHandlerRef = React.useRef<(() => void) | null>(null);

  const registerOverviewHandler = useCallback((handler: (() => void) | null) => {
    overviewHandlerRef.current = handler;
  }, []);

  const goToOverview = useCallback(() => {
    overviewHandlerRef.current?.();
  }, []);

  const value = useMemo(
    () => ({
      subpageTitle,
      setSubpageTitle,
      registerOverviewHandler,
      goToOverview,
    }),
    [subpageTitle, registerOverviewHandler, goToOverview],
  );

  return (
    <ServicePageBreadcrumbContext.Provider value={value}>{children}</ServicePageBreadcrumbContext.Provider>
  );
}

export function useServicePageBreadcrumb() {
  const ctx = useContext(ServicePageBreadcrumbContext);
  if (!ctx) {
    throw new Error('useServicePageBreadcrumb must be used within ServicePageBreadcrumbProvider');
  }
  return ctx;
}
