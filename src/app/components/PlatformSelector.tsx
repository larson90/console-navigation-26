import React, { useEffect, useRef, useState } from 'react';
import { imgIconColor } from '../../imports/MainMenuDesktop/svg-3dkbq';
import { PLATFORMS, type PlatformId, type PlatformOption } from '../data/platformCatalog';
import { PlatformItemIcon } from './PlatformIcons';

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <div
      className="relative shrink-0 size-[24px] transition-transform duration-200"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <div
        className="absolute bg-[#8b8e9b] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px]"
        style={{ maskImage: `url('${imgIconColor}')` }}
      />
    </div>
  );
}

export function PlatformSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<PlatformId>('evolution');
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = PLATFORMS.find((p) => p.id === selectedId) ?? PLATFORMS[0];
  const cloudPlatforms = PLATFORMS.filter((p) => p.section === 'cloud');
  const otherProducts = PLATFORMS.filter((p) => p.section === 'other');

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [isOpen]);

  const renderOption = (platform: PlatformOption) => {
    const isSelected = platform.id === selectedId;

    return (
      <button
        key={platform.id}
        type="button"
        onClick={() => {
          setSelectedId(platform.id);
          setIsOpen(false);
        }}
        className={`relative flex w-full gap-[8px] items-center px-[12px] py-[8px] text-left rounded-[2px] hover:bg-[rgba(0,0,0,0.03)] ${
          isSelected ? 'bg-[rgba(153,215,186,0.2)]' : ''
        }`}
      >
        {isSelected && (
          <div className="absolute left-0 top-[6px] bottom-[6px] w-[3px] rounded-r-[2px] bg-[#389f74]" />
        )}
        <PlatformItemIcon id={platform.id} />
        <span className="font-['SB_Sans_Interface:Semibold',sans-serif] leading-[20px] text-[#41424e] text-[14px] tracking-[0.15px]">
          {platform.title}
        </span>
      </button>
    );
  };

  return (
    <div ref={rootRef} className="relative shrink-0 w-full z-20">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className={`bg-[#fdfdfd] h-[56px] relative rounded-[4px] shrink-0 w-full text-left ${
          isOpen ? 'ring-1 ring-[#99d7ba]' : ''
        }`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[8px] items-center px-[12px] py-px relative size-full w-full">
            <div className="flex-[1_0_0] min-w-px relative">
              <div className="content-stretch flex gap-[8px] items-center relative size-full">
                <PlatformItemIcon id={selectedId} />
                <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px not-italic relative">
                  <p className="font-['SB_Sans_Interface:Regular',sans-serif] leading-[16px] relative shrink-0 text-[#8b8e9b] text-[11px] tracking-[0.1px] w-full">
                    Облачные платформы
                  </p>
                  <p className="font-['SB_Sans_Interface:Semibold',sans-serif] leading-[20px] overflow-hidden relative shrink-0 text-[#41424e] text-[14px] text-ellipsis tracking-[0.15px] w-full whitespace-nowrap">
                    {selected.title}
                  </p>
                </div>
              </div>
            </div>
            <div className="ml-auto shrink-0 self-center">
              <ChevronIcon open={isOpen} />
            </div>
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 bg-[#fdfdfd] rounded-[4px] shadow-[0px_4px_16px_rgba(0,0,0,0.12)] overflow-hidden">
          <div className="px-[12px] pt-[10px] pb-[4px]">
            <p className="font-['SB_Sans_Interface:Regular',sans-serif] leading-[16px] text-[#8b8e9b] text-[11px] tracking-[0.1px]">
              Облачные платформы
            </p>
          </div>
          <div role="listbox">{cloudPlatforms.map(renderOption)}</div>
          <div className="px-[12px] pt-[8px] pb-[4px]">
            <p className="font-['SB_Sans_Interface:Regular',sans-serif] leading-[16px] text-[#8b8e9b] text-[11px] tracking-[0.1px]">
              Другие продукты
            </p>
          </div>
          <div role="listbox">{otherProducts.map(renderOption)}</div>
          <div className="h-[4px]" />
        </div>
      )}
    </div>
  );
}
