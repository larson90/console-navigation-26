import React, { useCallback, useMemo, useState } from 'react';
import { Switch } from './ui/switch';
import { NavigationFavoritesBlock } from './NavigationFavoritesBlock';
import { NavigationMenuSearchInput } from './NavigationMenuSearchInput';
import { NavigationMenuDrawerLayout } from './NavigationMenuDrawerLayout';
import { NavigationMenuScrim } from './NavigationMenuScrim';
import { NavigationMenuMainPanel } from './NavigationMenuMainPanel';
import { NavigationSidebarBottomMenu } from './navigationSidebarBottom';
import { CategoryBlock, PlatformCategoryBlock as SharedPlatformCategoryBlock } from './navigationCategoryBlocks';
import { CategoryDragProvider } from './CategoryDragContext';
import { CategorySortableList } from './CategorySortableList';
import { CategoryListEndDropZone } from './CategoryListEndDropZone';
import { NAV_CATEGORY_TYPE } from './categoryDnd';
import {
  applyCategoryMoveToOrders,
  buildVisibleCategoryEntries,
} from './unifiedCategoryOrder';
import { CategoryColorSettings } from './CategoryColorSettings';
import { useFavorites } from '../hooks/useFavorites';
import { useRecentServices } from '../hooks/useRecentServices';
import { useCategoryColors } from '../hooks/useCategoryColors';
import {
  PLATFORM_SERVICE_CATEGORIES,
  usePlatformServiceSearch,
} from '../hooks/usePlatformServiceSearch';
import { useExpandCategoriesOnSearch } from '../hooks/useExpandCategoriesOnSearch';
import { useMegaserviceExpansion } from '../hooks/useMegaserviceExpansion';
import {
  getMegaserviceIdsFromPlatformCategories,
  getMegaserviceIdsFromControlCategories,
  CONTROL_CATEGORIES,
} from '../data/serviceCatalog';
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
import svgPaths from "../../imports/MainMenuDesktop/svg-znqodigjzs";

/** В прототипе 1 «Центр управления» не дублирует platform-категории (Мониторинг, Менеджер ресурсов). */
const PROTOTYPE1_CONTROL_CATEGORIES = CONTROL_CATEGORIES.filter(
  (category) => !PLATFORM_SERVICE_CATEGORIES.some((platform) => platform.id === category.id),
);

const PROTOTYPE1_PLATFORM_MEGASERVICE_IDS = getMegaserviceIdsFromPlatformCategories(PLATFORM_SERVICE_CATEGORIES);
const PROTOTYPE1_CONTROL_MEGASERVICE_IDS = getMegaserviceIdsFromControlCategories(PROTOTYPE1_CONTROL_CATEGORIES);
const PROTOTYPE1_ALL_MEGASERVICE_IDS = [
  ...PROTOTYPE1_PLATFORM_MEGASERVICE_IDS,
  ...PROTOTYPE1_CONTROL_MEGASERVICE_IDS,
];

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


const MEGASERVICE_EXPANSION_STORAGE_KEY = 'lk-megaservice-expansion:1';

