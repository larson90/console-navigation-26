import React, { useCallback, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { imgIconColor13 as defaultServiceIcon } from '../../imports/MainMenuDesktop/svg-3dkbq';
import { getServiceDescription, lookupMegaservicePageContext, lookupServiceById } from '../data/serviceCatalog';
import { ServicePageTemplate } from '../components/servicePage/ServicePageTemplate';
import type { ServiceNavState, ServicePageView, ServiceSubpageNavItem } from '../components/servicePage/types';
import {
  buildMegaservicePageNavState,
  buildServicePath,
} from '../navigation/serviceNavigation';
import { recordRecentServiceVisit } from '../hooks/recentServicesStorage';

export default function ServicePage() {
  const { serviceId = '' } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const navState = location.state as ServiceNavState | null;

  const catalogService = useMemo(
    () => lookupServiceById(serviceId, defaultServiceIcon),
    [serviceId],
  );

  const megaserviceContext = useMemo(
    () => navState?.megaservice ?? lookupMegaservicePageContext(serviceId),
    [navState?.megaservice, serviceId],
  );

  const activeSubpage = useMemo((): ServiceSubpageNavItem | null => {
    if (!megaserviceContext || serviceId === megaserviceContext.id) {
      return null;
    }
    return megaserviceContext.subpages.find((item) => item.id === serviceId) ?? null;
  }, [megaserviceContext, serviceId]);

  const megaserviceView: ServicePageView = activeSubpage ? 'subpage' : 'overview';

  const serviceTitle = megaserviceContext?.title ?? navState?.title ?? catalogService?.title ?? serviceId;
  const serviceIcon = megaserviceContext?.icon ?? navState?.icon ?? catalogService?.icon ?? defaultServiceIcon;
  const description = getServiceDescription(serviceId, serviceTitle);

  const openOverview = useCallback(() => {
    if (!megaserviceContext) return;
    navigate(buildServicePath(megaserviceContext.id), {
      state: buildMegaservicePageNavState(megaserviceContext),
    });
  }, [megaserviceContext, navigate]);

  const openSubpage = useCallback(
    (subpage: ServiceSubpageNavItem) => {
      if (!megaserviceContext) return;
      navigate(buildServicePath(subpage.id), {
        state: buildMegaservicePageNavState(megaserviceContext, subpage.id),
      });
    },
    [megaserviceContext, navigate],
  );

  useEffect(() => {
    document.title = serviceTitle;
  }, [serviceTitle]);

  useEffect(() => {
    if (serviceId) {
      recordRecentServiceVisit(serviceId);
    }
  }, [serviceId]);

  return (
    <ServicePageTemplate
      serviceTitle={serviceTitle}
      serviceIcon={serviceIcon}
      description={description}
      megaserviceContext={megaserviceContext ?? undefined}
      megaserviceView={megaserviceContext ? megaserviceView : undefined}
      megaserviceActiveSubpage={megaserviceContext ? activeSubpage : undefined}
      onMegaserviceOpenOverview={megaserviceContext ? openOverview : undefined}
      onMegaserviceOpenSubpage={megaserviceContext ? openSubpage : undefined}
    />
  );
}
