import React, { useCallback, useMemo, useState } from 'react';
import { Switch } from './ui/switch';
import { ServiceCardItem } from './navigationServiceUi';
import { NavTabInfoBlock } from './NavTabInfoBlock';
import { CONTROL_CENTER_INTRO, SOLUTIONS_INTRO } from '../data/tabIntroContent';
import { CategoryBlock, PlatformCategoryBlock, SolutionBlock } from './navigationCategoryBlocks';
import { CategoryDragProvider } from './CategoryDragContext';
import { CategorySortableList } from './CategorySortableList';
import { CategoryListEndDropZone } from './CategoryListEndDropZone';
import { CONTROL_CATEGORY_TYPE, NAV_CATEGORY_TYPE } from './categoryDnd';
import {
  applyCategoryMoveToOrders,
  buildVisibleCategoryEntries,
} from './unifiedCategoryOrder';
import { NavigationFavoritesBlock } from './NavigationFavoritesBlock';
import { NavigationMenuSearchInput } from './NavigationMenuSearchInput';
import { NavigationMenuDrawerLayout } from './NavigationMenuDrawerLayout';
import { NavigationMenuScrim } from './NavigationMenuScrim';
import { NavigationMenuMainPanel } from './NavigationMenuMainPanel';
import { NavTabControlCenterIcon, NavTabServicesGridIcon, NavTabSolutionsIcon } from './navigationTabIcons';
import { NavigationSidebarBottomMenu } from './navigationSidebarBottom';
import { SolutionsMarketplaceBanner } from './SolutionsMarketplaceBanner';
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

import svgPaths from "../../imports/MainMenuDesktop/svg-znqodigjzs";
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
  getMegaserviceIdsFromPlatformCategories,
  getMegaserviceIdsFromControlCategories,
} from '../data/serviceCatalog';
import { type Solution, SOLUTIONS } from '../data/solutionsCatalog';

const PLATFORM_MEGASERVICE_IDS = getMegaserviceIdsFromPlatformCategories(PLATFORM_SERVICE_CATEGORIES);
const CONTROL_MEGASERVICE_IDS = getMegaserviceIdsFromControlCategories(CONTROL_CATEGORIES);
const ALL_MEGASERVICE_IDS = [...PLATFORM_MEGASERVICE_IDS, ...CONTROL_MEGASERVICE_IDS];

const MEGASERVICE_EXPANSION_STORAGE_KEY = 'lk-megaservice-expansion:3';

