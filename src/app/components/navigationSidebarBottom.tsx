import React from 'react';
import { imgIconColor3, imgIconColor4 } from '../../imports/MainMenuDesktop/svg-3dkbq';
import { useNavigateToMarketplace } from '../hooks/useNavigateToMarketplace';
import { MarketplaceServicesIcon } from './MarketplaceServicesIcon';

function SidebarMaskIcon({ src }: { src: string }) {
  return (
    <div className="relative shrink-0 size-[24px]">
      <div
        className="absolute bg-[#8b8e9b] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px]"
        style={{ maskImage: `url('${src}')` }}
      />
    </div>
  );
}

function SidebarBottomItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  const className = 'nav-sidebar-link max-w-[286.5px] min-w-[200px] relative shrink-0 w-full rounded-[4px]';

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`${className} border-0 bg-transparent p-0 text-left cursor-pointer`}>
        <div className="flex flex-row items-center max-w-[inherit] min-w-[inherit] size-full">
          <div className="content-stretch flex gap-[8px] items-center max-w-[inherit] min-w-[inherit] p-[4px] relative size-full">
            {icon}
            <p className="font-['SB_Sans_Interface:Regular',sans-serif] leading-[16px] not-italic overflow-hidden relative shrink-0 text-[#41424e] text-[13px] text-ellipsis tracking-[0.1px] whitespace-nowrap">
              {label}
            </p>
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className={className}>
      <div className="flex flex-row items-center max-w-[inherit] min-w-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center max-w-[inherit] min-w-[inherit] p-[4px] relative size-full">
          {icon}
          <p className="font-['SB_Sans_Interface:Regular',sans-serif] leading-[16px] not-italic overflow-hidden relative shrink-0 text-[#41424e] text-[13px] text-ellipsis tracking-[0.1px] whitespace-nowrap">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

export function NavigationSidebarBottomMenu({ showMarketplace = false }: { showMarketplace?: boolean }) {
  const navigateToMarketplace = useNavigateToMarketplace();

  return (
    <div className="content-stretch flex flex-col items-start min-h-[32px] overflow-clip relative rounded-[4px] shrink-0 w-full z-[1]">
      {showMarketplace && (
        <SidebarBottomItem
          icon={<MarketplaceServicesIcon className="size-[24px] shrink-0 text-[#8b8e9b]" />}
          label="Маркетплейс"
          onClick={navigateToMarketplace}
        />
      )}
      <SidebarBottomItem icon={<SidebarMaskIcon src={imgIconColor3} />} label="Поддержка" />
      <SidebarBottomItem icon={<SidebarMaskIcon src={imgIconColor4} />} label="Документация" />
    </div>
  );
}
