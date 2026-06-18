import {
  imgIconColor4 as imgIcon2Color4,
  imgIconColor5 as imgIcon2Color5,
  imgIconColor6 as imgIcon2Color6,
  imgIconColor7 as imgIcon2Color7,
  imgIconColor8 as imgIcon2Color8,
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

/** Один сервис в каталоге может встречаться под разными id — иконка общая. */
const SERVICE_ICON_ALIASES: Record<string, string> = {
  images: 'compute-images',
  'storage-compute-disks': 'compute-disks',
  'subnets-net': 'compute-subnets',
  'public-ip-net': 'compute-public-ip',
  'storage-bare-metal-disks': 'compute-disks',
};

const iconByCanonicalId = new Map<string, string>();

function getCanonicalServiceId(id: string): string {
  return SERVICE_ICON_ALIASES[id] ?? id;
}

function resolveServiceIcon(id: string): string {
  const canonicalId = getCanonicalServiceId(id);
  if (!iconByCanonicalId.has(canonicalId)) {
    iconByCanonicalId.set(canonicalId, nextIcon());
  }
  return iconByCanonicalId.get(canonicalId)!;
}

const PREVIEW = 'Preview';

export interface ServiceCard {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
}

export interface MegaService {
  title: string;
  icon: string;
  services: ServiceCard[];
}

export interface ServiceSubcategory {
  title: string;
  icon: string;
  services: ServiceCard[];
}

export interface ServiceCategory {
  id: string;
  title: string;
  megaservice?: MegaService;
  services: ServiceCard[];
  subcategories?: ServiceSubcategory[];
}

export function getMegaserviceCategoryIds(categories: ServiceCategory[]): string[] {
  return categories.filter((category) => category.megaservice).map((category) => category.id);
}

export interface ControlItem {
  id: string;
  title: string;
}

export interface ControlSubcategory {
  title: string;
  icon: string;
  items: ControlItem[];
}

export interface ControlCategory {
  id: string;
  title: string;
  subcategories: ControlSubcategory[];
}

function svc(id: string, title: string, subtitle = ''): ServiceCard {
  return { id, icon: resolveServiceIcon(id), title, subtitle };
}

/** Бледные акценты категорий (смягчённые относительно базовой палитры, ~62% к фону #eef0f5) */
export const CATEGORY_COLORS: Record<string, string> = {
  infrastructure: '#f4bdc1',
  network: '#abe3ce',
  'ai-factory': '#ceb8ef',
  storage: '#f2e0b6',
  containers: '#adbaf2',
  'message-brokers': '#efb7dd',
  databases: '#94dcf7',
  development: '#96e6d5',
  'data-platform': '#b0e1f3',
  'security-administration': '#eeb0c2',
  monitoring: '#f4e4bf',
  'resource-management': '#b5c1cf',
  finance: '#f2cea3',
};

/** 10 пресетов для настройки цветов категорий */
export const CATEGORY_COLOR_PRESETS = [
  '#f4bdc1',
  '#abe3ce',
  '#ceb8ef',
  '#f2e0b6',
  '#adbaf2',
  '#efb7dd',
  '#94dcf7',
  '#96e6d5',
  '#f4e4bf',
  '#b5c1cf',
] as const;

export const CATEGORY_BORDER_NEUTRAL = '#dde0ea';

const PRESET_FALLBACK_MAP: Record<string, string> = {
  '#b0e1f3': '#94dcf7',
  '#eeb0c2': '#f4bdc1',
  '#f2cea3': '#f2e0b6',
};

function mapColorToPreset(color: string): string {
  if ((CATEGORY_COLOR_PRESETS as readonly string[]).includes(color)) return color;
  return PRESET_FALLBACK_MAP[color] ?? CATEGORY_COLOR_PRESETS[0];
}

export const DEFAULT_CATEGORY_COLORS: Record<string, string> = Object.fromEntries(
  Object.entries(CATEGORY_COLORS).map(([id, color]) => [id, mapColorToPreset(color)]),
);

export function resolveCategoryAccentColor(
  categoryId: string,
  options?: {
    categoryColors?: Record<string, string | null>;
    colorsEnabled?: boolean;
  },
): string | null {
  const { categoryColors, colorsEnabled = true } = options ?? {};
  if (!colorsEnabled) return null;

  if (categoryColors && categoryId in categoryColors) {
    return categoryColors[categoryId];
  }

  return DEFAULT_CATEGORY_COLORS[categoryId] ?? CATEGORY_COLORS[categoryId] ?? null;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'infrastructure',
    title: 'Инфраструктура',
    megaservice: {
      title: 'Compute',
      icon: imgIcon2Color13,
      services: [
        svc('vm', 'Виртуальные машины'),
        svc('placement-groups', 'Группы размещения'),
        svc('vm-management', 'Управление ПО', PREVIEW),
        svc('compute-disks', 'Диски'),
        svc('compute-images', 'Образы'),
        svc('compute-monitoring', 'Мониторинг ВМ'),
        svc('compute-subnets', 'Подсети'),
        svc('compute-public-ip', 'Публичные IP'),
        svc('compute-backup', 'Резервное копирование'),
      ],
    },
    services: [
      svc('bare-metal', 'Bare Metal'),
      svc('agent-backup', 'Agent Backup'),
      svc('images', 'Образы'),
      svc('migration', 'Migration'),
      svc('disaster-recovery', 'Disaster Recovery'),
    ],
  },
  {
    id: 'network',
    title: 'Сеть',
    services: [
      svc('subnets-net', 'Подсети'),
      svc('public-ip-net', 'Публичные IP'),
      svc('snat-gateways', 'sNAT-шлюзы'),
      svc('load-balancer', 'Load Balancer'),
      svc('dns', 'DNS'),
      svc('vpc', 'VPC'),
      svc('virtual-ip', 'Виртуальные IP'),
      svc('vpn', 'VPN', PREVIEW),
      svc('magic-router', 'Magic Router'),
    ],
  },
  {
    id: 'ai-factory',
    title: 'AI Factory',
    megaservice: {
      title: 'Distributed Train',
      icon: imgIcon2Color34,
      services: [
        svc('data-transfer', 'Data Transfer'),
        svc('network-storages', 'Сетевые хранилища'),
        svc('docker-registry', 'Docker Registry'),
        svc('jupyter-servers', 'Jupyter Servers'),
        svc('tasks-environments', 'Задачи и окружения'),
        svc('allocations', 'Аллокации'),
        svc('model-monitoring', 'Мониторинг моделей'),
        svc('experiments', 'Эксперименты'),
        svc('deploys', 'Деплои'),
        svc('gitlab-ci', 'GitLab CI'),
      ],
    },
    services: [
      svc('ml-inference', 'ML Inference'),
      svc('notebooks', 'Notebooks'),
      svc('managed-rag', 'Managed RAG'),
      svc('foundation-models', 'Foundation Models'),
      svc('ml-finetuning', 'ML Finetuning'),
      svc('ai-agents', 'AI Agents'),
    ],
  },
  {
    id: 'storage',
    title: 'Хранение данных',
    services: [
      svc('storage-compute-disks', 'Диски'),
      svc('object-storage', 'Object Storage'),
    ],
  },
  {
    id: 'containers',
    title: 'Контейнеры',
    services: [
      svc('k8s', 'Managed Kubernetes'),
      svc('container-apps', 'Container Apps'),
      svc('artifact-registry', 'Artifact Registry'),
      svc('keda', 'KEDA'),
      svc('terraform', 'Terraform'),
      svc('n8n', 'n8n'),
      svc('docker', 'Docker'),
      svc('helm', 'Helm'),
      svc('kubectl', 'Kubectl'),
    ],
  },
  {
    id: 'message-brokers',
    title: 'Брокеры сообщений',
    services: [
      svc('managed-kafka', 'Managed Kafka®'),
      svc('managed-corax', 'Managed Corax'),
    ],
  },
  {
    id: 'databases',
    title: 'Базы данных',
    services: [
      svc('managed-postgres', 'Managed PostgreSQL®'),
      svc('managed-datagrid', 'Managed DataGrid', PREVIEW),
      svc('managed-clickhouse', 'Managed ClickHouse', PREVIEW),
      svc('managed-pangolin', 'Managed Pangolin', PREVIEW),
      svc('managed-redis', 'Managed Redis', PREVIEW),
    ],
  },
  {
    id: 'development',
    title: 'Инструменты разработчика',
    megaservice: {
      title: 'Repo',
      icon: imgIcon2Color35,
      services: [
        svc('model-registry', 'Model Registry'),
        svc('code', 'Code'),
        svc('dataset-registry', 'Dataset Registry'),
        svc('repo-settings', 'Настройки Repo'),
      ],
    },
    services: [svc('pipelines', 'Pipelines', PREVIEW)],
  },
  {
    id: 'data-platform',
    title: 'Платформа данных',
    services: [
      svc('managed-airflow', 'Managed Airflow', PREVIEW),
      svc('managed-metastore', 'Managed Metastore'),
      svc('managed-spark', 'Managed Spark'),
      svc('managed-trino', 'Managed Trino'),
      svc('managed-arenadatadb', 'Managed ArenadataDB'),
      svc('managed-bi', 'Managed BI'),
    ],
  },
  {
    id: 'security-administration',
    title: 'Безопасность и администрирование',
    services: [],
    subcategories: [
      {
        title: 'Права доступа',
        icon: imgIcon2Color5,
        services: [
          svc('roles', 'Конструктор ролей'),
          svc('users-control', 'Пользователи'),
          svc('security', 'Сервисные аккаунты'),
          svc('federations', 'Федерации'),
          svc('invitations', 'Приглашения'),
        ],
      },
      {
        title: 'Администрирование',
        icon: imgIcon2Color6,
        services: [
          svc('catalogs-projects', 'Каталоги и проекты'),
          svc('admin-quotas', 'Квоты'),
          svc('contracts', 'Договоры'),
          svc('admin-settings', 'Настройки'),
        ],
      },
      {
        title: 'Безопасность',
        icon: imgIcon2Color5,
        services: [
          svc('certificate-manager', 'Certificate Manager'),
          svc('secret-management', 'Secret Management'),
          svc('security-groups', 'Группы безопасности'),
          svc('key-management', 'Key Management'),
          svc('audit-logging', 'Аудит-логирование'),
          svc('ssh-keys', 'SSH-ключи'),
        ],
      },
    ],
  },
  {
    id: 'monitoring',
    title: 'Обсерватория',
    services: [
      svc('dashboards', 'Дашборды'),
      svc('monitoring-alerts', 'Алерты мониторинга'),
      svc('metric-management', 'Управление метриками'),
      svc('public-api', 'Публичные API'),
      svc('logging', 'Логирование'),
      svc('notifications', 'Нотификации'),
    ],
  },
  {
    id: 'resource-management',
    title: 'Управление ресурсами',
    megaservice: {
      title: 'Менеджер ресурсов',
      icon: imgIcon2Color8,
      services: [
        svc('resources', 'Ресурсы'),
        svc('tags', 'Теги'),
        svc('resource-groups', 'Группы ресурсов'),
        svc('reports', 'Отчеты'),
      ],
    },
    services: [svc('task-history', 'История задач')],
  },
];

