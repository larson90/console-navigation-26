import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Link } from 'react-router';
import svgPaths from "../../imports/MainMenuDesktop/svg-znqodigjzs";
import svgPathsFrame from "../../imports/Frame1851041041/svg-s81pzj7n11";
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
  imgIconColor as imgIcon2Color,
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
  imgIconColor14 as imgIcon2Color14,
  imgIconColor15 as imgIcon2Color15,
  imgIconColor16 as imgIcon2Color16,
  imgIconColor17 as imgIcon2Color17,
  imgIconColor18 as imgIcon2Color18,
  imgIconColor19 as imgIcon2Color19,
  imgIconColor20 as imgIcon2Color20,
  imgIconColor21 as imgIcon2Color21,
  imgIconColor22 as imgIcon2Color22,
  imgIconColor23 as imgIcon2Color23,
  imgIconColor24 as imgIcon2Color24,
  imgIconColor25 as imgIcon2Color25,
  imgIconColor26 as imgIcon2Color26,
  imgIconColor27 as imgIcon2Color27,
  imgIconColor28 as imgIcon2Color28,
  imgIconColor29 as imgIcon2Color29,
  imgIconColor30 as imgIcon2Color30,
  imgIconColor31 as imgIcon2Color31,
  imgIconColor32 as imgIcon2Color32,
  imgIconColor33 as imgIcon2Color33,
  imgIconColor34 as imgIcon2Color34,
  imgIconColor35 as imgIcon2Color35,
  imgIconColor36 as imgIcon2Color36
} from "../../imports/MainMenuDesktop-1/svg-vz3cs";

interface ServiceCard {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
}

interface MegaService {
  title: string;
  icon: string;
  services: ServiceCard[];
}

interface ServiceCategory {
  id: string;
  title: string;
  megaservice?: MegaService;
  services: ServiceCard[];
}

interface ControlItem {
  id: string;
  title: string;
}

interface ControlSubcategory {
  title: string;
  icon: string;
  items: ControlItem[];
}

interface ControlCategory {
  id: string;
  title: string;
  subcategories: ControlSubcategory[];
}

