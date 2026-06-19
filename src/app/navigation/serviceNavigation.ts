import { lookupMegaservicePageContext, type ServiceCard } from '../data/serviceCatalog';
import type { MegaservicePageContext, ServiceNavState } from '../components/servicePage/types';

export function buildServicePath(serviceId: string): string {
  return `/service/${serviceId}`;
}

export function buildMegaservicePageNavState(
  megaservice: MegaservicePageContext,
  activeSubpageId?: string,
): ServiceNavState {
  return {
    title: megaservice.title,
    icon: megaservice.icon,
    megaservice,
    activeSubpageId,
  };
}

export function buildServiceNavState(service: Pick<ServiceCard, 'id' | 'title' | 'icon' | 'subtitle'>): ServiceNavState {
  const megaservice = lookupMegaservicePageContext(service.id);

  if (megaservice) {
    return buildMegaservicePageNavState(
      megaservice,
      service.id !== megaservice.id ? service.id : undefined,
    );
  }

  return {
    title: service.title,
    icon: service.icon,
    subtitle: service.subtitle,
  };
}

export function buildMegaserviceNavState(megaserviceId: string): ServiceNavState | null {
  const megaservice = lookupMegaservicePageContext(megaserviceId);
  if (!megaservice) return null;

  return buildMegaservicePageNavState(megaservice);
}

export function navigateToServiceTarget(
  navigate: (path: string, options?: { state?: ServiceNavState }) => void,
  serviceId: string,
): boolean {
  const megaservice = lookupMegaservicePageContext(serviceId);
  if (!megaservice) return false;

  const isSubpage = serviceId !== megaservice.id;
  navigate(buildServicePath(isSubpage ? serviceId : megaservice.id), {
    state: buildMegaservicePageNavState(megaservice, isSubpage ? serviceId : undefined),
  });
  return true;
}
