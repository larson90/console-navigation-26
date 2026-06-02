import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDrag, useDrop } from 'react-dnd';
import { Switch } from './ui/switch';
import { FavoritesList } from './FavoritesList';
import { NavigationMenuScrim } from './NavigationMenuScrim';
import { NavigationMiniBanners } from './navigationMiniBanners';
import { useFavorites } from '../hooks/useFavorites';
import svgPaths from "../../imports/MainMenuDesktop/svg-znqodigjzs";
import imgSolutionEvolutionCompute from "figma:asset/d03a307bb2b6acb25a22f23a9520f7d71f4670fb.png";
import imgSolutionObservatory from "figma:asset/13a87ebe8d52252380a917437a7ba97c4d34355e.png";
import imgSolutionDataReplication from "figma:asset/16a9fde8a5bc0a83aedd938e24d56d8e72f2ae4b.png";
import {
  imgIconColor3 as imgIconSolutionEvolutionCompute,
  imgIconColor4 as imgIconSolutionObservatory,
  imgIconColor5 as imgIconSolutionDataReplication
} from "../../imports/◆EvolutionMenuContent-2-1/svg-hqsa5";
import {
  imgIconColor, imgIconColor1, imgIconColor2, imgIconColor3, imgIconColor4,
  imgIconColor5, imgIconColor6, imgIconColor7, imgIconColor8, imgIconColor9,
  imgIconColor10, imgIconColor11, imgIconColor12, imgIconColor13
} from "../../imports/MainMenuDesktop/svg-3dkbq";
import {
  imgIconColor10 as imgIcon2Color10,
  imgIconColor11 as imgIcon2Color11,
  imgIconColor12 as imgIcon2Color12,
  imgIconColor13 as imgIcon2Color13,
} from "../../imports/MainMenuDesktop-1/svg-vz3cs";
import {
  type ServiceCard,
  type ServiceCategory,
  type ControlCategory,
  SERVICE_CATEGORIES,
  CONTROL_CATEGORIES,
  CATEGORY_COLORS,
  getServiceDescription,
} from '../data/serviceCatalog';

/** Категория «Безопасность и администрирование» только в блоке управления, не в «Сервисах». */
const PLATFORM_SERVICE_CATEGORIES = SERVICE_CATEGORIES.filter(
  (c) => c.id !== 'security-administration',
);

interface SolutionCard {
  id: string;
  title: string;
  description: string;
  badge?: string;
  icon: string;
  image: string;
}

const SOLUTION_CARDS: SolutionCard[] = [
  {
    id: 'evolution-compute',
    title: 'Evolution Compute',
    description: 'Отслеживайте и анализируйте состояние',
    badge: '3',
    icon: imgIconSolutionEvolutionCompute,
    image: imgSolutionEvolutionCompute
  },
  {
    id: 'observatory',
    title: 'Обсерватория',
    description: 'Разверни виртульную машину',
    badge: '3',
    icon: imgIconSolutionObservatory,
    image: imgSolutionObservatory
  },
  {
    id: 'data-replication',
    title: 'Data Replication',
    description: 'Отслеживайте и анализируйте состояние',
    badge: '3',
    icon: imgIconSolutionDataReplication,
    image: imgSolutionDataReplication
  }
];