const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'compute',
    title: 'Инфраструктура',
    megaservice: {
      title: 'Compute',
      icon: imgIcon2Color13,
      services: [
        { id: 'vm', icon: imgIcon2Color14, title: 'Виртуальные машины', subtitle: '' },
        { id: 'subnets', icon: imgIcon2Color15, title: 'Подсети', subtitle: '' },
        { id: 'public-ip', icon: imgIcon2Color16, title: 'Публичные IP', subtitle: '' },
        { id: 'disks', icon: imgIcon2Color17, title: 'Диски', subtitle: '' },
        { id: 'security-groups', icon: imgIcon2Color18, title: 'Группы безопасности', subtitle: '' },
        { id: 'backup', icon: imgIcon2Color19, title: 'Резервное копирование', subtitle: '' },
        { id: 'images', icon: imgIcon2Color20, title: 'Образы', subtitle: '' },
        { id: 'ssh-keys', icon: imgIcon2Color21, title: 'SSH-ключи', subtitle: '' },
        { id: 'placement-groups', icon: imgIcon2Color22, title: 'Группы размещения', subtitle: '' },
        { id: 'vm-management', icon: imgIcon2Color14, title: 'Управление ПО', subtitle: '' },
      ]
    },
    services: [
      { id: 'images-2', icon: imgIcon2Color20, title: 'Образы', subtitle: '' },
      { id: 'ssh-keys-2', icon: imgIcon2Color21, title: 'SSH-ключи', subtitle: '' },
      { id: 'bare-metal', icon: imgIcon2Color23, title: 'Bare Metal', subtitle: '' },
      { id: 'migration', icon: imgIcon2Color26, title: 'Migration', subtitle: '' },
      { id: 'agent-backup', icon: imgIcon2Color24, title: 'Agent Backup', subtitle: '' },
      { id: 'disaster-recovery', icon: imgIcon2Color25, title: 'Disaster Recovery', subtitle: '' },
    ]
  },
  {
    id: 'network',
    title: 'Сеть',
    services: [
      { id: 'subnets-net', icon: imgIcon2Color15, title: 'Подсети', subtitle: '' },
      { id: 'vpc', icon: imgIcon2Color27, title: 'VPC', subtitle: '' },
      { id: 'public-ip-net', icon: imgIcon2Color16, title: 'Публичные IP', subtitle: '' },
      { id: 'virtual-ip', icon: imgIcon2Color32, title: 'Виртуальные IP', subtitle: '' },
      { id: 'snat-gateways', icon: imgIcon2Color28, title: 'sNAT-шлюзы', subtitle: '' },
      { id: 'security-groups-net', icon: imgIcon2Color18, title: 'Группы безопасности', subtitle: '' },
      { id: 'vpn', icon: imgIcon2Color14, title: 'VPN', subtitle: '' },
      { id: 'load-balancer', icon: imgIcon2Color30, title: 'Load Balancer', subtitle: '' },
      { id: 'dns', icon: imgIcon2Color29, title: 'DNS', subtitle: '' },
      { id: 'magic-router', icon: imgIcon2Color31, title: 'Magic Router', subtitle: '' },
    ]
  },
  {
    id: 'storage',
    title: 'Хранение данных',
    services: [
      { id: 'disks-storage', icon: imgIcon2Color17, title: 'Диски', subtitle: '' },
      { id: 'object-storage', icon: imgIcon2Color33, title: 'Object Storage', subtitle: '' },
    ]
  },
  {
    id: 'containers',
    title: 'Контейнеры',
    services: [
      { id: 'k8s', icon: imgIcon2Color34, title: 'Managed Kubernetes', subtitle: '' },
      { id: 'artifact-registry', icon: imgIcon2Color35, title: 'Artifact Registry', subtitle: '' },
      { id: 'container-apps', icon: imgIcon2Color36, title: 'Container Apps', subtitle: '' },
    ]
  },
  {
    id: 'admin',
    title: 'Управление',
    services: [
      { id: 'cost-control', icon: imgIcon2Color4, title: 'Контроль затрат', subtitle: 'Управление финансами' },
      { id: 'iam', icon: imgIcon2Color5, title: 'IAM', subtitle: 'Роли' },
      { id: 'admin', icon: imgIcon2Color6, title: 'Администрирование', subtitle: 'Оргструктура, квоты' },
      { id: 'observatory', icon: imgIcon2Color7, title: 'Обсерватория', subtitle: 'Мониторинг' },
      { id: 'resource-manager', icon: imgIcon2Color8, title: 'Менеджер ресурсов', subtitle: 'Управление ресурсами' },
      { id: 'users', icon: imgIcon2Color9, title: 'Пользователи', subtitle: 'Управление доступами' },
    ]
  },
];

