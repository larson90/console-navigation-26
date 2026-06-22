import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDrag } from 'react-dnd';
import { useNavigate } from 'react-router';
import { getServiceDescription, isAllScopeServiceCard, type ServiceCard } from '../data/serviceCatalog';
import {
  getVisibleSubservices,
  normalizeSearchQuery,
  type ServiceHierarchyNode,
} from '../data/serviceHierarchy';
import { useNavigationMenuWidth } from '../context/NavigationMenuWidthContext';
import { useNavigationPrototype } from '../context/NavigationPrototypeContext';
import { buildServiceNavState, buildServicePath } from '../navigation/serviceNavigation';

export function ServiceItemsContainer({
  showMoreDetails,
  className = '',
  children,
}: {
  showMoreDetails: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const { serviceColumns } = useNavigationMenuWidth();

  return (
    <div
      className={`nav-service-items-grid w-full ${className}`}
      data-density={showMoreDetails ? 'detailed' : 'compact'}
      style={{ '--nav-service-cols': serviceColumns } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

export function ServiceItemWrapper({
  children,
}: {
  showMoreDetails?: boolean;
  children: React.ReactNode;
}) {
  return <div className="nav-service-item min-w-0 w-full">{children}</div>;
}

export function CategoryServicesSection({
  showMoreDetails,
  className = '',
  children,
}: {
  showMoreDetails: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`nav-category-services-section ${className}`}>
      <ServiceItemsContainer showMoreDetails={showMoreDetails}>{children}</ServiceItemsContainer>
    </div>
  );
}

export const COMPACT_SERVICE_ICON_SIZE = 24;

export function ServiceIcon({
  icon,
  size = COMPACT_SERVICE_ICON_SIZE,
  active = false,
}: {
  icon: string;
  size?: number;
  active?: boolean;
}) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div
        className={`absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] ${active ? 'bg-[#389f74]' : 'bg-[#8b8e9b]'}`}
        style={{ maskImage: `url('${icon}')`, maskSize: `${size}px ${size}px` }}
      />
    </div>
  );
}

/** Отступ от глифа до края контейнера кнопки info / избранное. */
const SERVICE_ACTION_ICON_PADDING = 2;

function ServiceActionIconFrame({
  size,
  className,
  children,
}: {
  size: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center box-border${className ? ` ${className}` : ''}`}
      style={{ width: size, height: size, padding: SERVICE_ACTION_ICON_PADDING }}
    >
      {children}
    </span>
  );
}

function ServiceInfoIcon({ size }: { size: number }) {
  return (
    <ServiceActionIconFrame size={size}>
      <svg className="block size-full" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="#8b8e9b" strokeWidth="1.5" fill="none" />
        <path d="M12 16V12M12 8H12.01" stroke="#8b8e9b" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </ServiceActionIconFrame>
  );
}

function ServiceFavoriteIcon({ size, isFavorite }: { size: number; isFavorite: boolean }) {
  return (
    <ServiceActionIconFrame size={size} className="nav-service-favorite-icon">
      <svg className="block size-full" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          className="nav-service-favorite-icon__star"
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          fill={isFavorite ? '#fbbf24' : 'none'}
          stroke={isFavorite ? '#fbbf24' : '#8b8e9b'}
          strokeWidth="1.5"
        />
      </svg>
    </ServiceActionIconFrame>
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
      className="fixed z-[9999] w-[min(240px,calc(100vw-32px))] bg-[var(--lk-tooltip-bg)] text-[var(--lk-tooltip-fg)] text-[12px] leading-[16px] rounded-[6px] px-[10px] py-[8px] shadow-[0px_4px_12px_rgba(0,0,0,0.2)] pointer-events-none"
      style={{ top, left, transform: 'translateY(-100%)' }}
    >
      <p className="line-clamp-4">{description}</p>
      <div
        className="absolute top-full w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-[var(--lk-tooltip-bg)]"
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
  enableDrag?: boolean;
  inFavorites?: boolean;
}

/** PromoTagPredefined decor blu — как в макете меню. */
function ServicePreviewTag({ label }: { label: string }) {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="PromoTagPredefined">
      <div
        className="bg-[#d6e2f4] content-stretch flex h-[16px] items-center justify-center relative rounded-[4px] shrink-0"
        data-name="PromoTagXxs"
      >
        <div
          aria-hidden="true"
          className="absolute border border-[#aac4ea] border-solid inset-0 pointer-events-none rounded-[4px]"
        />
        <div className="content-stretch flex items-center justify-center px-[4px] relative shrink-0" data-name="LabelWrapper">
          <p className="font-['SB_Sans_Interface:Semibold',sans-serif] leading-[14px] not-italic relative shrink-0 text-[#2b537e] text-[11px] whitespace-nowrap">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

function ServiceAllScopeLabel() {
  return <span className="text-[#aaaebd]">Все</span>;
}

function ServiceCardTitle({
  title,
  subtitle,
  className,
  showAllLabel = false,
}: {
  title: string;
  subtitle: string;
  className: string;
  showAllLabel?: boolean;
}) {
  const allSuffix = showAllLabel ? (
    <>
      {' '}
      <ServiceAllScopeLabel />
    </>
  ) : null;

  if (!subtitle) {
    return (
      <p className={`${className} min-w-0 max-w-full truncate`}>
        {title}
        {allSuffix}
      </p>
    );
  }

  if (subtitle === 'Preview') {
    const titleClassName = className
      .replace(/\bw-full\b/g, '')
      .replace(/\bshrink-0\b/g, '')
      .replace(/\boverflow-hidden\b/g, '')
      .replace(/\btext-ellipsis\b/g, '')
      .trim();

    return (
      <div className="flex w-full min-w-0 gap-[4px] items-center overflow-hidden" data-name="Title & Tag">
        <p className={`${titleClassName} min-w-0 truncate`}>
          {title}
          {allSuffix}
        </p>
        <ServicePreviewTag label={subtitle} />
      </div>
    );
  }

  return (
    <p className={className}>
      {title}
      {allSuffix}{' '}
      <span className="text-[#aaaebd]">{subtitle}</span>
    </p>
  );
}

export function ServiceCardItem({
  service,
  onAddToFavorites,
  isFavorite,
  showMoreDetails = false,
  enableDrag = true,
  inFavorites = false,
}: ServiceCardItemProps) {
  const navigate = useNavigate();
  const { completeMenuNavigation } = useNavigationPrototype();
  const [showTooltip, setShowTooltip] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const infoIconRef = useRef<HTMLDivElement | null>(null);
  const didDragRef = useRef(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0, arrowLeft: 0 });
  const description = getServiceDescription(service.id, service.title);
  const showAllLabel = isAllScopeServiceCard(service.id);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'SERVICE_CARD',
    item: { id: service.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: () => {
      didDragRef.current = true;
      requestAnimationFrame(() => {
        didDragRef.current = false;
      });
    },
  }));

  const navigateToService = () => {
    if (didDragRef.current) return;
    navigate(buildServicePath(service.id), { state: buildServiceNavState(service) });
    completeMenuNavigation();
  };

  const handleCardClick = (event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest('.nav-service-actions, .nav-service-actions__btn')) {
      return;
    }
    navigateToService();
  };

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

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleInfoMouseEnter = () => {
    updateTooltipPosition();
    setShowTooltip(true);
  };

  const handleInfoMouseLeave = () => {
    setShowTooltip(false);
  };

  const favoriteButton = (iconSize: number) => (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onAddToFavorites(service.id);
      }}
      className="nav-icon-btn nav-service-actions__btn nav-service-actions__favorite flex items-center justify-center rounded-[4px] shrink-0 cursor-pointer"
      style={{ width: iconSize, height: iconSize }}
      aria-label={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
    >
      <ServiceFavoriteIcon size={iconSize} isFavorite={isFavorite} />
    </button>
  );

  const setCompactCardRef = (node: HTMLDivElement | null) => {
    cardRef.current = node;
    if (enableDrag) {
      drag(node);
    }
  };

  if (showMoreDetails) {
    return (
      <div
        ref={enableDrag ? drag : undefined}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
        className={`relative h-full cursor-pointer ${isDragging ? 'opacity-50' : ''}`}
      >
        <div className={`nav-service-card nav-service-card--detailed bg-[#fdfdfd] border border-[#e6e8ef] content-stretch flex flex-col gap-[8px] h-full min-h-[96px] p-[12px] relative rounded-[6px]${isFavorite && !inFavorites ? ' nav-service-card--favorite' : ''}`}>
          <div className="content-stretch flex gap-[10px] items-start relative flex-[1_0_0]">
            <ServiceIcon icon={service.icon} size={COMPACT_SERVICE_ICON_SIZE} />
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative">
              <ServiceCardTitle
                title={service.title}
                subtitle={service.subtitle}
                showAllLabel={showAllLabel}
                className="font-['SB_Sans_Interface:Semibold',sans-serif] leading-[18px] not-italic text-[#41424e] text-[13px] tracking-[0.1px] w-full"
              />
              <p className="font-['SB_Sans_Interface:Regular',sans-serif] leading-[16px] not-italic text-[#8b8e9b] text-[12px] tracking-[0.1px] w-full line-clamp-3">
                {description}
              </p>
            </div>
          </div>
          <div className="nav-service-actions nav-service-actions--detailed">
            {favoriteButton(COMPACT_SERVICE_ICON_SIZE)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setCompactCardRef}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      className={`nav-service-card min-h-[32px] relative rounded-[4px] cursor-pointer ${isDragging ? 'opacity-50' : ''}${isFavorite && !inFavorites ? ' nav-service-card--favorite' : ''}${inFavorites ? ' nav-service-card--in-favorites' : ''}`}
    >
      {showTooltip && (
        <ServiceDescriptionTooltip
          description={description}
          top={tooltipPosition.top}
          left={tooltipPosition.left}
          arrowLeft={tooltipPosition.arrowLeft}
        />
      )}
      <div className="nav-service-card__main flex flex-row items-center min-h-[inherit] min-w-0 rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center min-h-[inherit] min-w-0 flex-1 p-[4px] relative">
          <ServiceIcon icon={service.icon} size={COMPACT_SERVICE_ICON_SIZE} />
          <div className="nav-service-card__title-wrap flex min-w-0 flex-1 flex-col items-start overflow-hidden">
            <ServiceCardTitle
              title={service.title}
              subtitle={service.subtitle}
              showAllLabel={showAllLabel}
              className="font-['SB_Sans_Interface:Regular',sans-serif] leading-[16px] not-italic relative text-[#41424e] text-[13px] text-ellipsis tracking-[0.1px] whitespace-nowrap"
            />
          </div>
        </div>
        <div className="nav-service-actions nav-service-actions--compact">
          <div
            className="nav-service-actions__btn nav-service-actions__info flex items-center justify-center shrink-0 rounded-[4px]"
            style={{ width: COMPACT_SERVICE_ICON_SIZE, height: COMPACT_SERVICE_ICON_SIZE }}
            ref={infoIconRef}
            onMouseEnter={handleInfoMouseEnter}
            onMouseLeave={handleInfoMouseLeave}
          >
            <ServiceInfoIcon size={COMPACT_SERVICE_ICON_SIZE} />
          </div>
          {favoriteButton(COMPACT_SERVICE_ICON_SIZE)}
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
    <div className="content-stretch flex items-center gap-[6px] min-h-[28px] ml-[12px] pl-[8px] pr-[8px] py-[4px] relative shrink-0 w-[calc(100%-12px)] rounded-[4px] border-l-2 border-l-[#dde0ea] bg-[rgba(238,239,243,0.4)]">
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
  const subservices = getVisibleSubservices(service.id, searchQuery);
  const showSubservices = Boolean(normalizeSearchQuery(searchQuery)) && subservices.length > 0;

  return (
    <div className="nav-service-cell min-w-0 w-full">
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