export default function NavigationMenuPrototype3() {
  const showSolutionsTab = true;
  const { favorites, favoriteServices, drop, toggleFavorite, moveFavorite, isDraggingService, favoritesDragClassName, sortFavoritesAlphabetically, clearAllFavorites } =
    useFavorites(imgIcon2Color13);
  const { recentServices, clearRecentServices } = useRecentServices(imgIcon2Color13);
  const { categoryColors, colorsEnabled, setCategoryColor, setColorsEnabled, resetCategoryColors } =
    useCategoryColors();
  const [searchQuery, setSearchQuery] = useState('');
  const [moreDetails, setMoreDetails] = useState(false);
  const [activeTab, setActiveTab] = useState<'platform' | 'control' | 'solutions'>('platform');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(CONTROL_CATEGORIES.map(c => c.id));
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
    platformIds: PLATFORM_MEGASERVICE_IDS,
    controlIds: CONTROL_MEGASERVICE_IDS,
    controlDefaultExpanded: activeTab === 'control',
  });
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
    const allCategoryIds = CONTROL_CATEGORIES.map(cat => cat.id);
    setExpandedCategories(allCategoryIds);
    setAllControlMegaservicesExpanded(true);
  };

  const collapseAll = () => {
    setExpandedCategories([]);
    setAllControlMegaservicesExpanded(false);
  };

  const expandAllPlatform = () => {
    const allCategoryIds = PLATFORM_SERVICE_CATEGORIES.map((cat) => cat.id);
    setExpandedPlatformCategories(allCategoryIds);
    setExpandedCategories(CONTROL_CATEGORIES.map((cat) => cat.id));
    setAllPlatformMegaservicesExpanded(true);
    setAllControlMegaservicesExpanded(true);
  };

  const collapseAllPlatform = () => {
    setExpandedPlatformCategories([]);
    setExpandedCategories([]);
    setAllPlatformMegaservicesExpanded(false);
    setAllControlMegaservicesExpanded(false);
  };


  const isAllExpanded =
    activeTab === 'platform'
      ? PLATFORM_SERVICE_CATEGORIES.every((c) => expandedPlatformCategories.includes(c.id)) &&
        CONTROL_CATEGORIES.every((c) => expandedCategories.includes(c.id)) &&
        PLATFORM_MEGASERVICE_IDS.every((id) => expandedPlatformMegaservices.includes(id)) &&
        CONTROL_MEGASERVICE_IDS.every((id) => expandedControlMegaservices.includes(id))
      : activeTab === 'control'
        ? CONTROL_CATEGORIES.every((c) => expandedCategories.includes(c.id)) &&
          CONTROL_MEGASERVICE_IDS.every((id) => expandedControlMegaservices.includes(id))
        : false;

  const selectTab = (tab: 'platform' | 'control' | 'solutions') => {
    setActiveTab(tab);
  };

  const toggleExpandAllCategories = () => {
    if (activeTab === 'platform') {
      if (isAllExpanded) collapseAllPlatform();
      else expandAllPlatform();
    } else if (isAllExpanded) {
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

  const visiblePlatformCategoryEntries = useMemo(
    () =>
      buildVisibleCategoryEntries({
        platformOrder: platformCategoryOrder,
        controlOrder: categoryOrder,
        visiblePlatformIds: showFilteredCatalog || !searchQuery.trim() ? visiblePlatformIds : new Set(),
        visibleControlIds,
        excludePlatformIds: ['security-administration'],
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

  const visibleControlCategoryEntries = useMemo(
    () =>
      buildVisibleCategoryEntries({
        platformOrder: [],
        controlOrder: categoryOrder,
        visiblePlatformIds: new Set(),
        visibleControlIds,
      }),
    [categoryOrder, visibleControlIds],
  );

  const moveUnifiedPlatformCategory = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const next = applyCategoryMoveToOrders(
        platformCategoryOrder,
        categoryOrder,
        visiblePlatformCategoryEntries,
        dragIndex,
        hoverIndex,
      );
      setPlatformCategoryOrder(next.platformOrder);
      setCategoryOrder(next.controlOrder);
    },
    [platformCategoryOrder, categoryOrder, visiblePlatformCategoryEntries],
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
              <div className="content-stretch flex flex-col gap-[8px] items-start pb-[20px] relative pr-[20px]">

                <div className="content-stretch flex flex-col gap-[8px] items-start pt-[16px] relative shrink-0 w-full">

                  {/* Tabs */}
                  <div className="content-stretch flex w-full shrink-0 min-h-[34px] items-center justify-between">
                    <div className="content-stretch flex items-center p-[3px] relative rounded-[4px] shrink-0">
                      <div aria-hidden="true" className="absolute border border-[#dde0ea] border-solid inset-0 pointer-events-none rounded-[4px]" />
                      <div className="relative shrink-0">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
                          <button
                            onClick={() => selectTab('platform')}
                            className={`${activeTab === 'platform' ? 'bg-white' : ''} content-stretch flex h-[28px] items-center justify-center min-w-[28px] overflow-clip px-[16px] relative rounded-[2px] shrink-0 cursor-pointer nav-tab-btn`}
                          >
                            <span
                              className={`inline-flex shrink-0 size-[14px] ${activeTab === 'platform' ? 'text-[#41424e]' : 'text-[#6d707f]'}`}
                              aria-hidden
                            >
                              <NavTabServicesGridIcon />
                            </span>
                            <p className="relative shrink-0 whitespace-nowrap">Все сервисы</p>
                          </button>
                          <button
                            onClick={() => selectTab('control')}
                            className={`${activeTab === 'control' ? 'bg-white' : ''} content-stretch flex h-[28px] items-center justify-center min-w-[28px] overflow-clip px-[16px] relative rounded-[2px] shrink-0 cursor-pointer nav-tab-btn`}
                          >
                            <span
                              className={`inline-flex shrink-0 size-[14px] ${activeTab === 'control' ? 'text-[#41424e]' : 'text-[#6d707f]'}`}
                              aria-hidden
                            >
                              <NavTabControlCenterIcon />
                            </span>
                            <p className="relative shrink-0 whitespace-nowrap">Центр управления</p>
                          </button>
                          {showSolutionsTab && (
                            <button
                              onClick={() => selectTab('solutions')}
                              className={`${activeTab === 'solutions' ? 'bg-white' : ''} content-stretch flex h-[28px] items-center justify-center min-w-[28px] overflow-clip px-[16px] relative rounded-[2px] shrink-0 cursor-pointer nav-tab-btn`}
                            >
                            <span
                                className={`inline-flex shrink-0 size-[14px] ${activeTab === 'solutions' ? 'text-[#41424e]' : 'text-[#6d707f]'}`}
                                aria-hidden
                              >
                                <NavTabSolutionsIcon />
                              </span>
                              <p className="relative shrink-0 whitespace-nowrap">Решения</p>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {activeTab !== 'solutions' && (
                    <div className="content-stretch flex gap-[8px] items-center shrink-0">
                      {(activeTab === 'platform' || activeTab === 'control') && (
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
                      )}
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
                    )}
                  </div>
                </div>

                {activeTab === 'platform' &&
                  (showFilteredCatalog || filteredControlCategories.length > 0 || !searchQuery.trim()) && (
                  <CategorySortableList className="nav-tab-panel w-full">
                  {visiblePlatformCategoryEntries.map((entry, index) => {
                    if (entry.scope === 'platform') {
                      const category = filteredCategories.find((item) => item.id === entry.id);
                      if (!category) return null;

                      return (
                        <PlatformCategoryBlock
                          key={`platform-${entry.id}`}
                          category={category}
                          index={index}
                          isExpanded={expandedPlatformCategories.includes(category.id)}
                          isHovered={hoveredPlatformCategory === category.id}
                          onToggle={togglePlatformCategory}
                          onMove={moveUnifiedPlatformCategory}
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
                        onMove={moveUnifiedPlatformCategory}
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
                    itemCount={visiblePlatformCategoryEntries.length}
                    onMove={moveUnifiedPlatformCategory}
                  />
                  </CategorySortableList>
                )}

                {activeTab === 'control' && (
                  <>
                  <NavTabInfoBlock text={CONTROL_CENTER_INTRO} />
                  <CategorySortableList className="nav-tab-panel w-full">
                {visibleControlCategoryEntries.map((entry, index) => {
                  const category = filteredControlCategories.find((item) => item.id === entry.id);
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
                      searchQuery={searchQuery}
                      expandedMegaservices={expandedControlMegaservices}
                      onToggleMegaservice={toggleControlMegaservice}
                      categoryColors={categoryColors}
                      colorsEnabled={colorsEnabled}
                    />
                  );
                })}
                  <CategoryListEndDropZone
                    type={CONTROL_CATEGORY_TYPE}
                    itemCount={visibleControlCategoryEntries.length}
                    onMove={moveCategory}
                  />
                  </CategorySortableList>
                  </>
                )}

                {activeTab === 'solutions' && (
                  <div className="nav-tab-panel nav-solution-list content-stretch flex flex-col items-start relative w-full">
                    <NavTabInfoBlock text={SOLUTIONS_INTRO} />
                    <SolutionsMarketplaceBanner />
                    {SOLUTIONS.map((solution) => (
                      <SolutionBlock
                        key={solution.id}
                        solution={solution}
                        toggleFavorite={toggleFavorite}
                        favorites={favorites}
                        showMoreDetails={moreDetails}
                      />
                    ))}
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
