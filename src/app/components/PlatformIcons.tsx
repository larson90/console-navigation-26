import React from 'react';
import svgPaths from '../../imports/MainMenuDesktop/svg-znqodigjzs';
import type { PlatformId } from '../data/platformCatalog';

const SIZE_CLASS = { sm: 'size-[24px]', md: 'size-[32px]' } as const;

function iconShell(size: 'sm' | 'md', children: React.ReactNode) {
  return (
    <div className={`bg-[#787b8a] relative rounded-[4px] shrink-0 ${SIZE_CLASS[size]} flex items-center justify-center`}>
      {children}
    </div>
  );
}

function EvolutionIcon({ size }: { size: 'sm' | 'md' }) {
  if (size === 'sm') {
    return iconShell(
      'sm',
      <svg className="size-[14px]" fill="none" viewBox="0 0 26.5 26.5">
        <path
          clipRule="evenodd"
          d={svgPaths.p1c0bf500}
          fill="white"
          fillRule="evenodd"
          stroke="white"
          strokeWidth="2.5"
        />
      </svg>,
    );
  }

  return (
    <div className="bg-[#787b8a] relative rounded-[4px] shrink-0 size-[32px]">
      <div className="absolute inset-0 overflow-clip">
        <div className="absolute inset-[12.5%]">
          <div className="absolute inset-[-5.21%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.5 26.5">
              <path
                clipRule="evenodd"
                d={svgPaths.p1c0bf500}
                fill="white"
                fillRule="evenodd"
                stroke="white"
                strokeWidth="2.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdvancedIcon({ size }: { size: 'sm' | 'md' }) {
  return iconShell(
    size,
    <svg className={size === 'sm' ? 'size-[14px]' : 'size-[20px]'} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 8V16M8 10L16 14M16 10L8 14" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
    </svg>,
  );
}

function VmwareIcon({ size }: { size: 'sm' | 'md' }) {
  return iconShell(
    size,
    <span className="font-['SB_Sans_Interface:Semibold',sans-serif] text-[9px] text-white tracking-[0.05px]">
      vm
    </span>,
  );
}

function InitialsIcon({ label, size }: { label: string; size: 'sm' | 'md' }) {
  return iconShell(
    size,
    <span className="font-['SB_Sans_Interface:Semibold',sans-serif] text-[9px] text-white tracking-[0.05px]">
      {label}
    </span>,
  );
}

export function PlatformItemIcon({ id, size = 'md' }: { id: PlatformId; size?: 'sm' | 'md' }) {
  switch (id) {
    case 'evolution':
      return <EvolutionIcon size={size} />;
    case 'advanced':
      return <AdvancedIcon size={size} />;
    case 'vmware':
      return <VmwareIcon size={size} />;
    case 'partner':
      return <InitialsIcon label="ПК" size={size} />;
    case 'marketplace':
      return <InitialsIcon label="МА" size={size} />;
    default:
      return <EvolutionIcon size={size} />;
  }
}