const CONTROL_CATEGORIES: ControlCategory[] = [
  {
    id: 'finance',
    title: 'Финансы',
    subcategories: [
      {
        title: 'Контроль затрат',
        icon: imgIcon2Color4,
        items: [
          { id: 'contract', title: 'Договор' },
          { id: 'budgets', title: 'Бюджеты' },
          { id: 'consumption', title: 'Потребление' },
          { id: 'forecast', title: 'Прогноз потребления' },
          { id: 'grants', title: 'Гранты' },
        ]
      }
    ]
  },
  {
    id: 'administration',
    title: 'Администрирование',
    subcategories: [
      {
        title: 'Администрирование',
        icon: imgIcon2Color6,
        items: [
          { id: 'users', title: 'Пользователи' },
          { id: 'permissions', title: 'Управление разрешениями' },
          { id: 'security', title: 'Связанные аккаунты' },
        ]
      }
    ]
  },
  {
    id: 'iam',
    title: 'IAM',
    subcategories: [
      {
        title: 'Роли',
        icon: imgIcon2Color5,
        items: [
          { id: 'roles', title: 'Роли' },
        ]
      }
    ]
  },
  {
    id: 'monitoring',
    title: 'Мониторинг',
    subcategories: [
      {
        title: 'Мониторинг',
        icon: imgIcon2Color7,
        items: [
          { id: 'dashboards', title: 'Дашборды' },
          { id: 'monitoring', title: 'Анализ мониторинга' },
          { id: 'integrations', title: 'Внешние интеграции' },
          { id: 'api', title: 'Публичный API' },
        ]
      }
    ]
  },
  {
    id: 'resource-management',
    title: 'Управление ресурсами',
    subcategories: [
      {
        title: 'Менеджер ресурсов',
        icon: imgIcon2Color8,
        items: [
          { id: 'resource-manager', title: 'Менеджер ресурсов' },
          { id: 'resource-groups', title: 'Группы ресурсов' },
          { id: 'history', title: 'История изменений' },
        ]
      }
    ]
  },
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

interface ServiceCardItemProps {
  service: ServiceCard;
  onAddToFavorites: (id: string) => void;
  isFavorite: boolean;
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
}

function PlatformCategoryBlock({ category, index, isExpanded, isHovered, onToggle, onMove, onHover, toggleFavorite, favorites }: PlatformCategoryBlockProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  const categoryColors: Record<string, string> = {
    'compute': '#f5b27b',
    'network': '#a8d1a2',
    'storage': '#e6c878',
    'containers': '#ceb7e7',
    'admin': '#99d7ba'
  };
  const borderColor = categoryColors[category.id] || '#dde0ea';

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
          <div className="content-stretch flex gap-[8px] items-start pr-[8px] py-[4px] relative size-full">
            <div className="flex-[1_0_0] min-w-px relative">
              <div className="content-stretch flex items-start pl-[12px] relative size-full">
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0 flex-[1_0_0]">
                  <div className="flex flex-col font-['SB_Sans_Interface:Semibold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#41424e] text-[16px] text-ellipsis tracking-[0.15px] whitespace-nowrap">
                    <p className="leading-[24px] overflow-hidden text-ellipsis">{category.title}</p>
                  </div>
                </div>
                {isHovered && (
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                    <button className="content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px] cursor-move hover:bg-[rgba(0,0,0,0.05)]">
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
                    <button
                      onClick={() => onToggle(category.id)}
                      className="content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px] cursor-pointer hover:bg-[rgba(0,0,0,0.05)]"
                    >
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
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {isExpanded && category.megaservice && (
          <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full">
            <div className="bg-[rgba(238,239,243,0.5)] relative rounded-[4px] shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[8px] items-start pb-[8px] pt-[12px] px-[8px] relative size-full">
                <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
                  <div className="flex-[1_0_0] min-w-px relative">
                    <div className="content-stretch flex items-start pl-[4px] relative size-full">
                      <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
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
                <div className="content-start flex flex-wrap gap-0 items-start relative shrink-0 w-full">
                  {category.megaservice.services.map((service) => (
                    <div key={service.id} className="flex-[1_0_0] max-w-[286.5px] min-w-[200px] relative">
                      <ServiceCardItem
                        service={service}
                        onAddToFavorites={toggleFavorite}
                        isFavorite={favorites.includes(service.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {isExpanded && category.services.length > 0 && (
          <div className="content-start flex flex-wrap gap-0 items-start relative shrink-0 w-full px-[8px]">
            {category.services.map((service) => (
              <div key={service.id} className="flex-[1_0_0] max-w-[286.5px] min-w-[200px] relative">
                <ServiceCardItem
                  service={service}
                  onAddToFavorites={toggleFavorite}
                  isFavorite={favorites.includes(service.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryBlock({ category, index, isExpanded, isHovered, onToggle, onMove, onHover, toggleFavorite, favorites }: CategoryBlockProps) {
  const ref = React.useRef<HTMLDivElement>(null);

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
      <div aria-hidden="true" className="absolute border-l-6 border-[#99d7ba] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="content-stretch flex flex-col gap-[4px] items-start pl-[14px] pr-[8px] py-[8px] relative size-full">
        <div className="relative shrink-0 w-full">
          <div className="content-stretch flex gap-[8px] items-start pr-[8px] py-[4px] relative size-full">
            <div className="flex-[1_0_0] min-w-px relative">
              <div className="content-stretch flex items-start pl-[12px] relative size-full">
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0 flex-[1_0_0]">
                  <div className="flex flex-col font-['SB_Sans_Interface:Semibold',sans-serif] justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#41424e] text-[16px] text-ellipsis tracking-[0.15px] whitespace-nowrap">
                    <p className="leading-[24px] overflow-hidden text-ellipsis">{category.title}</p>
                  </div>
                </div>
                {isHovered && (
                  <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                    <button className="content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px] cursor-move hover:bg-[rgba(0,0,0,0.05)]">
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
                    <button
                      onClick={() => onToggle(category.id)}
                      className="content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px] cursor-pointer hover:bg-[rgba(0,0,0,0.05)]"
                    >
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
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {isExpanded && category.subcategories.map((subcategory, idx) => (
          <div key={idx} className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full">
            <div className="bg-[rgba(238,239,243,0.5)] relative rounded-[4px] shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[8px] items-start pb-[8px] pt-[12px] px-[8px] relative size-full">
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
                <div className="content-start flex flex-wrap gap-0 items-start relative shrink-0 w-full">
                  {subcategory.items.map((item) => (
                    <div key={item.id} className="flex-[1_0_0] max-w-[286.5px] min-w-[200px] relative">
                      <ServiceCardItem
                        service={{
                          id: item.id,
                          icon: imgIcon2Color13,
                          title: item.title,
                          subtitle: ''
                        }}
                        onAddToFavorites={toggleFavorite}
                        isFavorite={favorites.includes(item.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServiceCardItem({ service, onAddToFavorites, isFavorite }: ServiceCardItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipTimeout, setTooltipTimeout] = useState<NodeJS.Timeout | null>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'SERVICE_CARD',
    item: { id: service.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleInfoHover = () => {
    const timeout = setTimeout(() => {
      setShowTooltip(true);
    }, 500);
    setTooltipTimeout(timeout);
  };

  const handleInfoLeave = () => {
    if (tooltipTimeout) {
      clearTimeout(tooltipTimeout);
    }
    setShowTooltip(false);
  };

  return (
    <div
      ref={drag}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`min-h-[32px] relative rounded-[4px] cursor-move hover:bg-[rgba(0,0,0,0.02)] ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="flex flex-row items-center min-h-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[8px] items-center min-h-[inherit] p-[4px] relative size-full">
          <div className="relative shrink-0 size-[24px]">
            <div
              className="absolute bg-[#8b8e9b] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px]"
              style={{ maskImage: `url('${service.icon}')` }}
            />
          </div>
          <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative">
            <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-full">
              <p className="font-['SB_Sans_Interface:Regular',sans-serif] leading-[16px] not-italic overflow-hidden relative shrink-0 text-[#41424e] text-[13px] text-ellipsis tracking-[0.1px] whitespace-nowrap">{service.title}</p>
            </div>
            {service.subtitle && (
              <p className="font-['SB_Sans_Interface:Regular',sans-serif] leading-[16px] not-italic overflow-hidden relative shrink-0 text-[#8b8e9b] text-[12px] text-ellipsis tracking-[0.1px] w-full">{service.subtitle}</p>
            )}
          </div>
          {isHovered && (
            <>
              <div
                className="relative"
                onMouseEnter={handleInfoHover}
                onMouseLeave={handleInfoLeave}
              >
                <button
                  className="content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px] hover:bg-[rgba(0,0,0,0.05)]"
                >
                  <div className="relative shrink-0 size-[24px]">
                    <svg className="absolute inset-0 size-full" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="#8b8e9b" strokeWidth="2" fill="none"/>
                      <path d="M12 16V12M12 8H12.01" stroke="#8b8e9b" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                </button>
                {showTooltip && (
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-[#41424e] text-white text-[12px] rounded-[4px] px-[8px] py-[4px] whitespace-nowrap z-50">
                    Краткая информация о сервисе
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-l-transparent border-r-transparent border-t-[#41424e]"></div>
                  </div>
                )}
              </div>
              <button
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function NavigationMenuPrototype3() {
  const showPlatformSelector = true;
  const showSolutionsTab = true;
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'platform' | 'control' | 'solutions'>('platform');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(CONTROL_CATEGORIES.map(c => c.id));
  const [expandedPlatformCategories, setExpandedPlatformCategories] = useState<string[]>([]);
  const [categoryOrder, setCategoryOrder] = useState<string[]>(CONTROL_CATEGORIES.map(c => c.id));
  const [platformCategoryOrder, setPlatformCategoryOrder] = useState<string[]>(SERVICE_CATEGORIES.map(c => c.id));
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredPlatformCategory, setHoveredPlatformCategory] = useState<string | null>(null);

  const allServices = [
    ...SERVICE_CATEGORIES.flatMap(cat => [
      ...(cat.megaservice?.services || []),
      ...cat.services
    ]),
    ...CONTROL_CATEGORIES.flatMap(cat =>
      cat.subcategories.flatMap(sub =>
        sub.items.map(item => ({
          id: item.id,
          icon: imgIcon2Color13,
          title: item.title,
          subtitle: ''
        }))
      )
    )
  ];

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'SERVICE_CARD',
    drop: (item: { id: string }) => {
      if (!favorites.includes(item.id)) {
        setFavorites([...favorites, item.id]);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

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
  };

  const collapseAll = () => {
    setExpandedCategories([]);
  };

  const expandAllPlatform = () => {
    const allCategoryIds = SERVICE_CATEGORIES.map(cat => cat.id);
    setExpandedPlatformCategories(allCategoryIds);
  };

  const collapseAllPlatform = () => {
    setExpandedPlatformCategories([]);
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

  const favoriteServices = allServices.filter(s => favorites.includes(s.id));

  const categoriesByTab = SERVICE_CATEGORIES.filter(category =>
    activeTab === 'platform' ? category.id !== 'admin' : category.id === 'admin'
  );

  const filteredCategories = searchQuery.trim() === ''
    ? categoriesByTab
    : categoriesByTab.map(category => {
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
    <div className="bg-[rgba(0,0,0,0.32)] absolute inset-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pr-[20px] relative size-full">
        <div className="bg-[#eeeff3] flex-[1_0_0] h-full max-w-[900px] min-w-[744px] relative shadow-[0px_0px_16px_0px_rgba(0,0,0,0.08),0px_24px_16px_0px_rgba(0,0,0,0.08)]">
          <div className="content-stretch flex items-start max-w-[inherit] min-w-[inherit] pl-[20px] pt-[20px] relative size-full">

            {/* Left Sidebar */}
            <div className="h-full relative shrink-0 w-[216px]">
              <div className="content-stretch flex flex-col isolate items-start justify-between pb-[20px] relative size-full">
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
                    className={`bg-[#fdfdfd] content-stretch flex flex-col items-start relative rounded-[4px] w-[216px] flex-[1_0_0] min-h-0 ${isOver ? 'ring-2 ring-[#389f74]' : ''}`}
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
                        <div className="flex flex-col gap-[4px] w-full">
                          {favoriteServices.map(service => (
                            <div key={service.id} className="bg-[#fdfdfd] rounded-[4px]">
                              <ServiceCardItem
                                service={service}
                                onAddToFavorites={toggleFavorite}
                                isFavorite={true}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Menu */}
                <div className="content-stretch flex flex-col items-start min-h-[32px] overflow-clip relative rounded-[4px] shrink-0 w-[216px] z-[1]">
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
                  <Link to="/" className="max-w-[286.5px] min-w-[200px] relative shrink-0 w-full hover:bg-[rgba(0,0,0,0.02)] rounded-[4px]">
                    <div className="flex flex-row items-center max-w-[inherit] min-w-[inherit] size-full">
                      <div className="content-stretch flex gap-[8px] items-center max-w-[inherit] min-w-[inherit] p-[4px] relative size-full">
                        <div className="relative shrink-0 size-[24px]">
                          <svg className="absolute inset-0 size-full" viewBox="0 0 24 24" fill="none">
                            <path d="M19 12H5M12 19l-7-7 7-7" stroke="#8b8e9b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <p className="font-['SB_Sans_Interface:Regular',sans-serif] leading-[16px] not-italic overflow-hidden relative shrink-0 text-[#41424e] text-[13px] text-ellipsis tracking-[0.1px] whitespace-nowrap">На главную</p>
                      </div>
                    </div>
                  </Link>
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
              <div className="content-stretch flex flex-col gap-[8px] items-start pb-[20px] relative pr-[20px]">

                {/* Info Blocks */}
                <div className="content-stretch flex gap-[4px] items-start relative shrink-0 w-full pt-[8px]">
                  <div className="bg-[#fdfdfd] flex-[1_0_0] min-w-px relative rounded-[4px]">
                    <div className="content-stretch flex flex-col gap-[10px] items-start p-[8px] relative size-full">
                      <div className="content-stretch flex flex-col gap-[4px] isolate items-start justify-center not-italic overflow-clip relative shrink-0 text-[12px] w-full">
                        <p className="font-['SB_Sans_Interface:Semibold',sans-serif] leading-[20px] overflow-hidden relative shrink-0 text-[#41424e] text-ellipsis tracking-[0.15px] whitespace-nowrap z-[2]">Реферальная программа</p>
                        <p className="font-['SB_Sans_Interface:Regular',sans-serif] leading-[16px] min-w-full relative shrink-0 text-[#6d707f] tracking-[0.1px] w-[min-content] z-[1]">Зарабатывайте 20% на рекомендациях сервисов Cloud.ru</p>
                      </div>
                      <div className="absolute content-stretch flex flex-col items-start overflow-clip pr-[4px] pt-[4px] right-[-0.5px] top-0">
                        <div className="bg-[#389f74] content-stretch flex h-[16px] items-center justify-center relative rounded-[4px] shrink-0">
                          <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[4px]" />
                          <div className="content-stretch flex items-center justify-center px-[4px] relative shrink-0">
                            <p className="font-['SB_Sans_Interface:Semibold',sans-serif] leading-[14px] not-italic relative shrink-0 text-[#fbfffc] text-[11px] whitespace-nowrap">15%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#fdfdfd] flex-[1_0_0] min-w-px relative rounded-[4px]">
                    <div className="flex flex-row items-center size-full">
                      <div className="content-stretch flex items-center p-[8px] relative size-full">
                        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] isolate items-start min-w-px relative">
                          <p className="font-['SB_Sans_Interface:Semibold',sans-serif] leading-[16px] not-italic overflow-hidden relative shrink-0 text-[#41424e] text-[12px] text-ellipsis whitespace-nowrap z-[3]">Маркетплейс</p>
                          <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full z-[2]">
                            <p className="flex-[1_0_0] font-['SB_Sans_Interface:Regular',sans-serif] leading-[16px] min-w-px not-italic relative text-[#6d707f] text-[12px] tracking-[0.1px]">Для разработки, анализа данных и других задач.</p>
                            <div className="content-start flex flex-wrap gap-[4px_8px] items-start justify-end max-w-[140px] relative shrink-0 w-[64px]">
                              <div className="overflow-clip relative rounded-[2px] shrink-0 size-[16px]">
                                <div className="absolute inset-[20.83%_0]">
                                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 9.33333">
                                    <path clipRule="evenodd" d={svgPathsFrame.p11a02600} fill="#D70F37" fillRule="evenodd" />
                                  </svg>
                                </div>
                              </div>
                              <div className="overflow-clip relative rounded-[2px] shrink-0 size-[16px]">
                                <div className="absolute inset-[4.17%_0_1.1%_0]">
                                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 15.1579">
                                    <path d={svgPathsFrame.p2f498280} fill="#326CE5" />
                                  </svg>
                                </div>
                              </div>
                              <div className="overflow-clip relative shrink-0 size-[16px]">
                                <div className="absolute inset-[0_5.56%_0_5.54%]">
                                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.2238 16">
                                    <path d={svgPathsFrame.p42c9200} fill="#5FA04E" />
                                  </svg>
                                </div>
                              </div>
                              <div className="overflow-clip relative rounded-[2px] shrink-0 size-[16px]">
                                <div className="absolute inset-[0_6.25%]">
                                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 16">
                                    <path d={svgPathsFrame.p391f5900} fill="#019639" />
                                  </svg>
                                </div>
                              </div>
                              <div className="relative shrink-0 size-[16px]">
                                <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                                  <path d={svgPathsFrame.p30769300} fill="#E95420" />
                                </svg>
                              </div>
                              <div className="overflow-clip relative rounded-[2px] shrink-0 size-[16px]">
                                <div className="absolute inset-[0_0_22.73%_0]">
                                  <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9999 12.3635">
                                    <path d={svgPathsFrame.p33485900} fill="#41424E" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="absolute content-stretch flex flex-col items-start overflow-clip pr-[4px] pt-[4px] right-[-7px] top-[-7px] z-[1]">
                            <div className="bg-[#389f74] content-stretch flex h-[16px] items-center justify-center relative rounded-[4px] shrink-0">
                              <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[4px]" />
                              <div className="content-stretch flex items-center justify-center px-[4px] relative shrink-0">
                                <p className="font-['SB_Sans_Interface:Semibold',sans-serif] leading-[14px] not-italic relative shrink-0 text-[#fbfffc] text-[11px] whitespace-nowrap">120+ сервисов</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Search and Controls */}
                <div className="content-stretch flex flex-col gap-[8px] items-start pt-[8px] relative rounded-[8px] shrink-0 w-full">
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

                  <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                    <div className="content-stretch flex items-center p-[3px] relative rounded-[4px] shrink-0">
                      <div aria-hidden="true" className="absolute border border-[#dde0ea] border-solid inset-0 pointer-events-none rounded-[4px]" />
                      <div className="relative shrink-0">
                        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
                          <button
                            onClick={() => setActiveTab('platform')}
                            className={`${activeTab === 'platform' ? 'bg-white' : ''} content-stretch flex gap-[4px] h-[28px] items-center justify-center min-w-[28px] overflow-clip px-[16px] relative rounded-[2px] shrink-0 cursor-pointer`}
                          >
                            <p className={`font-['SB_Sans_Interface:Semibold',sans-serif] leading-[16px] not-italic relative shrink-0 ${activeTab === 'platform' ? 'text-[#41424e]' : 'text-[#6d707f]'} text-[12px] whitespace-nowrap`}>Сервисы</p>
                          </button>
                          <button
                            onClick={() => setActiveTab('control')}
                            className={`${activeTab === 'control' ? 'bg-white' : ''} content-stretch flex gap-[4px] h-[28px] items-center justify-center min-w-[28px] overflow-clip px-[16px] relative rounded-[2px] shrink-0 cursor-pointer`}
                          >
                            <p className={`font-['SB_Sans_Interface:Semibold',sans-serif] leading-[16px] not-italic relative shrink-0 ${activeTab === 'control' ? 'text-[#41424e]' : 'text-[#6d707f]'} text-[12px] whitespace-nowrap`}>Центр управления</p>
                          </button>
                          {showSolutionsTab && (
                            <button
                              onClick={() => setActiveTab('solutions')}
                              className={`${activeTab === 'solutions' ? 'bg-white' : ''} content-stretch flex gap-[4px] h-[28px] items-center justify-center min-w-[28px] overflow-clip px-[16px] relative rounded-[2px] shrink-0 cursor-pointer`}
                            >
                              <p className={`font-['SB_Sans_Interface:Semibold',sans-serif] leading-[16px] not-italic relative shrink-0 ${activeTab === 'solutions' ? 'text-[#41424e]' : 'text-[#6d707f]'} text-[12px] whitespace-nowrap`}>Решения</p>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    {activeTab !== 'solutions' && (
                      <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
                        <button
                          onClick={activeTab === 'platform' ? expandAllPlatform : expandAll}
                          className="content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px] cursor-pointer hover:bg-[rgba(0,0,0,0.05)]"
                        >
                          <div className="relative shrink-0 size-[24px]">
                            <div className="absolute bg-[#8b8e9b] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px]" style={{ maskImage: `url('${imgIcon2Color11}')` }} />
                          </div>
                        </button>
                        <button
                          onClick={activeTab === 'platform' ? collapseAllPlatform : collapseAll}
                          className="content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[24px] cursor-pointer hover:bg-[rgba(0,0,0,0.05)]"
                        >
                          <div className="relative shrink-0 size-[24px]">
                            <div className="absolute bg-[#8b8e9b] inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[24px_24px]" style={{ maskImage: `url('${imgIcon2Color12}')` }} />
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

              </div>
              <div className="content-stretch flex flex-col gap-[8px] items-start pb-[20px] relative pr-[20px]">
                {activeTab === 'platform' && platformCategoryOrder.map((categoryId, index) => {
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
                    />
                  );
                })}

                {activeTab === 'control' && categoryOrder.map((categoryId, index) => {
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
                    />
                  );
                })}

                {activeTab === 'solutions' && (
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
        </div>
      </div>
    </div>
  );
}
