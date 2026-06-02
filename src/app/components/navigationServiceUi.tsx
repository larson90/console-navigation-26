import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDrag } from 'react-dnd';
import { getServiceDescription, type ServiceCard } from '../data/serviceCatalog';
import {
  filterSubservicesForSearch,
  matchesSearchQuery,
  type ServiceHierarchyNode,
} from '../data/serviceHierarchy';

export function ServiceItemsContainer({
  showMoreDetails,
  className = '',
  children,
}: {
  showMoreDetails: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={
        showMoreDetails
          ? `grid grid-cols-2 gap-[8px] items-start relative shrink-0 w-full ${className}`
          : `content-start flex flex-wrap gap-0 items-start relative shrink-0 w-full ${className}`
      }
    >
      {children}
    </div>
  );
}

export function ServiceItemWrapper({
  showMoreDetails,
  children,
}: {
  showMoreDetails: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={showMoreDetails ? 'relative min-w-0' : 'flex-[1_0_0] max-w-[286.5px] min-w-[200px] relative'}>
      {children}
    </div>
  );
}

export function ServiceIcon({ icon, size = 24 }: { icon: string; size?: number }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div
        className="absolute bg-[#8b8e9b] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px]"
        style={{ maskImage: `url('${icon}')`, maskSize: `${size}px ${size}px` }}
      />
    </div>
  );
}

export function ServiceDescriptionTooltip({
  description,
  top,
  left,
  arrowLeft,
}: {
  description: string;
  top: number;
  left: number;
  arrowLeft: number;
}) {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="fixed z-[9999] w-[min(240px,calc(100vw-32px))] bg-[#41424e] text-white text-[12px] leading-[16px] rounded-[6px] px-[10px] py-[8px] shadow-[0px_4px_12px_rgba(0,0,0,0.15)] pointer-events-none"
      style={{ top, left, transform: 'translateY(-100%)' }}
    >
      <p className="line-clamp-4">{description}</p>
      <div
        className="absolute top-full w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-[#41424e]"
        style={{ left: arrowLeft, transform: 'translateX(-50%)' }}
      />
    </div>,
    document.body,
  );
}

export interface ServiceCardItemProps {
  service: ServiceCard;
  onAddToFavorites: (id: string) => void;
  isFavorite: boolean;
  showMoreDetails?: boolean;
}

function ServiceCardTitle({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle: string;
  className: string;
}) {
  if (!subtitle) {
    return <p className={className}>{title}</p>;
  }

  return (
    <p className={className}>
      {title}{' '}
      <span className="text-[#aaaebd]">{subtitle}</span>
    </p>
  );
}

