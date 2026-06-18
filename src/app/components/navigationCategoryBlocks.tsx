import React from 'react';
import { motion } from 'motion/react';
import {
  ServiceCardItem,
  ServiceItemWrapper,
  ServiceWithSubservices,
  CategoryServicesSection,
} from './navigationServiceUi';
import {
  type ServiceCategory,
  type ControlCategory,
  resolveCategoryAccentColor,
  categoryHasAccentSlot,
} from '../data/serviceCatalog';
import { type Solution } from '../data/solutionsCatalog';
import { SolutionIllustration } from './solutionIllustrations';
import { NavCollapse } from './NavCollapse';
import { CONTROL_CATEGORY_TYPE, PLATFORM_CATEGORY_TYPE } from './categoryDnd';
import { useCategoryBlockDrag } from './useCategoryBlockDrag';
import { CategoryDragHandle, CategoryHeaderChevron } from './categoryBlockHeaderUi';
import { useCategoryDrag } from './CategoryDragContext';
import { MegaserviceBlock } from './MegaserviceBlock';
import { navigateToMegaservice } from '../utils/megaserviceNavigation';

const CATEGORY_LAYOUT_TRANSITION = {
  duration: 0.32,
  ease: [0.22, 1, 0.36, 1] as const,
};

function CategoryAccentStripe({ color }: { color: string }) {
  return (
    <div
      aria-hidden="true"
      className="absolute border-l-6 border-solid inset-0 pointer-events-none rounded-[4px]"
      style={{ borderColor: color }}
    />
  );
}

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
  searchQuery?: string;
  expandedMegaservices: string[];
  onToggleMegaservice: (megaserviceId: string) => void;
  onMegaserviceNavigate?: (megaserviceId: string) => void;
  categoryColors?: Record<string, string | null>;
  colorsEnabled?: boolean;
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
  searchQuery?: string;
  expandedMegaservices: string[];
  onToggleMegaservice: (megaserviceId: string) => void;
  onMegaserviceNavigate?: (megaserviceId: string) => void;
  categoryColors?: Record<string, string | null>;
  colorsEnabled?: boolean;
}

function isMegaserviceExpanded(
  megaserviceId: string,
  expandedMegaservices: string[],
  isForceCollapsed: boolean,
): boolean {
  return expandedMegaservices.includes(megaserviceId) && !isForceCollapsed;
}

