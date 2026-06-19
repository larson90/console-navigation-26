import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

interface UserActionToastContextValue {
  showUserAction: (message: string) => void;
}

const UserActionToastContext = createContext<UserActionToastContextValue | null>(null);

const AUTO_HIDE_MS = 2500;
const FADE_OUT_MS = 200;

export function UserActionToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const hideTimerRef = useRef<number | null>(null);
  const clearTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
      if (clearTimerRef.current) window.clearTimeout(clearTimerRef.current);
    };
  }, []);

  const showUserAction = useCallback((nextMessage: string) => {
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    if (clearTimerRef.current) window.clearTimeout(clearTimerRef.current);

    setMessage(nextMessage);
    setVisible(true);

    hideTimerRef.current = window.setTimeout(() => {
      setVisible(false);
      clearTimerRef.current = window.setTimeout(() => setMessage(null), FADE_OUT_MS);
    }, AUTO_HIDE_MS);
  }, []);

  const value = useMemo(() => ({ showUserAction }), [showUserAction]);

  return (
    <UserActionToastContext.Provider value={value}>
      {children}
      {message && (
        <div
          className={`user-action-toast${visible ? ' user-action-toast--visible' : ''}`}
          role="status"
          aria-live="polite"
        >
          {message}
        </div>
      )}
    </UserActionToastContext.Provider>
  );
}

export function useUserActionToast() {
  const ctx = useContext(UserActionToastContext);
  if (!ctx) {
    throw new Error('useUserActionToast must be used within UserActionToastProvider');
  }
  return ctx;
}
