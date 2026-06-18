import React, { useState } from 'react';
import { Switch } from './ui/switch';
import { ServiceCardItem } from './navigationServiceUi';
import { CategoryBlock, PlatformCategoryBlock } from './navigationCategoryBlocks';
import { CategoryDragProvider } from './CategoryDragContext';
import { CategorySortableList } from './CategorySortableList';
import { FavoritesList } from './FavoritesList';
import { NavigationMenuScrim } from './NavigationMenuScrim';
import { NavigationMenuMainPanel } from './NavigationMenuMainPanel';
import { NavTabServicesGridIcon } from './navigationTabIcons';
import { NavigationMiniBanners } from './navigationMiniBanners';
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
  imgIconColor4 as imgIcon2Color4,
  imgIconColor5 as imgIcon2Color5,
  imgIconColor6 as imgIcon2Color6,
  imgIconColor7 as imgIcon2Color7,
  imgIconColor8 as imgIcon2Color8,
  imgIconColor9 as imgIcon2Color9,
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

const PLATFORM_MEGASERVICE_IDS = getMegaserviceIdsFromPlatformCategories(PLATFORM_SERVICE_CATEGORIES);
const CONTROL_MEGASERVICE_IDS = getMegaserviceIdsFromControlCategories(CONTROL_CATEGORIES);
const ALL_MEGASERVICE_IDS = [...PLATFORM_MEGASERVICE_IDS, ...CONTROL_MEGASERVICE_IDS];

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

const CONTROL_QUICK_ACCESS_CARDS = [
  { icon: imgIcon2Color7, title: 'Обсерватория', subtitle: 'Мониторинг' },
  { icon: imgIcon2Color8, title: 'Менеджер ресурсов', subtitle: 'Управление ресурсами' },
  { icon: imgIcon2Color4, title: 'Контроль затрат', subtitle: 'Управление финансами' },
  { icon: imgIcon2Color9, title: 'Пользователи', subtitle: 'Управление доступами' },
  { icon: imgIcon2Color6, title: 'IAM', subtitle: 'Роли' },
  { icon: imgIcon2Color5, title: 'Администрирование', subtitle: 'Оргструктура, квоты' },
] as const;

function QuickAccessCard({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="bg-[#fdfdfd] min-h-[32px] relative rounded-[4px] cursor-pointer hover:bg-[rgba(0,0,0,0.02)]">
      <div className="flex flex-row items-center min-h-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center min-h-[inherit] p-[8px] relative size-full">
          <div className="bg-[rgba(238,239,243,0.5)] content-stretch flex items-center p-[6px] relative rounded-[2px] shrink-0">
            <div className="relative shrink-0 size-[24px]">
              <div
                className="absolute bg-[#8b8e9b] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px]"
                style={{ maskImage: `url('${icon}')` }}
              />
            </div>
          </div>
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start justify-center leading-[16px] min-w-px not-italic relative whitespace-nowrap">
            <p className="font-['SB_Sans_Interface:Semibold',sans-serif] overflow-hidden relative shrink-0 text-[#41424e] text-[13px] text-ellipsis w-full">
              {title}
            </p>
            <p className="font-['SB_Sans_Interface:Regular',sans-serif] overflow-hidden relative shrink-0 text-[#8b8e9b] text-[12px] text-ellipsis tracking-[0.1px] w-full">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NavigationMenuPrototype2() {
  const showPlatformSelector = false;
  const showSolutionsTab = false;
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
    setExpandedMegaservices((prev) => [...new Set([...prev, ...PLATFORM_MEGASERVICE_IDS])]);
  };

  const collapseAllPlatform = () => {
    setExpandedPlatformCategories([]);
    setExpandedMegaservices((prev) => prev.filter((id) => !PLATFORM_MEGASERVICE_IDS.includes(id)));
  };


  const isAllExpanded =
    activeTab === 'platform'
      ? PLATFORM_SERVICE_CATEGORIES.every((c) => expandedPlatformCategories.includes(c.id)) &&
        PLATFORM_MEGASERVICE_IDS.every((id) => expandedMegaservices.includes(id))
      : CONTROL_CATEGORIES.every((c) => expandedCategories.includes(c.id)) &&
        CONTROL_MEGASERVICE_IDS.every((id) => expandedMegaservices.includes(id));

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

  const toggleMegaservice = (megaserviceId: string) => {
    if (expandedMegaservices.includes(megaserviceId)) {
      setExpandedMegaservices(expandedMegaservices.filter((id) => id !== megaserviceId));
    } else {
      setExpandedMegaservices([...expandedMegaservices, megaserviceId]);
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
            <NavigationMenuMainPanel>
              <div className="content-stretch flex flex-col gap-[8px] items-start pt-[16px] pb-0 relative pr-[16px]">

                {/* Quick access cards */}
                <div className="gap-x-[4px] gap-y-[4px] grid w-full shrink-0 grid-cols-3 grid-rows-[repeat(2,fit-content(100%))]">
                  {CONTROL_QUICK_ACCESS_CARDS.map((card) => (
                    <QuickAccessCard
                      key={card.title}
                      icon={card.icon}
                      title={card.title}
                      subtitle={card.subtitle}
                    />
                  ))}
                </div>

                {/* Search and Controls */}
                <div className="content-stretch flex flex-col gap-[8px] items-start relative rounded-[8px] shrink-0 w-full">
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

                  <div className="flex w-full min-h-[34px] items-center justify-between">
                    <div className="flex items-center p-[3px] relative rounded-[4px] shrink-0">
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
                            <p className={`font-['SB_Sans_Interface:Semibold',sans-serif] leading-[16px] not-italic relative shrink-0 ${activeTab === 'platform' ? 'text-[#41424e]' : 'text-[#6d707f]'} text-[12px] whitespace-nowrap`}>Сервисы</p>
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

                  <NavigationMiniBanners />
                </div>

                {activeTab === 'platform' && (showFilteredCatalog || !searchQuery.trim()) && (
                  <CategorySortableList className="nav-tab-panel w-full">
                  {platformCategoryOrder.map((categoryId, index) => {
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
    </NavigationMenuScrim>
    </CategoryDragProvider>
  );
}