export function ServiceCardItem({
  service,
  onAddToFavorites,
  isFavorite,
  showMoreDetails = false,
}: ServiceCardItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const infoIconRef = useRef<HTMLDivElement | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0, arrowLeft: 0 });
  const description = getServiceDescription(service.id, service.title);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'SERVICE_CARD',
    item: { id: service.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const updateTooltipPosition = () => {
    const anchor = infoIconRef.current ?? cardRef.current;
    if (!anchor) return;

    const rect = anchor.getBoundingClientRect();
    const tooltipWidth = Math.min(240, window.innerWidth - 32);
    const anchorCenterX = rect.left + rect.width / 2;
    const left = Math.max(
      16,
      Math.min(anchorCenterX - tooltipWidth / 2, window.innerWidth - tooltipWidth - 16),
    );
    const top = Math.max(8, rect.top - 8);
    const arrowLeft = Math.max(12, Math.min(anchorCenterX - left, tooltipWidth - 12));

    setTooltipPosition({ top, left, arrowLeft });
  };

  useEffect(() => {
    if (!showTooltip) return;

    updateTooltipPosition();
    window.addEventListener('scroll', updateTooltipPosition, true);
    window.addEventListener('resize', updateTooltipPosition);

    return () => {
      window.removeEventListener('scroll', updateTooltipPosition, true);
      window.removeEventListener('resize', updateTooltipPosition);
    };
  }, [showTooltip]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowTooltip(false);
  };

  const handleInfoMouseEnter = () => {
    updateTooltipPosition();
    setShowTooltip(true);
  };

  const handleInfoMouseLeave = () => {
    setShowTooltip(false);
  };

  const favoriteButton = (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onAddToFavorites(service.id);
      }}
      className="content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px] hover:bg-[rgba(0,0,0,0.05)]"
    >
      <div className="relative shrink-0 size-[24px]">
        <svg className="absolute inset-0 size-full" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
            fill={isFavorite ? '#fbbf24' : 'none'}
            stroke={isFavorite ? '#fbbf24' : '#8b8e9b'}
            strokeWidth="2"
          />
        </svg>
      </div>
    </button>
  );

  const setCompactCardRef = (node: HTMLDivElement | null) => {
    cardRef.current = node;
    drag(node);
  };

  if (showMoreDetails) {
    return (
      <div
        ref={drag}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative h-full cursor-move ${isDragging ? 'opacity-50' : ''}`}
      >
        <div className="bg-[#fdfdfd] border border-[#e6e8ef] content-stretch flex flex-col gap-[8px] h-full min-h-[96px] p-[12px] relative rounded-[6px] hover:shadow-[0px_2px_8px_rgba(0,0,0,0.06)] transition-shadow">
          <div className="content-stretch flex gap-[10px] items-start relative flex-[1_0_0]">
            <ServiceIcon icon={service.icon} size={28} />
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative">
              <ServiceCardTitle
                title={service.title}
                subtitle={service.subtitle}
                className="font-['SB_Sans_Interface:Semibold',sans-serif] leading-[18px] not-italic text-[#41424e] text-[13px] tracking-[0.1px] w-full"
              />
              <p className="font-['SB_Sans_Interface:Regular',sans-serif] leading-[16px] not-italic text-[#8b8e9b] text-[12px] tracking-[0.1px] w-full line-clamp-3">
                {description}
              </p>
            </div>
          </div>
          {isHovered && <div className="absolute top-[8px] right-[8px]">{favoriteButton}</div>}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setCompactCardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`min-h-[32px] relative rounded-[4px] cursor-move hover:bg-[rgba(0,0,0,0.02)] ${isDragging ? 'opacity-50' : ''}`}
    >
      {showTooltip && (
        <ServiceDescriptionTooltip
          description={description}
          top={tooltipPosition.top}
          left={tooltipPosition.left}
          arrowLeft={tooltipPosition.arrowLeft}
        />
      )}
      <div className="flex flex-row items-center min-h-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center min-h-[inherit] p-[4px] relative size-full">
          <ServiceIcon icon={service.icon} size={24} />
          <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative">
            <ServiceCardTitle
              title={service.title}
              subtitle={service.subtitle}
              className="font-['SB_Sans_Interface:Regular',sans-serif] leading-[16px] not-italic overflow-hidden relative shrink-0 text-[#41424e] text-[13px] text-ellipsis tracking-[0.1px] whitespace-nowrap w-full"
            />
          </div>
          {isHovered && (
            <>
              <div
                className="relative shrink-0"
                ref={infoIconRef}
                onMouseEnter={handleInfoMouseEnter}
                onMouseLeave={handleInfoMouseLeave}
              >
                <div className="content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]">
                  <div className="relative shrink-0 size-[24px]">
                    <svg className="absolute inset-0 size-full" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="#8b8e9b" strokeWidth="2" fill="none" />
                      <path d="M12 16V12M12 8H12.01" stroke="#8b8e9b" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>
              {favoriteButton}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function SubserviceBranchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" className={className} aria-hidden>
      <path
        d="M2 2V7C2 7.55228 2.44772 8 3 8H8"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 6.5L8.5 8.5M8.5 8.5L6.5 10.5"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SubserviceRow({
  subservice,
  parentTitle,
}: {
  subservice: ServiceHierarchyNode;
  parentTitle: string;
}) {
  return (
    <div className="content-stretch flex items-center gap-[6px] min-h-[28px] ml-[12px] pl-[6px] pr-[8px] py-[4px] relative shrink-0 w-[calc(100%-12px)]">
      <SubserviceBranchIcon className="shrink-0 size-[12px] text-[#aaaebd]" />
      <span className="shrink-0 font-['SB_Sans_Interface:Regular',sans-serif] text-[11px] leading-[14px] text-[#8b8e9b] tracking-[0.1px]">
        {parentTitle}
      </span>
      <svg viewBox="0 0 8 8" fill="none" className="shrink-0 size-[8px] text-[#aaaebd]" aria-hidden>
        <path d="M2 4H6M6 4L4.5 2.5M6 4L4.5 5.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className="min-w-0 font-['SB_Sans_Interface:Semibold',sans-serif] leading-[16px] text-[#41424e] text-[13px] tracking-[0.1px] truncate">
        {subservice.title}
      </p>
    </div>
  );
}

export function ServiceWithSubservices({
  service,
  searchQuery = '',
  showMoreDetails,
  onAddToFavorites,
  isFavorite,
}: {
  service: ServiceCard;
  searchQuery?: string;
  showMoreDetails: boolean;
  onAddToFavorites: (id: string) => void;
  isFavorite: boolean;
}) {
  const subservices = filterSubservicesForSearch(service.id, searchQuery);
  const showSubservices =
    subservices.length > 0 &&
    (!searchQuery.trim() ||
      matchesSearchQuery(service.title, searchQuery) ||
      matchesSearchQuery(service.subtitle, searchQuery) ||
      subservices.some((sub) => matchesSearchQuery(sub.title, searchQuery)));

  return (
    <div
      className={
        showMoreDetails
          ? 'col-span-2 relative min-w-0 w-full'
          : 'flex-[1_0_0] max-w-[286.5px] min-w-[200px] relative w-full'
      }
    >
      <ServiceCardItem
        service={service}
        onAddToFavorites={onAddToFavorites}
        isFavorite={isFavorite}
        showMoreDetails={showMoreDetails}
      />
      {showSubservices && (
        <div className="content-stretch flex flex-col gap-[4px] items-start mt-[4px] relative shrink-0 w-full">
          {subservices.map((sub) => (
            <SubserviceRow key={sub.id} subservice={sub} parentTitle={service.title} />
          ))}
        </div>
      )}
    </div>
  );
}