function ServiceItemsContainer({
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

function ServiceItemWrapper({
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

interface ServiceCardItemProps {
  service: ServiceCard;
  onAddToFavorites: (id: string) => void;
  isFavorite: boolean;
  showMoreDetails?: boolean;
}

interface PlatformCategoryBlockProps {
  category: ServiceCategory;
  index: number;
  isExpanded: boolean;
  isHovered: boolean;
  onToggle: (id: string) => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  onHover: (id: string | null) => void;
  toggleFavorite: (id: string) => void;
  favorites: string[];
  showMoreDetails: boolean;
}

interface CategoryBlockProps {
  category: ControlCategory;
  index: number;
  isExpanded: boolean;
  isHovered: boolean;
  onToggle: (id: string) => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
  onHover: (id: string | null) => void;
  toggleFavorite: (id: string) => void;
  favorites: string[];
  showMoreDetails: boolean;
}

function PlatformCategoryBlock({ category, index, isExpanded, isHovered, onToggle, onMove, onHover, toggleFavorite, favorites, showMoreDetails }: PlatformCategoryBlockProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  const borderColor = CATEGORY_COLORS[category.id] || '#dde0ea';

  const [{ isDragging }, drag] = useDrag({
    type: 'PLATFORM_CATEGORY',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'PLATFORM_CATEGORY',
    hover: (item: { index: number }) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      onMouseEnter={() => onHover(category.id)}
      onMouseLeave={() => onHover(null)}
      className="bg-[#fdfdfd] relative rounded-[4px] shrink-0 w-full"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div aria-hidden="true" className={`absolute border-l-6 border-solid inset-0 pointer-events-none rounded-[4px]`} style={{ borderColor }} />
      <div className="content-stretch flex flex-col gap-[4px] items-start pl-[14px] pr-[8px] py-[8px] relative size-full">
        <div className="relative shrink-0 w-full">
          <div
            role="button"
            tabIndex={0}
            onClick={() => onToggle(category.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onToggle(category.id);
              }
            }}
            className="content-stretch flex gap-[8px] items-start pr-[8px] py-[4px] relative size-full cursor-pointer rounded-[4px] hover:bg-[rgba(0,0,0,0.03)]"
          >
            <div className="flex-[1_0_0] min-w-px relative">
              <div className="content-stretch flex items-center pl-[12px] relative size-full min-h-[32px]">
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0 flex-[1_0_0]">
                  <div className="flex flex-col font-['SB_Sans_Interface:Semibold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#41424e] text-[16px] text-ellipsis tracking-[0.15px] whitespace-nowrap">
                    <p className="leading-[24px] overflow-hidden text-ellipsis">{category.title}</p>
                  </div>
                </div>
                <div className="content-stretch flex gap-[4px] items-center relative shrink-0 ml-auto">
                  {isHovered && (
                    <button
                      type="button"
                      onClick={(e) => e.stopPropagation()}
                      className="content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px] cursor-move hover:bg-[rgba(0,0,0,0.05)]"
                    >
                      <div className="relative shrink-0 size-[24px]">
                        <svg className="absolute inset-0 size-full" viewBox="0 0 24 24" fill="none">
                          <circle cx="7" cy="5" r="1.5" fill="#8b8e9b"/>
                          <circle cx="12" cy="5" r="1.5" fill="#8b8e9b"/>
                          <circle cx="17" cy="5" r="1.5" fill="#8b8e9b"/>
                          <circle cx="7" cy="12" r="1.5" fill="#8b8e9b"/>
                          <circle cx="12" cy="12" r="1.5" fill="#8b8e9b"/>
                          <circle cx="17" cy="12" r="1.5" fill="#8b8e9b"/>
                          <circle cx="7" cy="19" r="1.5" fill="#8b8e9b"/>
                          <circle cx="12" cy="19" r="1.5" fill="#8b8e9b"/>
                          <circle cx="17" cy="19" r="1.5" fill="#8b8e9b"/>
                        </svg>
                      </div>
                    </button>
                  )}
                  <div className="content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]">
                    <div className="bg-[#e6e8ef] content-stretch flex items-center relative rounded-[4px] shrink-0 size-[20px]">
                      <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative">
                        <div className="absolute inset-[31.25%_37.5%_31.25%_43.75%]">
                          <div className="absolute inset-[-7.07%_-28.28%_-7.07%_-14.14%]">
                            <svg
                              className="block size-full"
                              fill="none"
                              preserveAspectRatio="none"
                              viewBox="0 0 5.34099 8.56066"
                              style={{ transform: isExpanded ? 'rotate(-90deg)' : 'rotate(90deg)', transition: 'transform 0.2s' }}
                            >
                              <path d="M0.53033 0.53033L4.28033 4.28033L0.53033 8.03033" stroke="#787B8A" strokeWidth="1.5" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isExpanded && category.megaservice && (
          <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full">
            <div className="bg-[rgba(238,239,243,0.5)] relative rounded-[4px] shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[8px] items-start justify-center pb-[8px] pt-[12px] px-[8px] relative size-full">
                <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
                  <div className="flex-[1_0_0] min-w-px relative">
                    <div className="content-stretch flex items-start pl-[4px] relative size-full">
                      <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                        <div className="relative shrink-0 size-[24px]">
                          <div
                            className="absolute bg-[#8b8e9b] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px]"
                            style={{ maskImage: `url('${category.megaservice.icon}')` }}
                          />
                        </div>
                        <div className="flex flex-col font-['SB_Sans_Interface:Semibold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#41424e] text-[14px] text-ellipsis tracking-[0.15px] whitespace-nowrap">
                          <p className="leading-[20px] overflow-hidden text-ellipsis">{category.megaservice.title}</p>
                        </div>
                        <div className="bg-[#e6e8ef] content-stretch flex items-center relative rounded-[4px] shrink-0 size-[20px]">
                          <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative">
                            <div className="absolute inset-[31.25%_37.5%_31.25%_43.75%]">
                              <div className="absolute inset-[-7.07%_-28.28%_-7.07%_-14.14%]">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.34099 8.56066">
                                  <path d="M0.53033 0.53033L4.28033 4.28033L0.53033 8.03033" stroke="#787B8A" strokeWidth="1.5" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <ServiceItemsContainer showMoreDetails={showMoreDetails}>
                  {category.megaservice.services.map((service) => (
                    <ServiceItemWrapper key={service.id} showMoreDetails={showMoreDetails}>
                      <ServiceCardItem
                        service={service}
                        onAddToFavorites={toggleFavorite}
                        isFavorite={favorites.includes(service.id)}
                        showMoreDetails={showMoreDetails}
                      />
                    </ServiceItemWrapper>
                  ))}
                </ServiceItemsContainer>
              </div>
            </div>
          </div>
        )}

        {isExpanded && category.services.length > 0 && (
          <ServiceItemsContainer showMoreDetails={showMoreDetails} className="px-[8px]">
            {category.services.map((service) => (
              <ServiceItemWrapper key={service.id} showMoreDetails={showMoreDetails}>
                <ServiceCardItem
                  service={service}
                  onAddToFavorites={toggleFavorite}
                  isFavorite={favorites.includes(service.id)}
                  showMoreDetails={showMoreDetails}
                />
              </ServiceItemWrapper>
            ))}
          </ServiceItemsContainer>
        )}
      </div>
    </div>
  );
}

function CategoryBlock({ category, index, isExpanded, isHovered, onToggle, onMove, onHover, toggleFavorite, favorites, showMoreDetails }: CategoryBlockProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const borderColor = CATEGORY_COLORS[category.id] || '#dde0ea';

  const [{ isDragging }, drag] = useDrag({
    type: 'CATEGORY',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'CATEGORY',
    hover: (item: { index: number }) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      onMove(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      onMouseEnter={() => onHover(category.id)}
      onMouseLeave={() => onHover(null)}
      className="bg-[#fdfdfd] relative rounded-[4px] shrink-0 w-full"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div aria-hidden="true" className="absolute border-l-6 border-solid inset-0 pointer-events-none rounded-[4px]" style={{ borderColor }} />
      <div className="content-stretch flex flex-col gap-[4px] items-start pl-[14px] pr-[8px] py-[8px] relative size-full">
        <div className="relative shrink-0 w-full">
          <div
            role="button"
            tabIndex={0}
            onClick={() => onToggle(category.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onToggle(category.id);
              }
            }}
            className="content-stretch flex gap-[8px] items-start pr-[8px] py-[4px] relative size-full cursor-pointer rounded-[4px] hover:bg-[rgba(0,0,0,0.03)]"
          >
            <div className="flex-[1_0_0] min-w-px relative">
              <div className="content-stretch flex items-center pl-[12px] relative size-full min-h-[32px]">
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0 flex-[1_0_0]">
                  <div className="flex flex-col font-['SB_Sans_Interface:Semibold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#41424e] text-[16px] text-ellipsis tracking-[0.15px] whitespace-nowrap">
                    <p className="leading-[24px] overflow-hidden text-ellipsis">{category.title}</p>
                  </div>
                </div>
                <div className="content-stretch flex gap-[4px] items-center relative shrink-0 ml-auto">
                  {isHovered && (
                    <button
                      type="button"
                      onClick={(e) => e.stopPropagation()}
                      className="content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px] cursor-move hover:bg-[rgba(0,0,0,0.05)]"
                    >
                      <div className="relative shrink-0 size-[24px]">
                        <svg className="absolute inset-0 size-full" viewBox="0 0 24 24" fill="none">
                          <circle cx="7" cy="5" r="1.5" fill="#8b8e9b"/>
                          <circle cx="12" cy="5" r="1.5" fill="#8b8e9b"/>
                          <circle cx="17" cy="5" r="1.5" fill="#8b8e9b"/>
                          <circle cx="7" cy="12" r="1.5" fill="#8b8e9b"/>
                          <circle cx="12" cy="12" r="1.5" fill="#8b8e9b"/>
                          <circle cx="17" cy="12" r="1.5" fill="#8b8e9b"/>
                          <circle cx="7" cy="19" r="1.5" fill="#8b8e9b"/>
                          <circle cx="12" cy="19" r="1.5" fill="#8b8e9b"/>
                          <circle cx="17" cy="19" r="1.5" fill="#8b8e9b"/>
                        </svg>
                      </div>
                    </button>
                  )}
                  <div className="content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px]">
                    <div className="bg-[#e6e8ef] content-stretch flex items-center relative rounded-[4px] shrink-0 size-[20px]">
                      <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative">
                        <div className="absolute inset-[31.25%_37.5%_31.25%_43.75%]">
                          <div className="absolute inset-[-7.07%_-28.28%_-7.07%_-14.14%]">
                            <svg
                              className="block size-full"
                              fill="none"
                              preserveAspectRatio="none"
                              viewBox="0 0 5.34099 8.56066"
                              style={{ transform: isExpanded ? 'rotate(-90deg)' : 'rotate(90deg)', transition: 'transform 0.2s' }}
                            >
                              <path d="M0.53033 0.53033L4.28033 4.28033L0.53033 8.03033" stroke="#787B8A" strokeWidth="1.5" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isExpanded && category.subcategories.map((subcategory, idx) => (
          <div key={idx} className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full">
            <div className="bg-[rgba(238,239,243,0.5)] relative rounded-[4px] shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[8px] items-start justify-center pb-[8px] pt-[12px] px-[8px] relative size-full">
                <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
                  <div className="flex-[1_0_0] min-w-px relative">
                    <div className="content-stretch flex items-start pl-[4px] relative size-full">
                      <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                        <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                          <div className="relative shrink-0 size-[24px]">
                            <div
                              className="absolute bg-[#8b8e9b] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px]"
                              style={{ maskImage: `url('${subcategory.icon}')` }}
                            />
                          </div>
                          <div className="flex flex-col font-['SB_Sans_Interface:Semibold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#41424e] text-[14px] text-ellipsis tracking-[0.15px] whitespace-nowrap">
                            <p className="leading-[20px] overflow-hidden text-ellipsis">{subcategory.title}</p>
                          </div>
                        </div>
                        <div className="bg-[#e6e8ef] content-stretch flex items-center relative rounded-[4px] shrink-0 size-[20px]">
                          <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative">
                            <div className="absolute inset-[31.25%_37.5%_31.25%_43.75%]">
                              <div className="absolute inset-[-7.07%_-28.28%_-7.07%_-14.14%]">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.34099 8.56066">
                                  <path d="M0.53033 0.53033L4.28033 4.28033L0.53033 8.03033" stroke="#787B8A" strokeWidth="1.5" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <ServiceItemsContainer showMoreDetails={showMoreDetails}>
                  {subcategory.items.map((item) => (
                    <ServiceItemWrapper key={item.id} showMoreDetails={showMoreDetails}>
                      <ServiceCardItem
                        service={{
                          id: item.id,
                          icon: subcategory.icon,
                          title: item.title,
                          subtitle: ''
                        }}
                        onAddToFavorites={toggleFavorite}
                        isFavorite={favorites.includes(item.id)}
                        showMoreDetails={showMoreDetails}
                      />
                    </ServiceItemWrapper>
                  ))}
                </ServiceItemsContainer>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServiceIcon({ icon, size = 24 }: { icon: string; size?: number }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div
        className="absolute bg-[#8b8e9b] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px]"
        style={{ maskImage: `url('${icon}')`, maskSize: `${size}px ${size}px` }}
      />
    </div>
  );
}

function ServiceDescriptionTooltip({
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

function ServiceCardItem({ service, onAddToFavorites, isFavorite, showMoreDetails = false }: ServiceCardItemProps) {
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
              <p className="font-['SB_Sans_Interface:Semibold',sans-serif] leading-[18px] not-italic text-[#41424e] text-[13px] tracking-[0.1px] w-full">
                {service.title}
              </p>
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
            <p className="font-['SB_Sans_Interface:Regular',sans-serif] leading-[16px] not-italic overflow-hidden relative shrink-0 text-[#41424e] text-[13px] text-ellipsis tracking-[0.1px] whitespace-nowrap w-full">
              {service.title}
            </p>
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

export default function NavigationMenuPrototype1() {
  const showPlatformSelector = false;
  const showSolutionsTab = false;
  const { favorites, favoriteServices, isOver, drop, toggleFavorite } =
    useFavorites(imgIcon2Color13);
  const [searchQuery, setSearchQuery] = useState('');
  const [moreDetails, setMoreDetails] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(CONTROL_CATEGORIES.map(c => c.id));
  const [expandedPlatformCategories, setExpandedPlatformCategories] = useState<string[]>(
    PLATFORM_SERVICE_CATEGORIES.map((c) => c.id),
  );
  const [categoryOrder, setCategoryOrder] = useState<string[]>(CONTROL_CATEGORIES.map(c => c.id));
  const [platformCategoryOrder, setPlatformCategoryOrder] = useState<string[]>(
    PLATFORM_SERVICE_CATEGORIES.map((c) => c.id),
  );
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredPlatformCategory, setHoveredPlatformCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }
  };

  const expandAll = () => {
    setExpandedPlatformCategories(PLATFORM_SERVICE_CATEGORIES.map((cat) => cat.id));
    setExpandedCategories(CONTROL_CATEGORIES.map(cat => cat.id));
  };

  const collapseAll = () => {
    setExpandedPlatformCategories([]);
    setExpandedCategories([]);
  };

  const isAllExpanded =
    PLATFORM_SERVICE_CATEGORIES.every((c) => expandedPlatformCategories.includes(c.id)) &&
    CONTROL_CATEGORIES.every((c) => expandedCategories.includes(c.id));

  const toggleExpandAllCategories = () => {
    if (isAllExpanded) {
      collapseAll();
    } else {
      expandAll();
    }
  };

  const handleMoreDetailsChange = (checked: boolean) => {
    setMoreDetails(checked);
    if (checked) {
      expandAll();
    } else {
      collapseAll();
    }
  };

  const togglePlatformCategory = (categoryId: string) => {
    if (expandedPlatformCategories.includes(categoryId)) {
      setExpandedPlatformCategories(expandedPlatformCategories.filter(id => id !== categoryId));
    } else {
      setExpandedPlatformCategories([...expandedPlatformCategories, categoryId]);
    }
  };

  const moveCategory = (dragIndex: number, hoverIndex: number) => {
    const newOrder = [...categoryOrder];
    const [removed] = newOrder.splice(dragIndex, 1);
    newOrder.splice(hoverIndex, 0, removed);
    setCategoryOrder(newOrder);
  };

  const movePlatformCategory = (dragIndex: number, hoverIndex: number) => {
    const newOrder = [...platformCategoryOrder];
    const [removed] = newOrder.splice(dragIndex, 1);
    newOrder.splice(hoverIndex, 0, removed);
    setPlatformCategoryOrder(newOrder);
  };

  const filteredCategories = searchQuery.trim() === ''
    ? PLATFORM_SERVICE_CATEGORIES
    : PLATFORM_SERVICE_CATEGORIES.map((category) => {
        const filteredMegaServices = category.megaservice?.services.filter(service =>
          service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
        ) || [];

        const filteredRegularServices = category.services.filter(service =>
          service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return {
          ...category,
          megaservice: filteredMegaServices.length > 0 && category.megaservice
            ? { ...category.megaservice, services: filteredMegaServices }
            : undefined,
          services: filteredRegularServices
        };
      }).filter(category =>
        (category.megaservice?.services.length || 0) + category.services.length > 0
      );

  const filteredControlCategories = searchQuery.trim() === ''
    ? CONTROL_CATEGORIES
    : CONTROL_CATEGORIES.map(category => {
        const filteredSubcategories = category.subcategories.map(sub => ({
          ...sub,
          items: sub.items.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
        })).filter(sub => sub.items.length > 0);

        return {
          ...category,
          subcategories: filteredSubcategories
        };
      }).filter(category => category.subcategories.length > 0);

  return (
    <NavigationMenuScrim>
          <div className="content-stretch flex items-start justify-center max-w-[inherit] min-w-[inherit] pt-0 relative size-full">

            {/* Left Sidebar */}
            <div className="h-full relative shrink-0 w-[216px]">
              <div className="content-stretch flex flex-col isolate items-start justify-between pt-[16px] pb-[16px] pl-[16px] relative size-full">
                <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full z-[2] flex-[1_0_0] min-h-0 overflow-hidden">

                  {/* Platform Selector */}
                  {showPlatformSelector && (
                    <div className="content-stretch flex flex-col h-[56px] items-start pb-[16px] relative shrink-0 w-full">
                      <div className="bg-[#fdfdfd] h-[56px] relative rounded-[4px] shrink-0 w-full">
                        <div className="flex flex-row items-center size-full">
                          <div className="content-stretch flex gap-[8px] items-center px-[12px] py-px relative size-full">
                            <div className="flex-[1_0_0] min-w-px relative">
                              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
                                <div className="bg-[#787b8a] relative rounded-[4px] shrink-0 size-[32px]">
                                  <div className="absolute inset-0 overflow-clip">
                                    <div className="absolute inset-[12.5%]">
                                      <div className="absolute inset-[-5.21%]">
                                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.5 26.5">
                                          <path clipRule="evenodd" d={svgPaths.p1c0bf500} fill="white" fillRule="evenodd" stroke="white" strokeWidth="2.5" />
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px not-italic relative">
                                  <p className="font-['SB_Sans_Interface:Regular',sans-serif] leading-[16px] relative shrink-0 text-[#8b8e9b] text-[12px] tracking-[0.1px] w-full">Платформа</p>
                                  <p className="font-['SB_Sans_Interface:Semibold',sans-serif] leading-[20px] overflow-hidden relative shrink-0 text-[#41424e] text-[14px] text-ellipsis tracking-[0.15px] w-full whitespace-nowrap">Evolution</p>
                                </div>
                              </div>
                            </div>
                            <div className="relative shrink-0 size-[24px]">
                              <div className="absolute bg-[#8b8e9b] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px]" style={{ maskImage: `url('${imgIconColor}')` }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Favorites */}
                  <div
                    ref={drop}
                    className={`bg-[#fdfdfd] content-stretch flex flex-col items-start relative rounded-[4px] w-full flex-[1_0_0] min-h-0 overflow-hidden ${isOver ? 'ring-2 ring-[#389f74]' : ''}`}
                  >
                    <div className="relative shrink-0 w-full">
                      <div className="content-stretch flex flex-col gap-[4px] items-start p-[8px] relative size-full">
                        <div className="relative shrink-0 w-full">
                          <div className="flex flex-row items-center size-full">
                            <div className="content-stretch flex gap-[4px] items-center pl-[4px] relative size-full">
                              <div className="flex flex-[1_0_0] flex-col font-['SB_Sans_Interface:Semibold',sans-serif] justify-center leading-[0] min-w-px not-italic overflow-hidden relative text-[#6d707f] text-[12px] text-ellipsis text-left whitespace-nowrap">
                                <p className="leading-[16px] overflow-hidden text-ellipsis">Избранное</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative w-full flex-[1_0_0] min-h-0 overflow-y-auto px-[8px] pb-[8px]">
                      {favoriteServices.length === 0 ? (
                        <div className="bg-[rgba(238,239,243,0.5)] relative rounded-[2px] shrink-0 w-full">
                          <div className="flex flex-col items-center overflow-clip rounded-[inherit] size-full">
                            <div className="content-stretch flex flex-col gap-[8px] items-center p-[12px] relative size-full">
                              <div className="bg-white content-stretch flex items-center overflow-clip p-[4px] relative rounded-[4px] shrink-0">
                                <div className="relative shrink-0 size-[24px]">
                                  <div className="absolute bg-[#99d7ba] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px]" style={{ maskImage: `url('${imgIconColor2}')` }} />
                                </div>
                              </div>
                              <div className="flex flex-col font-['SB_Sans_Interface:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#8b8e9b] text-[12px] text-center tracking-[0.1px] w-[153.494px]">
                                <p className="leading-[16px]">Перетащите сюда карточки сервисов, расположенные справа</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <FavoritesList
                          favoriteServices={favoriteServices}
                          onToggleFavorite={toggleFavorite}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Menu */}
                <div className="content-stretch flex flex-col items-start min-h-[32px] overflow-clip relative rounded-[4px] shrink-0 w-full z-[1]">
                  <div className="max-w-[286.5px] min-w-[200px] relative shrink-0 w-full hover:bg-[rgba(0,0,0,0.02)] rounded-[4px]">
                    <div className="flex flex-row items-center max-w-[inherit] min-w-[inherit] size-full">
                      <div className="content-stretch flex gap-[8px] items-center max-w-[inherit] min-w-[inherit] p-[4px] relative size-full">
                        <div className="relative shrink-0 size-[24px]">
                          <div className="absolute bg-[#8b8e9b] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px]" style={{ maskImage: `url('${imgIconColor3}')` }} />
                        </div>
                        <p className="font-['SB_Sans_Interface:Regular',sans-serif] leading-[16px] not-italic overflow-hidden relative shrink-0 text-[#41424e] text-[13px] text-ellipsis tracking-[0.1px] whitespace-nowrap">Поддержка</p>
                      </div>
                    </div>
                  </div>
                  <div className="max-w-[286.5px] min-w-[200px] relative shrink-0 w-full hover:bg-[rgba(0,0,0,0.02)] rounded-[4px]">
                    <div className="flex flex-row items-center max-w-[inherit] min-w-[inherit] size-full">
                      <div className="content-stretch flex gap-[8px] items-center max-w-[inherit] min-w-[inherit] p-[4px] relative size-full">
                        <div className="relative shrink-0 size-[24px]">
                          <div className="absolute bg-[#8b8e9b] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px]" style={{ maskImage: `url('${imgIconColor4}')` }} />
                        </div>
                        <p className="font-['SB_Sans_Interface:Regular',sans-serif] leading-[16px] not-italic overflow-hidden relative shrink-0 text-[#41424e] text-[13px] text-ellipsis tracking-[0.1px] whitespace-nowrap">Документация</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="content-stretch flex h-full items-start px-[16px] relative shrink-0">
              <div className="content-stretch flex flex-col h-full items-center justify-center overflow-clip relative shrink-0">
                <div className="flex flex-[1_0_0] items-center justify-center min-h-px relative">
                  <div className="-scale-y-100 flex-none h-full">
                    <div className="bg-[#dde0ea] h-full w-px" />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-[1_0_0] h-full min-w-px relative overflow-y-auto">
              <div className="content-stretch flex flex-col gap-[8px] items-start pb-0 relative pr-[20px]">

                {/* Search and Controls */}
                <div className="content-stretch flex flex-col gap-[8px] items-start pt-[16px] relative rounded-[8px] shrink-0 w-full">
                  <div className="bg-[#fdfdfd] content-stretch flex flex-col items-start justify-center px-[10px] py-[8px] relative rounded-[4px] shrink-0 w-full">
                    <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[4px]" />
                    <div className="relative shrink-0 w-full">
                      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
                        <div className="relative shrink-0 size-[24px]">
                          <div className="absolute bg-[#8b8e9b] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px]" style={{ maskImage: `url('${imgIcon2Color10}')` }} />
                        </div>
                        <div className="content-stretch flex flex-[1_0_0] items-start min-w-px overflow-clip relative">
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Поиск по сервисам"
                            className="flex-[1_0_0] font-['SB_Sans_Interface:Regular',sans-serif] leading-[20px] min-w-px not-italic overflow-hidden relative text-[#41424e] text-[14px] text-ellipsis tracking-[0.1px] whitespace-nowrap bg-transparent border-none outline-none placeholder:text-[#aaaebd]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                    <NavigationMiniBanners />
                  </div>
                </div>

                <div className="content-stretch flex w-full shrink-0 items-center justify-between">
                  <p className="font-['SB_Sans_Interface:Semibold',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#41424e] text-[12px] whitespace-nowrap">
                    Сервисы
                  </p>
                  <div className="content-stretch flex gap-[8px] items-center shrink-0">
                    <label className="content-stretch flex gap-[8px] items-center cursor-pointer select-none">
                      <Switch
                        checked={moreDetails}
                        onCheckedChange={handleMoreDetailsChange}
                        className="data-[state=checked]:bg-[#99d7ba]"
                      />
                      <span className="font-['SB_Sans_Interface:Regular',sans-serif] leading-[16px] not-italic text-[#6d707f] text-[12px] whitespace-nowrap">
                        Больше деталей
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={toggleExpandAllCategories}
                      aria-label={isAllExpanded ? 'Свернуть все категории' : 'Развернуть все категории'}
                      className="content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px] cursor-pointer hover:bg-[rgba(0,0,0,0.05)]"
                    >
                      <div className="relative shrink-0 size-[24px]">
                        <div
                          className="absolute bg-[#8b8e9b] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px]"
                          style={{ maskImage: `url('${isAllExpanded ? imgIcon2Color11 : imgIcon2Color12}')` }}
                        />
                      </div>
                    </button>
                  </div>
                </div>

                {platformCategoryOrder.map((categoryId, index) => {
                  const category = filteredCategories.find(c => c.id === categoryId);
                  if (!category) return null;

                  return (
                    <PlatformCategoryBlock
                      key={category.id}
                      category={category}
                      index={index}
                      isExpanded={expandedPlatformCategories.includes(category.id)}
                      isHovered={hoveredPlatformCategory === category.id}
                      onToggle={togglePlatformCategory}
                      onMove={movePlatformCategory}
                      onHover={setHoveredPlatformCategory}
                      toggleFavorite={toggleFavorite}
                      favorites={favorites}
                      showMoreDetails={moreDetails}
                    />
                  );
                })}

                {categoryOrder.map((categoryId, index) => {
                  const category = filteredControlCategories.find(c => c.id === categoryId);
                  if (!category) return null;

                  return (
                    <CategoryBlock
                      key={category.id}
                      category={category}
                      index={index}
                      isExpanded={expandedCategories.includes(category.id)}
                      isHovered={hoveredCategory === category.id}
                      onToggle={toggleCategory}
                      onMove={moveCategory}
                      onHover={setHoveredCategory}
                      toggleFavorite={toggleFavorite}
                      favorites={favorites}
                      showMoreDetails={moreDetails}
                    />
                  );
                })}

                {showSolutionsTab && (
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative w-full">
                    <div className="content-stretch flex gap-[4px] items-start relative shrink-0 w-full">
                      {SOLUTION_CARDS.slice(0, 2).map((solution) => (
                        <div key={solution.id} className="bg-[#fdfdfd] flex-[1_0_0] h-[80px] min-w-px relative rounded-[4px] cursor-pointer hover:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)] transition-shadow">
                          <div className="content-stretch flex flex-col items-start justify-between pl-[14px] pr-[8px] py-[8px] relative size-full">
                            <div className="relative shrink-0 w-full">
                              <div className="content-stretch flex gap-[8px] items-start pr-[8px] py-[4px] relative size-full">
                                <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative">
                                  <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                                    <div className="relative shrink-0 size-[24px]">
                                      <div
                                        className="absolute bg-[#8b8e9b] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px]"
                                        style={{ maskImage: `url('${solution.icon}')` }}
                                      />
                                    </div>
                                    <div className="flex flex-col font-['SB_Sans_Interface:Semibold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#41424e] text-[14px] text-ellipsis tracking-[0.15px] whitespace-nowrap">
                                      <p className="leading-[20px] overflow-hidden text-ellipsis">{solution.title}</p>
                                    </div>
                                    <div className="bg-[#e6e8ef] content-stretch flex items-center relative rounded-[4px] shrink-0 size-[20px]">
                                      <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative">
                                        <div className="absolute inset-[31.25%_37.5%_31.25%_43.75%]">
                                          <div className="absolute inset-[-7.07%_-28.28%_-7.07%_-14.14%]">
                                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.34099 8.56066">
                                              <path d="M0.53033 0.53033L4.28033 4.28033L0.53033 8.03033" stroke="#787B8A" strokeWidth="1.5" />
                                            </svg>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="relative shrink-0 pr-[90px]">
                              <div className="flex flex-col font-['SB_Sans_Interface:Regular',sans-serif] justify-center leading-[0] not-italic relative text-[#6d707f] text-[12px] tracking-[0.1px]">
                                <p className="leading-[16px]">{solution.description}</p>
                              </div>
                            </div>
                            <div className="absolute bottom-[7px] h-[65px] right-[-0.5px] w-[84px]">
                              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <img alt="" className="absolute h-[115.39%] left-[-6.87%] max-w-none top-[-7.05%] w-[115.71%]" src={solution.image} />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {SOLUTION_CARDS.length > 2 && (
                      <div className="content-stretch flex gap-[4px] items-start relative shrink-0 w-[305px]">
                        {SOLUTION_CARDS.slice(2).map((solution) => (
                          <div key={solution.id} className="bg-[#fdfdfd] flex-[1_0_0] h-[80px] min-w-px relative rounded-[4px] cursor-pointer hover:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)] transition-shadow">
                            <div className="content-stretch flex flex-col items-start justify-between pl-[14px] pr-[8px] py-[8px] relative size-full">
                              <div className="relative shrink-0 w-full">
                                <div className="content-stretch flex gap-[8px] items-start pr-[8px] py-[4px] relative size-full">
                                  <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative">
                                    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                                      <div className="relative shrink-0 size-[24px]">
                                        <div
                                          className="absolute bg-[#8b8e9b] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px]"
                                          style={{ maskImage: `url('${solution.icon}')` }}
                                        />
                                      </div>
                                      <div className="flex flex-col font-['SB_Sans_Interface:Semibold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#41424e] text-[14px] text-ellipsis tracking-[0.15px] whitespace-nowrap">
                                        <p className="leading-[20px] overflow-hidden text-ellipsis">{solution.title}</p>
                                      </div>
                                      <div className="bg-[#e6e8ef] content-stretch flex items-center relative rounded-[4px] shrink-0 size-[20px]">
                                        <div className="flex-[1_0_0] h-full min-w-px overflow-clip relative">
                                          <div className="absolute inset-[31.25%_37.5%_31.25%_43.75%]">
                                            <div className="absolute inset-[-7.07%_-28.28%_-7.07%_-14.14%]">
                                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.34099 8.56066">
                                                <path d="M0.53033 0.53033L4.28033 4.28033L0.53033 8.03033" stroke="#787B8A" strokeWidth="1.5" />
                                              </svg>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="relative shrink-0 pr-[90px]">
                                <div className="flex flex-col font-['SB_Sans_Interface:Regular',sans-serif] justify-center leading-[0] not-italic relative text-[#6d707f] text-[12px] tracking-[0.1px]">
                                  <p className="leading-[16px]">{solution.description}</p>
                                </div>
                              </div>
                              <div className="absolute bottom-[7px] h-[65px] right-[-0.5px] w-[84px]">
                                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                  <img alt="" className="absolute h-[115.39%] left-[-6.87%] max-w-none top-[-7.05%] w-[115.71%]" src={solution.image} />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>
    </NavigationMenuScrim>
  );
}
