import React, { useCallback, useRef } from 'react';
import { useNavigationMenuWidth } from '../context/NavigationMenuWidthContext';
import { AppTooltip } from './AppTooltip';

interface NavigationMenuMainPanelProps {
  children: React.ReactNode;
  className?: string;
}

export function NavigationMenuMainPanel({ children, className = '' }: NavigationMenuMainPanelProps) {
  const { mainWidth, setMainWidth, beginResize, endResize, isResizing } = useNavigationMenuWidth();
  const handleRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const startWidthRef = useRef(mainWidth);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      startXRef.current = event.clientX;
      startWidthRef.current = mainWidth;
      beginResize();
      handleRef.current?.setPointerCapture(event.pointerId);

      const handlePointerMove = (moveEvent: PointerEvent) => {
        const delta = moveEvent.clientX - startXRef.current;
        setMainWidth(startWidthRef.current + delta);
      };

      const handlePointerUp = (upEvent: PointerEvent) => {
        handleRef.current?.releasePointerCapture(upEvent.pointerId);
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
        endResize();
      };

      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    },
    [beginResize, endResize, mainWidth, setMainWidth],
  );

  return (
    <div
      className={`nav-menu-main-panel h-full relative shrink-0 ${className}`}
      style={{
        width: mainWidth,
        flex: '0 0 auto',
        transition: isResizing ? 'none' : 'width 0.2s ease',
      }}
    >
      <div className="nav-menu-main-panel__body h-full min-w-0">
        <div className="nav-menu-main-panel__scroll h-full min-w-0 overflow-y-auto">
          {children}
        </div>
        <AppTooltip label="Потяните, чтобы изменить ширину" side="left">
          <div
            ref={handleRef}
            role="separator"
            aria-orientation="vertical"
            aria-label="Изменить ширину меню"
            className={`nav-menu-resize-handle${isResizing ? ' nav-menu-resize-handle--active' : ''}`}
            onPointerDown={handlePointerDown}
          >
            <span className="nav-menu-resize-handle__line" aria-hidden="true" />
          </div>
        </AppTooltip>
      </div>
    </div>
  );
}
