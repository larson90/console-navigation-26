import React from 'react';

const TAB_ICON_INSET = 1.2;
const TAB_ICON_SIZE = 3.2;
const TAB_ICON_SPAN = 9.6;

/** Иконка «4 кубика» 12×12 для вкладки «Сервисы» */
export function NavTabServicesGridIcon({ className = 'size-full' }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" className={className} aria-hidden>
      <rect x={TAB_ICON_INSET} y={TAB_ICON_INSET} width={TAB_ICON_SIZE} height={TAB_ICON_SIZE} rx="0.6" stroke="currentColor" strokeWidth="1" />
      <rect x={7.6} y={TAB_ICON_INSET} width={TAB_ICON_SIZE} height={TAB_ICON_SIZE} rx="0.6" stroke="currentColor" strokeWidth="1" />
      <rect x={TAB_ICON_INSET} y={7.6} width={TAB_ICON_SIZE} height={TAB_ICON_SIZE} rx="0.6" stroke="currentColor" strokeWidth="1" />
      <rect x={7.6} y={7.6} width={TAB_ICON_SIZE} height={TAB_ICON_SIZE} rx="0.6" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/** Панель управления — слайдеры для вкладки «Центр управления» */
export function NavTabControlCenterIcon({ className = 'size-full' }: { className?: string }) {
  const lineStart = TAB_ICON_INSET;
  const lineEnd = TAB_ICON_INSET + TAB_ICON_SPAN;

  return (
    <svg viewBox="0 0 12 12" fill="none" className={className} aria-hidden>
      <path d={`M${lineStart} 3.2H${lineEnd}M${lineStart} 6H${lineEnd}M${lineStart} 8.8H${lineEnd}`} stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <circle cx="4.4" cy="3.2" r="1" stroke="currentColor" strokeWidth="1" />
      <circle cx="8" cy="6" r="1" stroke="currentColor" strokeWidth="1" />
      <circle cx="5.6" cy="8.8" r="1" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/** Стопка слоёв — готовые решения, без ассоциации с ИИ */
export function NavTabSolutionsIcon({ className = 'size-full' }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" className={className} aria-hidden>
      <rect
        x={TAB_ICON_INSET}
        y={6}
        width={TAB_ICON_SPAN}
        height={3.6}
        rx="0.6"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <rect
        x={TAB_ICON_INSET}
        y={2.4}
        width={TAB_ICON_SPAN}
        height={3.6}
        rx="0.6"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}
