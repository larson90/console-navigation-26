import React, { useCallback, useEffect } from 'react';
import { NavigationOverlayContext } from '../context/NavigationOverlayContext';
import { useNavigationPrototype } from '../context/NavigationPrototypeContext';
import type { NavigationPrototypeId } from '../navigationPrototype';

interface NavigationPrototypeOverlayProps {
  prototypeId: NavigationPrototypeId;
  children: React.ReactNode;
}

export function NavigationPrototypeOverlay({ prototypeId, children }: NavigationPrototypeOverlayProps) {
  const { closeMenu } = useNavigationPrototype();

  const close = useCallback(() => {
    closeMenu();
  }, [closeMenu]);

  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  return (
    <NavigationOverlayContext.Provider value={close}>
      <div
        className="nav-proto-overlay"
        role="dialog"
        aria-modal="true"
        aria-label={`Прототип навигации ${prototypeId}`}
      >
        <div className="nav-proto-overlay__panel">{children}</div>
      </div>
    </NavigationOverlayContext.Provider>
  );
}
