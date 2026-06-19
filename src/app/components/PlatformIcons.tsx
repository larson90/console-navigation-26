import React from 'react';
import svgPaths from '../../imports/MainMenuDesktop/svg-znqodigjzs';
import type { PlatformId } from '../data/platformCatalog';
import { MarketplaceServicesIcon } from './MarketplaceServicesIcon';

/** Фон плиток платформ — приглушённые акценты (~58% к #eef0f5) */
const PLATFORM_ICON_BG = '#bcbfc8';

/** Подложка Evolution — как у иконки проекта на главном экране (.proj-head__icon) */
const PLATFORM_ICON_BG_EVOLUTION = '#dde0ea';

const PLATFORM_ICON_BG_BY_ID: Partial<Record<PlatformId, string>> = {
  evolution: PLATFORM_ICON_BG_EVOLUTION,
  advanced: '#cae6dc',
  vmware: '#aabff5',
  marketplace: '#c4b2ef',
};

const PLATFORM_ICON_FG = '#41424e';

const SHELL_PX = { sm: 24, md: 32, tile: 40 } as const;

function platformIconBackground(id: PlatformId): string {
  return PLATFORM_ICON_BG_BY_ID[id] ?? PLATFORM_ICON_BG;
}

function platformIconForeground(_id: PlatformId): string {
  return PLATFORM_ICON_FG;
}

function PlatformIconShell({
  size,
  platformId,
  children,
}: {
  size: keyof typeof SHELL_PX;
  platformId: PlatformId;
  children: React.ReactNode;
}) {
  const px = SHELL_PX[size];
  const foreground = platformIconForeground(platformId);
  return (
    <div
      className="relative flex shrink-0 items-center justify-center rounded-[4px]"
      style={{
        width: px,
        height: px,
        backgroundColor: platformIconBackground(platformId),
        color: foreground,
      }}
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
        fill="currentColor"
        fillRule="evenodd"
        stroke="currentColor"
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
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M8.2 15.6L12 8.2L15.8 15.6M9.7 12.8H14.3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16.6 9.2H18.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function VmwareGlyph({ className }: { className: string }) {
  return (
    <span
      className={`font-['SB_Sans_Interface:Semibold',sans-serif] lowercase text-current tracking-[0.02em] ${className}`}
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
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <rect x="5" y="7" width="14" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 11h14" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="14.5" r="1.25" fill="currentColor" />
    </svg>
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
      return <MarketplaceServicesIcon className={c.svg} />;
    default:
      return <EvolutionGlyph className={c.svg} />;
  }
}

export function PlatformItemIcon({ id, size = 'md' }: { id: PlatformId; size?: 'sm' | 'md' }) {
  return (
    <PlatformIconShell size={size} platformId={id}>
      <PlatformGlyph id={id} size={size} />
    </PlatformIconShell>
  );
}

/** Плитка для сетки выбора — те же серые иконки, крупнее */
export function PlatformGridTile({ id }: { id: PlatformId }) {
  return (
    <PlatformIconShell size="tile" platformId={id}>
      <PlatformGlyph id={id} size="tile" />
    </PlatformIconShell>
  );
}
