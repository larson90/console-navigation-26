import React, { useState } from 'react';
import { Switch } from './ui/switch';
import { ServiceCardItem } from './navigationServiceUi';
import { CategoryBlock, PlatformCategoryBlock, SolutionBlock } from './navigationCategoryBlocks';
import { CategoryDragProvider } from './CategoryDragContext';
import { CategorySortableList } from './CategorySortableList';
import { FavoritesList } from './FavoritesList';
import { NavigationMenuScrim } from './NavigationMenuScrim';
import { NavigationMenuMainPanel } from './NavigationMenuMainPanel';
import { NavTabServicesGridIcon } from './navigationTabIcons';
import { NavigationSidebarBottomMenu } from './navigationSidebarBottom';
import { PlatformSelector } from './PlatformSelector';
import { CategoryColorSettings } from './CategoryColorSettings';
import { useFavorites } from '../hooks/useFavorites';
import { useCategoryColors } from '../hooks/useCategoryColors';
import {
  PLATFORM_SERVICE_CATEGORIES,
  usePlatformServiceSearch,
} from '../hooks/usePlatformServiceSearch';
import { useExpandCategoriesOnSearch } from '../hooks/useExpandCategoriesOnSearch';

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

export default function NavigationMenuPrototype3() {
  const showPlatformSelector = false;
  const showSolutionsTab = true;
  const { favorites, favoriteServices, drop, toggleFavorite, moveFavorite, favoritesDragClassName } =
    useFavorites(imgIcon2Color13);
  const { categoryColors, colorsEnabled, setCategoryColor, setColorsEnabled, resetCategoryColors } =
    useCategoryColors();
  const [searchQuery, setSearchQuery] = useState('');
  const [moreDetails, setMoreDetails] = useState(false);
  const [activeTab, setActiveTab] = useState<'platform' | 'control' | 'solutions'>('platform');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(CONTROL_CATEGORIES.map(c => c.id));
  const [expandedPlatformCategories, setExpandedPlatformCategories] = useState<string[]>(
    PLATFORM_SERVICE_CATEGORIES.map((c) => c.id),
  );
  const [expandedMegaservices, setExpandedMegaservices] = useState<string[]>(ALL_MEGASERVICE_IDS);
  const [categoryOrder, setCategoryOrder] = useState<string[]>(CONTROL_CATEGORIES.map(c => c.id));
  const [platformCategoryOrder, setPlatformCategoryOrder] = useState<string[]>(
    PLATFORM_SERVICE_CATEGORIES.map((c) => c.id),
  );
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredPlatformCategory, setHoveredPlatformCategory] = useState<string | null>(null);
  const [expandedSolutions, setExpandedSolutions] = useState<string[]>(SOLUTIONS.map(s => s.id));

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
    setExpandedMegaservices((prev) => [...new Set([...prev, ...CONTROL_MEGASERVICE_IDS])]);
  };

  const collapseAll = () => {
    setExpandedCategories([]);
    setExpandedMegaservices((prev) => prev.filter((id) => !CONTROL_MEGASERVICE_IDS.includes(id)));
  };

  const expandAllPlatform = () => {
    const allCategoryIds = PLATFORM_SERVICE_CATEGORIES.map((cat) => cat.id);
    setExpandedPlatformCategories(allCategoryIds);
    setExpandedCategories(CONTROL_CATEGORIES.map((cat) => cat.id));
    setExpandedMegaservices((prev) => [...new Set([...prev, ...ALL_MEGASERVICE_IDS])]);
  };

  const collapseAllPlatform = () => {
    setExpandedPlatformCategories([]);
    setExpandedCategories([]);
    setExpandedMegaservices((prev) => prev.filter((id) => !ALL_MEGASERVICE_IDS.includes(id)));
  };


  const isAllExpanded =
    activeTab === 'platform'
      ? PLATFORM_SERVICE_CATEGORIES.every((c) => expandedPlatformCategories.includes(c.id)) &&
        CONTROL_CATEGORIES.every((c) => expandedCategories.includes(c.id)) &&
        ALL_MEGASERVICE_IDS.every((id) => expandedMegaservices.includes(id))
      : activeTab === 'control'
        ? CONTROL_CATEGORIES.every((c) => expandedCategories.includes(c.id)) &&
          CONTROL_MEGASERVICE_IDS.every((id) => expandedMegaservices.includes(id))
        : SOLUTIONS.every((s) => expandedSolutions.includes(s.id));

  const toggleExpandAllCategories = () => {
    if (activeTab === 'platform') {
      if (isAllExpanded) collapseAllPlatform();
      else expandAllPlatform();
    } else if (activeTab === 'control') {
      if (isAllExpanded) collapseAll();
      else expandAll();
    } else if (isAllExpanded) {
      setExpandedSolutions([]);
    } else {
      setExpandedSolutions(SOLUTIONS.map((s) => s.id));
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

  const toggleMegaservice = (megaserviceId: string) => {
    if (expandedMegaservices.includes(megaserviceId)) {
      setExpandedMegaservices(expandedMegaservices.filter((id) => id !== megaserviceId));
    } else {
      setExpandedMegaservices([...expandedMegaservices, megaserviceId]);
    }
  };

  const toggleSolution = (solutionId: string) => {
    if (expandedSolutions.includes(solutionId)) {
      setExpandedSolutions(expandedSolutions.filter(id => id !== solutionId));
    } else {
      setExpandedSolutions([...expandedSolutions, solutionId]);
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
    megaserviceIds: [
      ...getMegaserviceIdsFromPlatformCategories(filteredCategories),
      ...getMegaserviceIdsFromControlCategories(filteredControlCategories),
    ],
    setExpandedPlatformCategories,
    setExpandedCategories,
    setExpandedMegaservices,
  });

  return (
    <CategoryDragProvider
      onSessionStart={() => ({
        platformCategories: expandedPlatformCategories,
        controlCategories: expandedCategories,
        megaservices: expandedMegaservices,
      })}
      onSessionEnd={(snapshot) => {
        setExpandedPlatformCategories(snapshot.platformCategories);
        setExpandedCategories(snapshot.controlCategories);
        setExpandedMegaservices(snapshot.megaservices);
      }}
    >
    <NavigationMenuScrim>
          <div className="flex items-start w-full h-full pl-[16px] pt-0 relative">

            {/* Left Sidebar */}
            <div className="h-full relative shrink-0 w-[216px]">
              <div className="content-stretch flex flex-col isolate items-start justify-between pt-[16px] pb-[16px] pl-[16px] relative size-full">
                <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full z-[2]">
                  {showPlatformSelector && <PlatformSelector />}

                  {/* Favorites */}
                  <div
                    ref={drop}
                    className={`nav-favorites-block bg-[#fdfdfd] content-stretch flex flex-col items-start relative rounded-[4px] w-full shrink-0 ${favoritesDragClassName}`}
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

                    <div className="nav-favorites-block__content relative w-full shrink-0 px-[8px] pb-[8px]">
                      {favoriteServices.length === 0 ? (
                        <div className="bg-[rgba(238,239,243,0.5)] relative rounded-[2px] shrink-0 w-full">
                          <div className="flex flex-col items-center overflow-clip rounded-[inherit] w-full">
                            <div className="content-stretch flex flex-col gap-[8px] items-center p-[12px] relative w-full">
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
                          onMoveFavorite={moveFavorite}
                        />
                      )}
                    </div>
                  </div>
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

                  {/* Search */}
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
                            placeholder="Поиск по категориям, сервисам и подсервисам"
                            className="flex-[1_0_0] font-['SB_Sans_Interface:Regular',sans-serif] leading-[20px] min-w-px not-italic overflow-hidden relative text-[#41424e] text-[14px] text-ellipsis tracking-[0.1px] whitespace-nowrap bg-transparent border-none outline-none placeholder:text-[#aaaebd]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="content-stretch flex w-full shrink-0 min-h-[34px] items-center justify-between">
                    <div className="content-stretch flex items-center p-[3px] relative rounded-[4px] shrink-0">
                      <div aria-hidden="true" className="absolute border border-[#dde0ea] border-solid inset-0 pointer-events-none rounded-[4px]" />
                      <div className="relative shrink-0">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
                          <button
                            onClick={() => setActiveTab('platform')}
                            className={`${activeTab === 'platform' ? 'bg-white' : ''} content-stretch flex gap-[4px] h-[28px] items-center justify-center min-w-[28px] overflow-clip px-[16px] relative rounded-[2px] shrink-0 cursor-pointer nav-tab-btn`}
                          >
                            <span
                              className={`inline-flex shrink-0 size-[14px] ${activeTab === 'platform' ? 'text-[#41424e]' : 'text-[#6d707f]'}`}
                              aria-hidden
                            >
                              <NavTabServicesGridIcon />
                            </span>
                            <p className={`font-['SB_Sans_Interface:Semibold',sans-serif] leading-[16px] not-italic relative shrink-0 ${activeTab === 'platform' ? 'text-[#41424e]' : 'text-[#6d707f]'} text-[12px] whitespace-nowrap`}>Все сервисы</p>
                          </button>
                          <button
                            onClick={() => setActiveTab('control')}
                            className={`${activeTab === 'control' ? 'bg-white' : ''} content-stretch flex gap-[4px] h-[28px] items-center justify-center min-w-[28px] overflow-clip px-[16px] relative rounded-[2px] shrink-0 cursor-pointer nav-tab-btn`}
                          >
                            <span
                              className={`inline-flex shrink-0 size-[14px] ${activeTab === 'control' ? 'text-[#41424e]' : 'text-[#6d707f]'}`}
                              aria-hidden
                            >
                              <svg viewBox="0 0 12 12" fill="none" className="size-full">
                                <circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1" />
                                <path d="M6 1.5V3M6 9V10.5M1.5 6H3M9 6H10.5M2.8 2.8L3.8 3.8M8.2 8.2L9.2 9.2M9.2 2.8L8.2 3.8M3.8 8.2L2.8 9.2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                              </svg>
                            </span>
                            <p className={`font-['SB_Sans_Interface:Semibold',sans-serif] leading-[16px] not-italic relative shrink-0 ${activeTab === 'control' ? 'text-[#41424e]' : 'text-[#6d707f]'} text-[12px] whitespace-nowrap`}>Центр управления</p>
                          </button>
                          {showSolutionsTab && (
                            <button
                              onClick={() => setActiveTab('solutions')}
                              className={`${activeTab === 'solutions' ? 'bg-white' : ''} content-stretch flex gap-[4px] h-[28px] items-center justify-center min-w-[28px] overflow-clip px-[16px] relative rounded-[2px] shrink-0 cursor-pointer nav-tab-btn`}
                            >
                            <span
                                className={`inline-flex shrink-0 size-[14px] ${activeTab === 'solutions' ? 'text-[#41424e]' : 'text-[#6d707f]'}`}
                                aria-hidden
                              >
                                <svg viewBox="0 0 12 12" fill="none" className="size-full">
                                  <path d="M6 1.2L7.1 4.1L10 5.2L7.1 6.3L6 9.2L4.9 6.3L2 5.2L4.9 4.1L6 1.2Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
                                  <path d="M9.8 8.2L10.2 9.2L11.2 9.6L10.2 10L9.8 11L9.4 10L8.4 9.6L9.4 9.2L9.8 8.2Z" fill="currentColor" />
                                </svg>
                              </span>
                              <p className={`font-['SB_Sans_Interface:Semibold',sans-serif] leading-[16px] not-italic relative shrink-0 ${activeTab === 'solutions' ? 'text-[#41424e]' : 'text-[#6d707f]'} text-[12px] whitespace-nowrap`}>Решения</p>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

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
                  </div>
                </div>

                {activeTab === 'platform' &&
                  (showFilteredCatalog || filteredControlCategories.length > 0 || !searchQuery.trim()) && (
                  <CategorySortableList className="nav-tab-panel w-full">
                  {platformCategoryOrder
                    .filter((categoryId) => categoryId !== 'security-administration')
                    .map((categoryId, index) => {
                      const category = filteredCategories.find((c) => c.id === categoryId);
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
                          searchQuery={searchQuery}
                          expandedMegaservices={expandedMegaservices}
                          onToggleMegaservice={toggleMegaservice}
                          categoryColors={categoryColors}
                          colorsEnabled={colorsEnabled}
                        />
                      );
                    })}
                  {categoryOrder.map((categoryId, index) => {
                    const category = filteredControlCategories.find((c) => c.id === categoryId);
                    if (!category) return null;

                    const platformCount = platformCategoryOrder.filter(
                      (id) => id !== 'security-administration' && filteredCategories.some((c) => c.id === id),
                    ).length;

                    return (
                      <CategoryBlock
                        key={`control-${category.id}`}
                        category={category}
                        index={platformCount + index}
                        isExpanded={expandedCategories.includes(category.id)}
                        isHovered={hoveredCategory === category.id}
                        onToggle={toggleCategory}
                        onMove={moveCategory}
                        onHover={setHoveredCategory}
                        toggleFavorite={toggleFavorite}
                        favorites={favorites}
                        showMoreDetails={moreDetails}
                        searchQuery={searchQuery}
                        expandedMegaservices={expandedMegaservices}
                        onToggleMegaservice={toggleMegaservice}
                        categoryColors={categoryColors}
                        colorsEnabled={colorsEnabled}
                      />
                    );
                  })}
                  </CategorySortableList>
                )}

                {activeTab === 'control' && (
                  <CategorySortableList className="nav-tab-panel w-full">
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
                      searchQuery={searchQuery}
                      expandedMegaservices={expandedMegaservices}
                      onToggleMegaservice={toggleMegaservice}
                      categoryColors={categoryColors}
                      colorsEnabled={colorsEnabled}
                    />
                  );
                })}
                  </CategorySortableList>
                )}

                {activeTab === 'solutions' && (
                  <div className="nav-tab-panel content-stretch flex flex-col gap-[8px] items-start relative w-full">
                    {SOLUTIONS.map((solution) => (
                      <SolutionBlock
                        key={solution.id}
                        solution={solution}
                        isExpanded={expandedSolutions.includes(solution.id)}
                        onToggle={toggleSolution}
                        toggleFavorite={toggleFavorite}
                        favorites={favorites}
                      />
                    ))}
                  </div>
                )}
              </div>
            </NavigationMenuMainPanel>

          </div>
    </NavigationMenuScrim>
    </CategoryDragProvider>
  );
}
