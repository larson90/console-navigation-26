import React from 'react';
import svgPaths from '../../imports/MainMenuDesktop/svg-znqodigjzs';
import type { PlatformId } from '../data/platformCatalog';

/** Фон плиток платформ — как в макете Cloud.ru */
const PLATFORM_ICON_BG = '#787b8a';

const SHELL_PX = { sm: 24, md: 32, tile: 40 } as const;

function PlatformIconShell({
  size,
  children,
}: {
  size: keyof typeof SHELL_PX;
  children: React.ReactNode;
}) {
  const px = SHELL_PX[size];
  return (
    <div
      className="relative flex shrink-0 items-center justify-center rounded-[4px]"
      style={{ width: px, height: px, backgroundColor: PLATFORM_ICON_BG }}
    >
      {children}
    </div>
  );
}

function EvolutionGlyph({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 26.5 26.5" aria-hidden>
      <path
        clipRule="evenodd"
        d={svgPaths.p1c0bf500}
        fill="white"
        fillRule="evenodd"
        stroke="white"
        strokeWidth="2.5"
      />
    </svg>
  );
}

function AdvancedGlyph({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3.5L20 7.9V16.1L12 20.5L4 16.1V7.9L12 3.5Z"
        stroke="white"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M8.2 15.6L12 8.2L15.8 15.6M9.7 12.8H14.3"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16.6 9.2H18.2" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function VmwareGlyph({ className }: { className: string }) {
  return (
    <span
      className={`font-['SB_Sans_Interface:Semibold',sans-serif] lowercase text-white tracking-[0.02em] ${className}`}
    >
      vm
    </span>
  );
}

/** Партнёрский кабинет — портфель / бизнес */
function PartnerGlyph({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 7V5.5A2.5 2.5 0 0110.5 3h3A2.5 2.5 0 0116 5.5V7"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <rect x="5" y="7" width="14" height="11" rx="1.5" stroke="white" strokeWidth="1.4" />
      <path d="M5 11h14" stroke="white" strokeWidth="1.4" />
      <circle cx="12" cy="14.5" r="1.25" fill="white" />
    </svg>
  );
}

/** Маркетплейс — витрина / сетка приложений */
function MarketplaceGlyph({ className }: { className: string }) {
  return (
    <span className={`font-['SB_Sans_Interface:Semibold',sans-serif] uppercase text-white tracking-[0.02em] ${className}`}>
      mkp
    </span>
  );
}

const GLYPH_CLASS = {
  sm: { svg: 'size-[14px]', text: 'text-[9px]' },
  md: { svg: 'size-[20px]', text: 'text-[11px]' },
  tile: { svg: 'size-[22px]', text: 'text-[12px]' },
} as const;

function PlatformGlyph({ id, size }: { id: PlatformId; size: keyof typeof SHELL_PX }) {
  const c = GLYPH_CLASS[size];
  switch (id) {
    case 'evolution':
      return <EvolutionGlyph className={c.svg} />;
    case 'advanced':
      return <AdvancedGlyph className={c.svg} />;
    case 'vmware':
      return <VmwareGlyph className={c.text} />;
    case 'partner':
      return <PartnerGlyph className={c.svg} />;
    case 'marketplace':
      return <MarketplaceGlyph className={c.text} />;
    default:
      return <EvolutionGlyph className={c.svg} />;
  }
}

export function PlatformItemIcon({ id, size = 'md' }: { id: PlatformId; size?: 'sm' | 'md' }) {
  return (
    <PlatformIconShell size={size}>
      <PlatformGlyph id={id} size={size} />
    </PlatformIconShell>
  );
}

/** Плитка для сетки выбора — те же серые иконки, крупнее */
export function PlatformGridTile({ id }: { id: PlatformId }) {
  return (
    <PlatformIconShell size="tile">
      <PlatformGlyph id={id} size="tile" />
    </PlatformIconShell>
  );
}