export function PlatformCategoryBlock({
  category,
  index,
  isExpanded,
  isHovered,
  onToggle,
  onMove,
  onHover,
  toggleFavorite,
  favorites,
  showMoreDetails,
  searchQuery = '',
  expandedMegaservices,
  onToggleMegaservice,
  onMegaserviceNavigate = navigateToMegaservice,
  categoryColors,
  colorsEnabled = true,
}: PlatformCategoryBlockProps) {
  const { isForceCollapsed } = useCategoryDrag();
  const accentColor = resolveCategoryAccentColor(category.id, { categoryColors, colorsEnabled });
  const showAccentStripe = accentColor !== null;
  const hasAccentPadding = colorsEnabled && categoryHasAccentSlot(category.id);
  const effectiveExpanded = isExpanded && !isForceCollapsed;

  const { ref, dragHandleRef, isDragging } = useCategoryBlockDrag({
    type: PLATFORM_CATEGORY_TYPE,
    index,
    title: category.title,
    accentColor,
    hasAccentPadding,
    onMove,
  });

  return (
    <motion.div
      ref={ref}
      layout={!isDragging ? 'position' : false}
      transition={CATEGORY_LAYOUT_TRANSITION}
      onMouseEnter={() => onHover(category.id)}
      onMouseLeave={() => onHover(null)}
      className={`nav-category-block bg-[#fdfdfd] relative rounded-[4px] shrink-0 w-full${isDragging ? ' nav-category-block--dragging' : ''}${isHovered ? ' nav-category-block--hovered' : ''}`}
    >
      {showAccentStripe && <CategoryAccentStripe color={accentColor} />}
      <div className={`content-stretch flex flex-col items-start pr-[8px] py-[8px] relative size-full ${hasAccentPadding ? 'pl-[14px]' : 'pl-[8px]'}`}>
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
            className="nav-interactive content-stretch flex gap-[8px] items-center pr-[8px] py-[4px] relative size-full cursor-pointer rounded-[4px]"
          >
            <div className="flex-[1_0_0] min-w-px relative">
              <div className={`content-stretch flex items-center relative size-full min-h-[32px] ${hasAccentPadding ? 'pl-[12px]' : 'pl-[8px]'}`}>
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0 flex-[1_0_0]">
                  <div className="flex flex-col justify-center not-italic overflow-hidden relative shrink-0 text-ellipsis whitespace-nowrap">
                    <p className="nav-category-title font-semibold text-[16px] leading-[24px] tracking-[0.15px] text-[#41424e] overflow-hidden text-ellipsis">{category.title}</p>
                  </div>
                </div>
                <div className="content-stretch flex gap-[4px] items-center relative shrink-0 ml-auto">
                  <CategoryDragHandle handleRef={dragHandleRef} />
                  <CategoryHeaderChevron expanded={effectiveExpanded} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <NavCollapse open={effectiveExpanded} className="w-full">
          <div className="nav-category-block__body flex w-full flex-col gap-[4px] pt-[4px]">
        {category.megaservice && (
          <MegaserviceBlock
            id={category.megaservice.id}
            title={category.megaservice.title}
            icon={category.megaservice.icon}
            isExpanded={isMegaserviceExpanded(category.megaservice.id, expandedMegaservices, isForceCollapsed)}
            showMoreDetails={showMoreDetails}
            onToggle={onToggleMegaservice}
            onNavigate={onMegaserviceNavigate}
          >
            {category.megaservice.services.map((service) => (
              <ServiceItemWrapper key={service.id} showMoreDetails={showMoreDetails}>
                <ServiceWithSubservices
                  service={service}
                  searchQuery={searchQuery}
                  onAddToFavorites={toggleFavorite}
                  isFavorite={favorites.includes(service.id)}
                  showMoreDetails={showMoreDetails}
                />
              </ServiceItemWrapper>
            ))}
          </MegaserviceBlock>
        )}

        {category.services.length > 0 && (
          <CategoryServicesSection showMoreDetails={showMoreDetails}>
            {category.services.map((service) => (
              <ServiceItemWrapper key={service.id} showMoreDetails={showMoreDetails}>
                <ServiceWithSubservices
                  service={service}
                  searchQuery={searchQuery}
                  onAddToFavorites={toggleFavorite}
                  isFavorite={favorites.includes(service.id)}
                  showMoreDetails={showMoreDetails}
                />
              </ServiceItemWrapper>
            ))}
          </CategoryServicesSection>
        )}

        {category.subcategories?.map((subcategory) => (
          <MegaserviceBlock
            key={subcategory.id}
            id={subcategory.id}
            title={subcategory.title}
            icon={subcategory.icon}
            isExpanded={isMegaserviceExpanded(subcategory.id, expandedMegaservices, isForceCollapsed)}
            showMoreDetails={showMoreDetails}
            onToggle={onToggleMegaservice}
            onNavigate={onMegaserviceNavigate}
          >
            {subcategory.services.map((service) => (
              <ServiceItemWrapper key={service.id} showMoreDetails={showMoreDetails}>
                <ServiceWithSubservices
                  service={service}
                  searchQuery={searchQuery}
                  onAddToFavorites={toggleFavorite}
                  isFavorite={favorites.includes(service.id)}
                  showMoreDetails={showMoreDetails}
                />
              </ServiceItemWrapper>
            ))}
          </MegaserviceBlock>
        ))}

          </div>
        </NavCollapse>

      </div>
    </motion.div>
  );
}