export const CONTROL_CATEGORIES: ControlCategory[] = [
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
        ],
      },
    ],
  },
  {
    id: 'security-administration',
    title: 'Безопасность и администрирование',
    subcategories: [
      {
        title: 'Права доступа',
        icon: imgIcon2Color5,
        items: [
          { id: 'roles', title: 'Конструктор ролей' },
          { id: 'users-control', title: 'Пользователи' },
          { id: 'security', title: 'Сервисные аккаунты' },
          { id: 'federations', title: 'Федерации' },
          { id: 'invitations', title: 'Приглашения' },
        ],
      },
      {
        title: 'Администрирование',
        icon: imgIcon2Color6,
        items: [
          { id: 'catalogs-projects', title: 'Каталоги и проекты' },
          { id: 'admin-quotas', title: 'Квоты' },
          { id: 'contracts', title: 'Договоры' },
          { id: 'admin-settings', title: 'Настройки' },
        ],
      },
      {
        title: 'Безопасность',
        icon: imgIcon2Color5,
        items: [
          { id: 'certificate-manager', title: 'Certificate Manager' },
          { id: 'secret-management', title: 'Secret Management' },
          { id: 'security-groups', title: 'Группы безопасности' },
          { id: 'key-management', title: 'Key Management' },
          { id: 'audit-logging', title: 'Аудит-логирование' },
          { id: 'ssh-keys', title: 'SSH-ключи' },
        ],
      },
    ],
  },
  {
    id: 'monitoring',
    title: 'Обсерватория',
    subcategories: [
      {
        title: 'Мониторинг',
        icon: imgIcon2Color7,
        items: [
          { id: 'dashboards', title: 'Дашборды' },
          { id: 'monitoring-alerts', title: 'Алерты мониторинга' },
          { id: 'metric-management', title: 'Управление метриками' },
          { id: 'public-api', title: 'Публичные API' },
          { id: 'logging', title: 'Логирование' },
          { id: 'audit-logging', title: 'Аудит-логирование' },
          { id: 'notifications', title: 'Нотификации' },
        ],
      },
    ],
  },
  {
    id: 'resource-management',
    title: 'Управление ресурсами',
    subcategories: [
      {
        title: 'Менеджер ресурсов',
        icon: imgIcon2Color8,
        items: [
          { id: 'resources', title: 'Ресурсы' },
          { id: 'tags', title: 'Теги' },
          { id: 'resource-groups', title: 'Группы ресурсов' },
          { id: 'reports', title: 'Отчеты' },
          { id: 'task-history', title: 'История задач' },
        ],
      },
    ],
  },
];

