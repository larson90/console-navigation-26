import React from 'react';
import { NavCollapse } from './NavCollapse';
import { CategoryHeaderChevron } from './categoryBlockHeaderUi';
import { CategoryServicesSection } from './navigationServiceUi';

export interface MegaserviceBlockProps {
  id: string;
  title: string;
  icon: string;
  isExpanded: boolean;
  showMoreDetails: boolean;
  onToggle: (id: string) => void;
  onNavigate?: (id: string) => void;
  children: React.ReactNode;
}

function MegaserviceIcon({ icon }: { icon: string }) {
  return (
    <div className="relative shrink-0 size-[24px]">
      <div
        className="absolute bg-[#8b8e9b] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px]"
        style={{ maskImage: `url('${icon}')` }}
      />
    </div>
  );
}

export function MegaserviceBlock({
  id,
  title,
  icon,
  isExpanded,
  showMoreDetails,
  onToggle,
  onNavigate,
  children,
}: MegaserviceBlockProps) {
  const innerGapClass = isExpanded ? (showMoreDetails ? 'gap-[8px]' : 'gap-[4px]') : 'gap-0';

  const handleNavigate = () => {
    onNavigate?.(id);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(id);
  };

  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full">
      <div className="nav-megaservice bg-[rgba(238,239,243,0.5)] relative rounded-[4px] shrink-0 w-full">
        <div className={`nav-megaservice__inner flex flex-col p-[8px] ${innerGapClass}`}>
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
            <div
              role="link"
              tabIndex={0}
              onClick={handleNavigate}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleNavigate();
                }
              }}
              className="nav-interactive flex-[1_0_0] min-w-px cursor-pointer rounded-[4px]"
            >
              <div className="content-stretch flex items-center pl-[4px] relative size-full min-h-[28px]">
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0 flex-[1_0_0]">
                  <MegaserviceIcon icon={icon} />
                  <div className="flex flex-col justify-center not-italic overflow-hidden relative shrink-0 text-ellipsis whitespace-nowrap">
                    <p className="nav-megaservice-title font-semibold text-[14px] leading-[20px] tracking-[0.15px] text-[#41424e] overflow-hidden text-ellipsis">
                      {title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleToggle}
              aria-expanded={isExpanded}
              aria-label={isExpanded ? 'Свернуть мегасервис' : 'Развернуть мегасервис'}
              className="nav-interactive shrink-0 cursor-pointer rounded-[4px] border-0 bg-transparent p-0"
            >
              <CategoryHeaderChevron expanded={isExpanded} />
            </button>
          </div>
          <NavCollapse open={isExpanded}>
            <CategoryServicesSection showMoreDetails={showMoreDetails}>{children}</CategoryServicesSection>
          </NavCollapse>
        </div>
      </div>
    </div>
  );
}
