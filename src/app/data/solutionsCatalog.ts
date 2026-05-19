import { findServicesByIds, type ServiceCard } from './serviceCatalog';

export interface Solution {
  id: string;
  title: string;
  description: string;
  services: ServiceCard[];
}

export const SOLUTIONS: Solution[] = [
  {
    id: 'telegram-n8n',
    title: 'Telegram-бот с n8n на основе Container Apps или Notebooks',
    description: 'Создание Telegram-бота без кода с автоматизацией через n8n.',
    services: findServicesByIds(['container-apps', 'notebooks', 'object-storage', 'n8n']),
  },
  {
    id: 'jupyter-container',
    title: 'Jupyter Server в контейнере',
    description: 'Быстрый запуск Jupyter Server для аналитики и ML-задач',
    services: findServicesByIds(['artifact-registry', 'container-apps']),
  },
  {
    id: 'kubernetes-terraform',
    title: 'Kubernetes через Terraform',
    description: 'Развертывание инфраструктуры Kubernetes с помощью Terraform.',
    services: findServicesByIds(['vm', 'k8s', 'terraform']),
  },
  {
    id: 'helm-yaml-deploy',
    title: 'Helm и YAML-деплой',
    description: 'Публикация приложений в Kubernetes через Helm-чарты и YAML-манифесты',
    services: findServicesByIds(['vm', 'k8s', 'artifact-registry', 'docker', 'helm', 'kubectl']),
  },
  {
    id: 'keda-event-scaling',
    title: 'Event-Driven масштабирование с KEDA',
    description: 'Автоматическое масштабирование сервисов по событиям и очередям',
    services: findServicesByIds(['k8s', 'artifact-registry', 'vm', 'keda']),
  },
];
