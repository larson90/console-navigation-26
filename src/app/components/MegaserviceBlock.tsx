import React from 'react';
import { NavCollapse } from './NavCollapse';
import { CategoryHeaderChevron, ClickableTitleChevron } from './categoryBlockHeaderUi';
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

  const handleToggle = () => {
    onToggle(id);
  };

  const handleNavigate = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate?.(id);
  };

  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full">
      <div className="nav-megaservice bg-[rgba(238,239,243,0.5)] relative rounded-[4px] shrink-0 w-full">
        <div className={`nav-megaservice__inner flex flex-col p-[8px] ${innerGapClass}`}>
          <div
            role="button"
            tabIndex={0}
            onClick={handleToggle}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleToggle();
              }
            }}
            aria-expanded={isExpanded}
            className="nav-megaservice__header nav-interactive content-stretch flex gap-[8px] items-center relative shrink-0 w-full cursor-pointer rounded-[4px]"
          >
            <div className="nav-megaservice__row-main content-stretch flex gap-[8px] items-center relative flex-[1_0_0] min-w-px min-h-[28px] pl-[4px]">
              <MegaserviceIcon icon={icon} />
              <span
                role="link"
                tabIndex={0}
                onClick={handleNavigate}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    onNavigate?.(id);
                  }
                }}
                className="nav-megaservice__title-hit content-stretch flex gap-[4px] items-center relative min-w-0"
              >
                <span className="nav-megaservice-title font-semibold text-[14px] leading-[20px] tracking-[0.15px] text-[#41424e] overflow-hidden text-ellipsis whitespace-nowrap">
                  {title}
                </span>
                <ClickableTitleChevron />
              </span>
            </div>
            <CategoryHeaderChevron expanded={isExpanded} />
          </div>
          <NavCollapse open={isExpanded}>
            {isExpanded ? (
              <CategoryServicesSection showMoreDetails={showMoreDetails}>{children}</CategoryServicesSection>
            ) : null}
          </NavCollapse>
        </div>
      </div>
    </div>
  );
}