export interface ColorConfigurableCategory {
  id: string;
  title: string;
  defaultColor: string;
}

export function getColorConfigurableCategories(): ColorConfigurableCategory[] {
  const titles = new Map<string, string>();
  for (const category of SERVICE_CATEGORIES) titles.set(category.id, category.title);
  for (const category of CONTROL_CATEGORIES) titles.set(category.id, category.title);

  return Object.entries(DEFAULT_CATEGORY_COLORS).map(([id, defaultColor]) => ({
    id,
    title: titles.get(id) ?? id,
    defaultColor,
  }));
}

export const SERVICE_DESCRIPTIONS: Record<string, string> = {
  vm: 'Создание и управление виртуальными машинами: конфигурации, запуск, остановка и масштабирование.',
  'placement-groups': 'Управление группами размещения виртуальных машин в инфраструктуре.',
  'vm-management': 'Установка, обновление и сопровождение ПО на виртуальных машинах.',
  'compute-disks': 'Блочные диски для виртуальных машин.',
  'compute-images': 'Образы операционных систем и шаблоны.',
  'compute-monitoring': 'Мониторинг состояния и метрик ресурсов.',
  'compute-subnets': 'Подсети для виртуальных машин.',
  'compute-public-ip': 'Публичные IP-адреса для ресурсов.',
  'compute-backup': 'Резервное копирование данных и конфигураций.',
  'bare-metal': 'Выделенные физические серверы с полным контролем над ресурсами.',
  'agent-backup': 'Резервное копирование с агентом на стороне гостевой ОС.',
  images: 'Каталог образов для развёртывания виртуальных машин.',
  migration: 'Перенос рабочих нагрузок и данных в облако.',
  'disaster-recovery': 'Аварийное восстановление и репликация критичных систем.',
  'subnets-net': 'Логические подсети для изолированной сетевой топологии.',
  'public-ip-net': 'Публичные IP-адреса для доступа из интернета.',
  'snat-gateways': 'Исходящий NAT для приватных подсетей.',
  'load-balancer': 'Распределение трафика между экземплярами сервиса.',
  dns: 'Управление DNS-зонами и записями.',
  vpc: 'Виртуальные частные облака для объединения ресурсов.',
  'virtual-ip': 'Плавающие IP для отказоустойчивого переключения.',
  vpn: 'Защищённые VPN-туннели для связи с корпоративной сетью.',
  'magic-router': 'Маршрутизация трафика между VPC и внешними сетями.',
  'data-transfer': 'Передача данных для распределённого обучения моделей.',
  'network-storages': 'Сетевые хранилища для данных распределённого обучения.',
  'docker-registry': 'Реестр Docker-образов для ML-окружений.',
  'jupyter-servers': 'Управляемые Jupyter-серверы для разработки и экспериментов.',
  'tasks-environments': 'Задачи и окружения для запуска ML-пайплайнов.',
  allocations: 'Распределение вычислительных ресурсов между задачами обучения.',
  'model-monitoring': 'Мониторинг метрик и состояния моделей в продакшене.',
  experiments: 'Учёт и сравнение экспериментов машинного обучения.',
  deploys: 'Развёртывание и обновление ML-моделей.',
  'gitlab-ci': 'Интеграция CI/CD-пайплайнов GitLab для ML-проектов.',
  'ml-inference': 'Развёртывание и обслуживание моделей машинного обучения.',
  notebooks: 'Интерактивные среды для разработки и экспериментов с данными.',
  'managed-rag': 'Управляемый сервис Retrieval-Augmented Generation.',
  'foundation-models': 'Доступ к базовым моделям для AI-задач.',
  'ml-finetuning': 'Дообучение моделей на собственных данных.',
  'ai-agents': 'Создание и запуск AI-агентов для автоматизации задач.',
  'storage-compute-disks': 'Блочные диски для виртуальных машин Compute.',
  'storage-bare-metal-disks': 'Блочные диски для выделенных серверов Bare Metal.',
  'object-storage': 'Масштабируемое объектное хранилище S3-совместимого типа.',
  k8s: 'Управляемый кластер Kubernetes.',
  'container-apps': 'Запуск контейнерных приложений без управления кластером.',
  'artifact-registry': 'Хранилище Docker-образов и артефактов.',
  keda: 'Event-driven автомасштабирование workload в Kubernetes по метрикам и событиям.',
  terraform: 'Управление облачной инфраструктурой через Terraform и IaC.',
  n8n: 'Визуальная автоматизация workflow и интеграций без кода.',
  docker: 'Сборка и запуск контейнеров на базе Docker.',
  helm: 'Управление приложениями в Kubernetes через Helm-чарты.',
  kubectl: 'CLI для управления ресурсами Kubernetes-кластера.',
  'managed-kafka': 'Управляемый брокер сообщений Apache Kafka®.',
  'managed-corax': 'Управляемый брокер сообщений Corax.',
  'managed-postgres': 'Управляемая СУБД PostgreSQL®.',
  'managed-datagrid': 'Управляемый сервис DataGrid для распределённых данных.',
  'managed-clickhouse': 'Управляемая аналитическая СУБД ClickHouse.',
  'managed-pangolin': 'Управляемая СУБД Pangolin.',
  'managed-redis': 'Управляемый кэш и хранилище Redis.',
  'model-registry': 'Реестр версий моделей машинного обучения.',
  code: 'Хранение и управление исходным кодом проектов.',
  'dataset-registry': 'Реестр наборов данных для ML-пайплайнов.',
  'repo-settings': 'Настройки репозитория и политик доступа.',
  pipelines: 'Оркестрация CI/CD и ML-пайплайнов.',
  'managed-airflow': 'Управляемый Apache Airflow для ETL и оркестрации.',
  'managed-metastore': 'Метаданные для платформы данных.',
  'managed-spark': 'Управляемый Apache Spark для обработки данных.',
  'managed-trino': 'Управляемый Trino для интерактивной аналитики.',
  'managed-arenadatadb': 'Управляемая ArenadataDB для аналитики.',
  'managed-bi': 'Управляемая BI-платформа для отчётности и дашбордов.',
  roles: 'Создание и редактирование ролей с набором разрешений.',
  iam: 'Централизованное управление идентификацией и доступом.',
  'certificate-manager': 'Выпуск и управление TLS-сертификатами для сервисов.',
  'secret-management': 'Безопасное хранение и ротация секретов и ключей.',
  'security-groups': 'Правила сетевого доступа и группы безопасности для ресурсов.',
  'key-management': 'Управление криптографическими ключами шифрования.',
  'audit-logging': 'Сбор и анализ событий безопасности и аудита.',
  'ssh-keys': 'SSH-ключи для безопасного доступа к виртуальным машинам.',
  contract: 'Договорные условия, тарифы и юридическая информация.',
  budgets: 'Планирование и контроль бюджетов.',
  consumption: 'Детализация потребления ресурсов.',
  forecast: 'Прогноз расходов на основе потребления.',
  grants: 'Гранты и промо-средства.',
  'catalogs-projects': 'Каталоги и проекты для организации ресурсов и доступа.',
  contracts: 'Управление договорами и юридическими условиями.',
  'users-control': 'Управление пользователями и доступом.',
  federations: 'Управление федерациями и доверенными связями между организациями.',
  invitations: 'Приглашение пользователей в организацию и управление приглашениями.',
  security: 'Сервисные аккаунты для интеграции с API.',
  'admin-settings': 'Административные настройки организации и платформы.',
  'admin-quotas': 'Квоты и лимиты потребления ресурсов.',
  dashboards: 'Дашборды для визуализации метрик и состояния ресурсов.',
  'monitoring-alerts': 'Настройка и управление алертами мониторинга.',
  'alert-rules': 'Создание и настройка правил срабатывания алертов мониторинга.',
  'ar-monitoring': 'Мониторинг артефактов и репозитория контейнерных образов.',
  'metric-management': 'Сбор, хранение и управление метриками.',
  'public-api': 'Публичные API для интеграции с системами мониторинга.',
  logging: 'Централизованное логирование событий и диагностика.',
  notifications: 'Уведомления о событиях и срабатывании алертов.',
  resources: 'Просмотр и управление облачными ресурсами.',
  tags: 'Метки для классификации и организации ресурсов.',
  'resource-groups': 'Группировка ресурсов для управления и отчётности.',
  reports: 'Отчёты по использованию и состоянию ресурсов.',
  'task-history': 'История задач и операций над ресурсами.',
};