export default function NavigationMenuPrototype1() {
  const showSolutionsTab = false;
  const { favorites, favoriteServices, drop, toggleFavorite, moveFavorite, isDraggingService, favoritesDragClassName, sortFavoritesAlphabetically, clearAllFavorites } =
    useFavorites(imgIcon2Color13);
  const { recentServices, clearRecentServices } = useRecentServices(imgIcon2Color13);
  const { categoryColors, colorsEnabled, setCategoryColor, setColorsEnabled, resetCategoryColors } =
    useCategoryColors();
  const [searchQuery, setSearchQuery] = useState('');
  const [moreDetails, setMoreDetails] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    PROTOTYPE1_CONTROL_CATEGORIES.map((c) => c.id),
  );
  const [expandedPlatformCategories, setExpandedPlatformCategories] = useState<string[]>(
    PLATFORM_SERVICE_CATEGORIES.map((c) => c.id),
  );
  const {
    expandedPlatformMegaservices,
    expandedControlMegaservices,
    togglePlatformMegaservice,
    toggleControlMegaservice,
    setAllPlatformMegaservicesExpanded,
    setAllControlMegaservicesExpanded,
    setExpandedPlatformMegaservices,
    setExpandedControlMegaservices,
    restoreMegaserviceExpansion,
  } = useMegaserviceExpansion({
    storageKey: MEGASERVICE_EXPANSION_STORAGE_KEY,
    platformIds: PROTOTYPE1_PLATFORM_MEGASERVICE_IDS,
    controlIds: PROTOTYPE1_CONTROL_MEGASERVICE_IDS,
    controlDefaultExpanded: false,
  });
  const [categoryOrder, setCategoryOrder] = useState<string[]>(
    PROTOTYPE1_CONTROL_CATEGORIES.map((c) => c.id),
  );
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
    setExpandedCategories(PROTOTYPE1_CONTROL_CATEGORIES.map((cat) => cat.id));
    setAllPlatformMegaservicesExpanded(true);
    setAllControlMegaservicesExpanded(true);
  };

  const collapseAll = () => {
    setExpandedPlatformCategories([]);
    setExpandedCategories([]);
    setAllPlatformMegaservicesExpanded(false);
    setAllControlMegaservicesExpanded(false);
  };

  const isAllExpanded =
    PLATFORM_SERVICE_CATEGORIES.every((c) => expandedPlatformCategories.includes(c.id)) &&
    PROTOTYPE1_CONTROL_CATEGORIES.every((c) => expandedCategories.includes(c.id)) &&
    PROTOTYPE1_PLATFORM_MEGASERVICE_IDS.every((id) => expandedPlatformMegaservices.includes(id)) &&
    PROTOTYPE1_CONTROL_MEGASERVICE_IDS.every((id) => expandedControlMegaservices.includes(id));

  const toggleExpandAllCategories = () => {
    if (isAllExpanded) {
      collapseAll();
    } else {
      expandAll();
    }
  };

  const handleMoreDetailsChange = (checked: boolean) => {
    setMoreDetails(checked);
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

  const { filteredCategories, showFilteredCatalog } = usePlatformServiceSearch(searchQuery);

  const filteredControlCategories = searchQuery.trim() === ''
    ? PROTOTYPE1_CONTROL_CATEGORIES
    : PROTOTYPE1_CONTROL_CATEGORIES.map(category => {
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

  useExpandCategoriesOnSearch({
    searchQuery,
    platformCategoryIds: filteredCategories.map((c) => c.id),
    controlCategoryIds: filteredControlCategories.map((c) => c.id),
    platformMegaserviceIds: getMegaserviceIdsFromPlatformCategories(filteredCategories),
    controlMegaserviceIds: getMegaserviceIdsFromControlCategories(filteredControlCategories),
    setExpandedPlatformCategories,
    setExpandedCategories,
    setExpandedPlatformMegaservices,
    setExpandedControlMegaservices,
  });

  const visiblePlatformIds = useMemo(
    () => new Set(filteredCategories.map((category) => category.id)),
    [filteredCategories],
  );
  const visibleControlIds = useMemo(
    () => new Set(filteredControlCategories.map((category) => category.id)),
    [filteredControlCategories],
  );

  const visibleCategoryEntries = useMemo(
    () =>
      buildVisibleCategoryEntries({
        platformOrder: platformCategoryOrder,
        controlOrder: categoryOrder,
        visiblePlatformIds: showFilteredCatalog || !searchQuery.trim() ? visiblePlatformIds : new Set(),
        visibleControlIds,
      }),
    [
      platformCategoryOrder,
      categoryOrder,
      showFilteredCatalog,
      searchQuery,
      visiblePlatformIds,
      visibleControlIds,
    ],
  );

  const moveUnifiedCategory = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const next = applyCategoryMoveToOrders(
        platformCategoryOrder,
        categoryOrder,
        visibleCategoryEntries,
        dragIndex,
        hoverIndex,
      );
      setPlatformCategoryOrder(next.platformOrder);
      setCategoryOrder(next.controlOrder);
    },
    [platformCategoryOrder, categoryOrder, visibleCategoryEntries],
  );

  return (
    <CategoryDragProvider
      onSessionStart={() => ({
        platformCategories: expandedPlatformCategories,
        controlCategories: expandedCategories,
        platformMegaservices: expandedPlatformMegaservices,
        controlMegaservices: expandedControlMegaservices,
      })}
      onSessionEnd={(snapshot) => {
        setExpandedPlatformCategories(snapshot.platformCategories);
        setExpandedCategories(snapshot.controlCategories);
        restoreMegaserviceExpansion(snapshot.platformMegaservices, snapshot.controlMegaservices);
      }}
    >
    <NavigationMenuScrim>
          <NavigationMenuDrawerLayout
            search={
              <NavigationMenuSearchInput
                value={searchQuery}
                onChange={setSearchQuery}
                searchIconMask={imgIcon2Color10}
              />
            }
          >
            <div className="flex items-start flex-1 min-h-0 h-full w-full pl-[16px] pt-0 relative">

            {/* Left Sidebar */}
            <div className="h-full relative shrink-0 w-[216px]">
              <div className="content-stretch flex flex-col isolate items-start justify-between pt-[16px] pb-[16px] relative size-full">
                <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full z-[2]">

                  <NavigationFavoritesBlock
                    dropRef={drop}
                    dragClassName={favoritesDragClassName}
                    isDraggingService={isDraggingService}
                    favoriteServices={favoriteServices}
                    recentServices={recentServices}
                    onToggleFavorite={toggleFavorite}
                    onMoveFavorite={moveFavorite}
                    onSortFavorites={sortFavoritesAlphabetically}
                    onClearFavorites={clearAllFavorites}
                    onClearRecent={clearRecentServices}
                  />
                </div>

                <NavigationSidebarBottomMenu showMarketplace />
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
            <NavigationMenuMainPanel>
              <div className="content-stretch flex flex-col gap-[8px] items-start pb-0 relative pr-[20px]">

                {/* Controls */}
                <div className="content-stretch flex flex-col gap-[8px] items-start pt-[16px] relative rounded-[8px] shrink-0 w-full">
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
                        Описание
                      </span>
                    </label>
                    <CategoryColorSettings
                      categoryColors={categoryColors}
                      colorsEnabled={colorsEnabled}
                      onColorChange={setCategoryColor}
                      onColorsEnabledChange={setColorsEnabled}
                      onReset={resetCategoryColors}
                    />
                    <button
                      type="button"
                      onClick={toggleExpandAllCategories}
                      aria-label={isAllExpanded ? 'Свернуть все категории' : 'Развернуть все категории'}
                      className="nav-icon-btn nav-toolbar-btn cursor-pointer"
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

                <CategorySortableList className="w-full">
                  {visibleCategoryEntries.map((entry, index) => {
                    if (entry.scope === 'platform') {
                      const category = filteredCategories.find((item) => item.id === entry.id);
                      if (!category) return null;

                      return (
                        <SharedPlatformCategoryBlock
                          key={`platform-${entry.id}`}
                          category={category}
                          index={index}
                          isExpanded={expandedPlatformCategories.includes(category.id)}
                          isHovered={hoveredPlatformCategory === category.id}
                          onToggle={togglePlatformCategory}
                          onMove={moveUnifiedCategory}
                          onHover={setHoveredPlatformCategory}
                          toggleFavorite={toggleFavorite}
                          favorites={favorites}
                          showMoreDetails={moreDetails}
                          searchQuery={searchQuery}
                          expandedMegaservices={expandedPlatformMegaservices}
                          onToggleMegaservice={togglePlatformMegaservice}
                          categoryColors={categoryColors}
                          colorsEnabled={colorsEnabled}
                          dragType={NAV_CATEGORY_TYPE}
                        />
                      );
                    }

                    const category = filteredControlCategories.find((item) => item.id === entry.id);
                    if (!category) return null;

                    return (
                      <CategoryBlock
                        key={`control-${entry.id}`}
                        category={category}
                        index={index}
                        isExpanded={expandedCategories.includes(category.id)}
                        isHovered={hoveredCategory === category.id}
                        onToggle={toggleCategory}
                        onMove={moveUnifiedCategory}
                        onHover={setHoveredCategory}
                        toggleFavorite={toggleFavorite}
                        favorites={favorites}
                        showMoreDetails={moreDetails}
                        searchQuery={searchQuery}
                        expandedMegaservices={expandedControlMegaservices}
                        onToggleMegaservice={toggleControlMegaservice}
                        categoryColors={categoryColors}
                        colorsEnabled={colorsEnabled}
                        dragType={NAV_CATEGORY_TYPE}
                      />
                    );
                  })}
                  <CategoryListEndDropZone
                    type={NAV_CATEGORY_TYPE}
                    itemCount={visibleCategoryEntries.length}
                    onMove={moveUnifiedCategory}
                  />
                </CategorySortableList>

                {showSolutionsTab && (
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative w-full">
                    <div className="content-stretch flex gap-[4px] items-start relative shrink-0 w-full">
                      {SOLUTION_CARDS.slice(0, 2).map((solution) => (
                        <div key={solution.id} className="nav-solution-card bg-[#fdfdfd] flex-[1_0_0] h-[80px] min-w-px relative rounded-[4px] cursor-pointer">
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
                                    <div className="flex flex-col justify-center not-italic overflow-hidden relative shrink-0 text-ellipsis whitespace-nowrap">
                                      <p className="nav-solution-title font-medium text-[14px] leading-[20px] tracking-[0.15px] text-[#41424e] overflow-hidden text-ellipsis">{solution.title}</p>
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
                          <div key={solution.id} className="nav-solution-card bg-[#fdfdfd] flex-[1_0_0] h-[80px] min-w-px relative rounded-[4px] cursor-pointer">
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
                                      <div className="flex flex-col justify-center not-italic overflow-hidden relative shrink-0 text-ellipsis whitespace-nowrap">
                                        <p className="nav-solution-title font-medium text-[14px] leading-[20px] tracking-[0.15px] text-[#41424e] overflow-hidden text-ellipsis">{solution.title}</p>
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
            </NavigationMenuMainPanel>

          </div>
          </NavigationMenuDrawerLayout>
    </NavigationMenuScrim>
    </CategoryDragProvider>
  );
}
