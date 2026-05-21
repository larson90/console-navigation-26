import React from 'react';

interface MiniPromoBannerProps {
  title: string;
  badge?: string;
  illustration: React.ReactNode;
}

export function MiniPromoBanner({ title, badge, illustration }: MiniPromoBannerProps) {
  return (
    <div className="relative flex-1 min-w-0 min-h-[48px] rounded-[8px] border border-[#dde0ea] bg-[#fdfdfd] overflow-hidden">
      <div className="relative z-[1] flex min-h-[48px] w-full items-center py-[8px] pl-[10px] pr-[52px]">
        <p className="font-['SB_Sans_Interface:Medium',sans-serif] text-[12px] font-medium leading-[16px] text-[#41424e] tracking-[0.1px]">
          {title}
        </p>
      </div>
      {badge && (
        <span className="absolute top-[8px] right-[8px] z-[2] rounded-[4px] bg-[#389f74] px-[4px] py-[1px] font-['SB_Sans_Interface:Semibold',sans-serif] text-[10px] leading-[13px] text-[#fbfffc]">
          {badge}
        </span>
      )}
      <div className="pointer-events-none absolute bottom-0 right-0 flex items-end justify-end opacity-[0.7]">
        {illustration}
      </div>
    </div>
  );
}

function ReferralIllustration() {
  return (
    <svg width="64" height="44" viewBox="0 0 72 52" fill="none" aria-hidden>
      <rect x="10" y="30" width="9" height="14" rx="2" fill="#dde0ea" />
      <rect x="22" y="22" width="9" height="22" rx="2" fill="#99d7ba" />
      <rect x="34" y="26" width="9" height="18" rx="2" fill="#8b8e9b" />
      <rect x="46" y="18" width="9" height="26" rx="2" fill="#389f74" />
      <rect x="58" y="24" width="9" height="20" rx="2" fill="#c8e8d8" />
    </svg>
  );
}

function MarketplaceIllustration() {
  return (
    <svg width="64" height="44" viewBox="0 0 72 52" fill="none" aria-hidden>
      <rect x="12" y="16" width="20" height="14" rx="3" fill="#dde0ea" />
      <rect x="36" y="24" width="18" height="12" rx="3" fill="#99d7ba" />
      <circle cx="52" cy="20" r="7" fill="#389f74" />
      <rect x="16" y="34" width="14" height="9" rx="2" fill="#8b8e9b" />
      <rect x="44" y="14" width="10" height="10" rx="2" fill="#c8e8d8" />
    </svg>
  );
}

export function NavigationMiniBanners() {
  return (
    <div className="flex w-full items-stretch gap-[8px]">
      <MiniPromoBanner
        title="Реферальная программа"
        badge="15%"
        illustration={<ReferralIllustration />}
      />
      <MiniPromoBanner
        title="Маркетплейс"
        badge="120+"
        illustration={<MarketplaceIllustration />}
      />
    </div>
  );
}