export function CategoryBlock({
  category,
  index,
  isExpanded,
  isHovered,
  onToggle,
  onMove,
  onHover,
  toggleFavorite,
  favorites,
  showMoreDetails,
  searchQuery = '',
  expandedMegaservices,
  onToggleMegaservice,
  onMegaserviceNavigate = navigateToMegaservice,
  categoryColors,
  colorsEnabled = true,
}: CategoryBlockProps) {
  const { isForceCollapsed } = useCategoryDrag();
  const accentColor = resolveCategoryAccentColor(category.id, { categoryColors, colorsEnabled });
  const showAccentStripe = accentColor !== null;
  const hasAccentPadding = colorsEnabled && categoryHasAccentSlot(category.id);
  const effectiveExpanded = isExpanded && !isForceCollapsed;

  const { ref, dragHandleRef, isDragging } = useCategoryBlockDrag({
    type: CONTROL_CATEGORY_TYPE,
    index,
    title: category.title,
    accentColor,
    hasAccentPadding,
    onMove,
  });

  return (
    <motion.div
      ref={ref}
      layout={!isDragging ? 'position' : false}
      transition={CATEGORY_LAYOUT_TRANSITION}
      onMouseEnter={() => onHover(category.id)}
      onMouseLeave={() => onHover(null)}
      className={`nav-category-block bg-[#fdfdfd] relative rounded-[4px] shrink-0 w-full${isDragging ? ' nav-category-block--dragging' : ''}${isHovered ? ' nav-category-block--hovered' : ''}`}
    >
      {showAccentStripe && <CategoryAccentStripe color={accentColor} />}
      <div className={`content-stretch flex flex-col items-start pr-[8px] py-[8px] relative size-full ${hasAccentPadding ? 'pl-[14px]' : 'pl-[8px]'}`}>
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
            className="nav-interactive content-stretch flex gap-[8px] items-center pr-[8px] py-[4px] relative size-full cursor-pointer rounded-[4px]"
          >
            <div className="flex-[1_0_0] min-w-px relative">
              <div className={`content-stretch flex items-center relative size-full min-h-[32px] ${hasAccentPadding ? 'pl-[12px]' : 'pl-[8px]'}`}>
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0 flex-[1_0_0]">
                  <div className="flex flex-col justify-center not-italic overflow-hidden relative shrink-0 text-ellipsis whitespace-nowrap">
                    <p className="nav-category-title font-semibold text-[16px] leading-[24px] tracking-[0.15px] text-[#41424e] overflow-hidden text-ellipsis">{category.title}</p>
                  </div>
                </div>
                <div className="content-stretch flex gap-[4px] items-center relative shrink-0 ml-auto">
                  <CategoryDragHandle handleRef={dragHandleRef} />
                  <CategoryHeaderChevron expanded={effectiveExpanded} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <NavCollapse open={effectiveExpanded} className="w-full">
          <div className="nav-category-block__body flex w-full flex-col gap-[4px] pt-[4px]">
        {category.subcategories.map((subcategory) => (
          <MegaserviceBlock
            key={subcategory.id}
            id={subcategory.id}
            title={subcategory.title}
            icon={subcategory.icon}
            isExpanded={isMegaserviceExpanded(subcategory.id, expandedMegaservices, isForceCollapsed)}
            showMoreDetails={showMoreDetails}
            onToggle={onToggleMegaservice}
            onNavigate={onMegaserviceNavigate}
          >
            {subcategory.items.map((item) => (
              <ServiceItemWrapper key={item.id} showMoreDetails={showMoreDetails}>
                <ServiceWithSubservices
                  service={{
                    id: item.id,
                    icon: subcategory.icon,
                    title: item.title,
                    subtitle: '',
                  }}
                  searchQuery={searchQuery}
                  onAddToFavorites={toggleFavorite}
                  isFavorite={favorites.includes(item.id)}
                  showMoreDetails={showMoreDetails}
                />
              </ServiceItemWrapper>
            ))}
          </MegaserviceBlock>
        ))}

          </div>
        </NavCollapse>
      </div>
    </motion.div>
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
        className="solution-block__header nav-interactive relative flex w-full shrink-0 cursor-pointer items-center gap-[12px] overflow-hidden rounded-[4px] px-[14px] py-[8px]"
      >
        <div className="pointer-events-none flex h-[32px] w-[48px] shrink-0 items-center justify-center opacity-[0.85]">
          <SolutionIllustration id={solution.illustrationId} />
        </div>

        <div className="flex min-w-0 flex-[1_0_0] flex-col gap-[4px]">
          <p className="nav-solution-title font-medium text-[14px] leading-[20px] tracking-[0.15px] text-[#41424e]">
            {solution.title}
          </p>
          <p className="font-['SB_Sans_Interface:Regular',sans-serif] text-[12px] leading-[16px] tracking-[0.1px] text-[#6d707f]">
            {solution.description}
          </p>
        </div>

        <div className="flex shrink-0 items-center">
          <CategoryHeaderChevron expanded={isExpanded} />
        </div>
      </div>

      <NavCollapse open={isExpanded && solution.services.length > 0}>
        <CategoryServicesSection showMoreDetails={showMoreDetails ?? false}>
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
        </CategoryServicesSection>
      </NavCollapse>
    </div>
  );
}
