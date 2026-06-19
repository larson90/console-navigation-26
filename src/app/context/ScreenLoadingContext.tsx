import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

interface ScreenLoadingContextValue {
  startScreenLoading: (durationMs?: number, onComplete?: () => void) => void;
}

const ScreenLoadingContext = createContext<ScreenLoadingContextValue | null>(null);

const DEFAULT_DURATION_MS = 700;
const FADE_OUT_MS = 180;

export function ScreenLoadingProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const hideTimerRef = useRef<number | null>(null);
  const clearTimerRef = useRef<number | null>(null);
  const onCompleteRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
      if (clearTimerRef.current) window.clearTimeout(clearTimerRef.current);
      onCompleteRef.current = null;
    };
  }, []);

  const startScreenLoading = useCallback((durationMs = DEFAULT_DURATION_MS, onComplete?: () => void) => {
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    if (clearTimerRef.current) window.clearTimeout(clearTimerRef.current);

    onCompleteRef.current = onComplete ?? null;

    setActive(true);
    window.requestAnimationFrame(() => setVisible(true));

    hideTimerRef.current = window.setTimeout(() => {
      setVisible(false);
      clearTimerRef.current = window.setTimeout(() => {
        setActive(false);
        onCompleteRef.current?.();
        onCompleteRef.current = null;
      }, FADE_OUT_MS);
    }, durationMs);
  }, []);

  const value = useMemo(() => ({ startScreenLoading }), [startScreenLoading]);

  return (
    <ScreenLoadingContext.Provider value={value}>
      {children}
      {active && (
        <div
          className={`screen-loading${visible ? ' screen-loading--visible' : ''}`}
          role="status"
          aria-live="polite"
          aria-busy="true"
          aria-label="Загрузка"
        >
          <div className="screen-loading__spinner" aria-hidden="true" />
        </div>
      )}
    </ScreenLoadingContext.Provider>
  );
}

export function useScreenLoading() {
  const ctx = useContext(ScreenLoadingContext);
  if (!ctx) {
    throw new Error('useScreenLoading must be used within ScreenLoadingProvider');
  }
  return ctx;
}
