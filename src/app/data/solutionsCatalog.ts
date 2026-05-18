import {
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
  imgIconColor36 as imgIcon2Color36,
} from '../../imports/MainMenuDesktop-1/svg-vz3cs';
import type { ServiceCard } from './serviceCatalog';

const ICONS = [
  imgIcon2Color13, imgIcon2Color14, imgIcon2Color15, imgIcon2Color16, imgIcon2Color17,
  imgIcon2Color18, imgIcon2Color19, imgIcon2Color20, imgIcon2Color21, imgIcon2Color22,
  imgIcon2Color23, imgIcon2Color24, imgIcon2Color25, imgIcon2Color26, imgIcon2Color27,
  imgIcon2Color28, imgIcon2Color29, imgIcon2Color30, imgIcon2Color31, imgIcon2Color32,
  imgIcon2Color33, imgIcon2Color34, imgIcon2Color35, imgIcon2Color36,
];

let iconIndex = 0;
function nextIcon(): string {
  const icon = ICONS[iconIndex % ICONS.length];
  iconIndex += 1;
  return icon;
}

export interface Solution {
  id: string;
  title: string;
  description: string;
  services: ServiceCard[];
}

function placeholderServices(solutionId: string, count = 2): ServiceCard[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${solutionId}-service-${i + 1}`,
    icon: nextIcon(),
    title: `Сервис ${i + 1}`,
    subtitle: '',
  }));
}

export const SOLUTIONS: Solution[] = [
  {
    id: 'telegram-n8n',
    title: 'Telegram-бот с n8n',
    description: 'Создание Telegram-бота без кода с автоматизацией через n8n.',
    services: placeholderServices('telegram-n8n'),
  },
  {
    id: 'ai-bot-foundation-models',
    title: 'AI-бот с Foundation Models',
    description: 'Подключение ИИ-моделей к Telegram-боту и автоматизация AI-сценариев',
    services: placeholderServices('ai-bot-foundation-models'),
  },
  {
    id: 'jupyter-container',
    title: 'Jupyter Server в контейнере',
    description: 'Быстрый запуск Jupyter Server для аналитики и ML-задач',
    services: placeholderServices('jupyter-container'),
  },
  {
    id: 'kubernetes-terraform',
    title: 'Kubernetes через Terraform',
    description: 'Развертывание инфраструктуры Kubernetes с помощью Terraform.',
    services: placeholderServices('kubernetes-terraform'),
  },
  {
    id: 'helm-yaml-deploy',
    title: 'Helm и YAML-деплой',
    description: 'Публикация приложений в Kubernetes через Helm-чарты и YAML-манифесты',
    services: placeholderServices('helm-yaml-deploy'),
  },
  {
    id: 'blue-green-canary',
    title: 'Blue-Green и Canary Deploy',
    description: 'Безопасные обновления приложений с постепенным переключением трафика',
    services: placeholderServices('blue-green-canary'),
  },
  {
    id: 'keda-event-scaling',
    title: 'Event-Driven масштабирование с KEDA',
    description: 'Автоматическое масштабирование сервисов по событиям и очередям',
    services: placeholderServices('keda-event-scaling'),
  },
];