export function getServiceDescription(id: string, title: string): string {
  return SERVICE_DESCRIPTIONS[id] ?? `Сервис «${title}» в облачной платформе Cloud.ru.`;
}

/** Уникальный индекс всех сервисов (платформа + центр управления) для избранного. */
export function buildServicesIndex(controlItemIcon: string): Map<string, ServiceCard> {
  const byId = new Map<string, ServiceCard>();
  const add = (service: ServiceCard) => {
    if (!byId.has(service.id)) {
      byId.set(service.id, service);
    }
  };

  for (const category of SERVICE_CATEGORIES) {
    for (const service of category.services) add(service);
    for (const service of category.megaservice?.services ?? []) add(service);
    for (const subcategory of category.subcategories ?? []) {
      for (const service of subcategory.services) add(service);
    }
  }

  for (const category of CONTROL_CATEGORIES) {
    for (const subcategory of category.subcategories) {
      for (const item of subcategory.items) {
        add({
          id: item.id,
          icon: controlItemIcon,
          title: item.title,
          subtitle: '',
        });
      }
    }
  }

  return byId;
}

/** Список избранного в порядке добавления, без дубликатов по id. */
export function resolveFavoriteServices(
  favoriteIds: string[],
  index: Map<string, ServiceCard>,
): ServiceCard[] {
  return favoriteIds
    .map((id) => index.get(id))
    .filter((service): service is ServiceCard => service !== undefined);
}

export function findServicesByIds(ids: string[]): ServiceCard[] {
  const byId = new Map<string, ServiceCard>();
  for (const category of SERVICE_CATEGORIES) {
    for (const service of category.services) {
      byId.set(service.id, service);
    }
    for (const service of category.megaservice?.services ?? []) {
      byId.set(service.id, service);
    }
    for (const subcategory of category.subcategories ?? []) {
      for (const service of subcategory.services) {
        byId.set(service.id, service);
      }
    }
  }
  return resolveFavoriteServices(ids, byId);
}
