import React, { useEffect, useRef } from 'react';

export function NavigationMenuSearchInput({
  value,
  onChange,
  searchIconMask,
}: {
  value: string;
  onChange: (value: string) => void;
  searchIconMask: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="nav-menu-search-input bg-[#fdfdfd] content-stretch flex flex-col items-start justify-center px-[10px] py-[8px] relative rounded-[4px] shrink-0 w-full">
      <div
        aria-hidden="true"
        className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[4px]"
      />
      <div className="relative shrink-0 w-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
          <div className="relative shrink-0 size-[24px]">
            <div
              className="absolute bg-[#8b8e9b] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px]"
              style={{ maskImage: `url('${searchIconMask}')` }}
            />
          </div>
          <div className="content-stretch flex flex-[1_0_0] items-start min-w-px overflow-clip relative">
            <input
              ref={inputRef}
              type="search"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              placeholder="Поиск по категориям, сервисам и подсервисам"
              aria-label="Поиск по категориям, сервисам и подсервисам"
              className="flex-[1_0_0] font-['SB_Sans_Interface:Regular',sans-serif] leading-[20px] min-w-px not-italic overflow-hidden relative text-[#41424e] text-[14px] text-ellipsis tracking-[0.1px] whitespace-nowrap bg-transparent border-none outline-none placeholder:text-[#aaaebd]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
