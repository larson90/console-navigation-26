import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { CATEGORY_COLLAPSE_MS } from './categoryDnd';

export interface CategoryExpandSnapshot {
  platformCategories: string[];
  controlCategories: string[];
  megaservices: string[];
}

interface CategoryDragContextValue {
  isForceCollapsed: boolean;
  isDragging: boolean;
  canReorder: boolean;
  canReorderRef: React.RefObject<boolean>;
  beginDrag: () => void;
  endDrag: () => void;
}

const CategoryDragContext = createContext<CategoryDragContextValue | null>(null);

interface CategoryDragProviderProps {
  children: React.ReactNode;
  onSessionStart: () => CategoryExpandSnapshot;
  onSessionEnd: (snapshot: CategoryExpandSnapshot) => void;
}

const COLLAPSE_SETTLE_MS = CATEGORY_COLLAPSE_MS;

export function CategoryDragProvider({
  children,
  onSessionStart,
  onSessionEnd,
}: CategoryDragProviderProps) {
  const snapshotRef = useRef<CategoryExpandSnapshot | null>(null);
  const settleTimerRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const canReorderRef = useRef(true);
  const [isDragging, setIsDragging] = useState(false);
  const [canReorder, setCanReorder] = useState(true);

  const beginDrag = useCallback(() => {
    if (isDraggingRef.current) return;
    isDraggingRef.current = true;
    canReorderRef.current = false;
    snapshotRef.current = onSessionStart();
    setIsDragging(true);
    setCanReorder(false);

    if (settleTimerRef.current !== null) {
      window.clearTimeout(settleTimerRef.current);
    }

    settleTimerRef.current = window.setTimeout(() => {
      canReorderRef.current = true;
      setCanReorder(true);
      settleTimerRef.current = null;
    }, COLLAPSE_SETTLE_MS);
  }, [onSessionStart]);

  const endDrag = useCallback(() => {
    if (settleTimerRef.current !== null) {
      window.clearTimeout(settleTimerRef.current);
      settleTimerRef.current = null;
    }

    isDraggingRef.current = false;
    canReorderRef.current = true;
    setIsDragging(false);
    setCanReorder(true);
    if (snapshotRef.current) {
      onSessionEnd(snapshotRef.current);
      snapshotRef.current = null;
    }
  }, [onSessionEnd]);

  return (
    <CategoryDragContext.Provider
      value={{
        isForceCollapsed: isDragging,
        isDragging,
        canReorder,
        canReorderRef,
        beginDrag,
        endDrag,
      }}
    >
      {children}
    </CategoryDragContext.Provider>
  );
}

export function useCategoryDrag() {
  const context = useContext(CategoryDragContext);
  if (!context) {
    return {
      isForceCollapsed: false,
      isDragging: false,
      canReorder: true,
      canReorderRef: { current: true },
      beginDrag: () => {},
      endDrag: () => {},
    };
  }
  return context;
}
