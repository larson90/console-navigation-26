import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import {
  ServiceCardItem,
  ServiceItemWrapper,
  ServiceItemsContainer,
} from './navigationServiceUi';
import {
  type ServiceCategory,
  type ControlCategory,
  CATEGORY_COLORS,
} from '../data/serviceCatalog';
import { type Solution } from '../data/solutionsCatalog';
import { SolutionIllustration } from './solutionIllustrations';

export interface PlatformCategoryBlockProps {
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

export interface CategoryBlockProps {
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

export function PlatformCategoryBlock({ category, index, isExpanded, isHovered, onToggle, onMove, onHover, toggleFavorite, favorites, showMoreDetails }: PlatformCategoryBlockProps) {
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
        {isExpanded && category.subcategories?.map((subcategory, idx) => (
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
                      </div>
                    </div>
                  </div>
                </div>
                <ServiceItemsContainer showMoreDetails={showMoreDetails}>
                  {subcategory.services.map((service) => (
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
        ))}

      </div>
    </div>
  );
}

export function CategoryBlock({ category, index, isExpanded, isHovered, onToggle, onMove, onHover, toggleFavorite, favorites, showMoreDetails }: CategoryBlockProps) {
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

export interface SolutionBlockProps {
  solution: Solution;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  toggleFavorite: (id: string) => void;
  favorites: string[];
  showMoreDetails?: boolean;
}

export function SolutionBlock({
  solution,
  isExpanded,
  onToggle,
  toggleFavorite,
  favorites,
  showMoreDetails = false,
}: SolutionBlockProps) {
  return (
    <div className="bg-[#fdfdfd] relative rounded-[4px] shrink-0 w-full">
      <div
        role="button"
        tabIndex={0}
        onClick={() => onToggle(solution.id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle(solution.id);
          }
        }}
        className="solution-block__header relative flex w-full shrink-0 cursor-pointer items-center gap-[12px] overflow-hidden rounded-[4px] px-[14px] py-[8px] hover:bg-[rgba(0,0,0,0.03)]"
      >
        <div className="pointer-events-none flex w-[72px] shrink-0 items-center justify-center opacity-[0.85]">
          <SolutionIllustration id={solution.illustrationId} />
        </div>

        <div className="flex min-w-0 flex-[1_0_0] flex-col gap-[4px]">
          <p className="font-['SB_Sans_Interface:Semibold',sans-serif] text-[16px] leading-[24px] tracking-[0.15px] text-[#41424e]">
            {solution.title}
          </p>
          <p className="font-['SB_Sans_Interface:Regular',sans-serif] text-[12px] leading-[16px] tracking-[0.1px] text-[#6d707f]">
            {solution.description}
          </p>
        </div>

        <div className="flex shrink-0 items-center">
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

      {isExpanded && solution.services.length > 0 && (
        <div className="px-[14px] pb-[8px]">
          <ServiceItemsContainer showMoreDetails={showMoreDetails}>
            {solution.services.map((service) => (
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
      )}
    </div>
  );
}
