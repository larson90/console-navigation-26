import React from 'react';
import { useNavigate } from 'react-router';
import { lookupServiceGroupLabel, type ServiceCard } from '../data/serviceCatalog';
import { useNavigationPrototype } from '../context/NavigationPrototypeContext';
import { buildServiceNavState, buildServicePath } from '../navigation/serviceNavigation';
import { ServiceIcon } from './navigationServiceUi';

function RecentServiceRow({ service }: { service: ServiceCard }) {
  const navigate = useNavigate();
  const { completeMenuNavigation } = useNavigationPrototype();
  const subtitle = service.subtitle || lookupServiceGroupLabel(service.id);

  const handleClick = () => {
    navigate(buildServicePath(service.id), { state: buildServiceNavState(service) });
    completeMenuNavigation();
  };

  return (
    <button type="button" className="nav-recent-service-row" onClick={handleClick}>
      <ServiceIcon icon={service.icon} />
      <span className="nav-recent-service-row__text">
        <span className="nav-recent-service-row__title">{service.title}</span>
        {subtitle ? <span className="nav-recent-service-row__subtitle">{subtitle}</span> : null}
      </span>
    </button>
  );
}

interface RecentServicesListProps {
  recentServices: ServiceCard[];
}

export function RecentServicesList({ recentServices }: RecentServicesListProps) {
  return (
    <div className="nav-recent-services-list flex flex-col w-full">
      {recentServices.map((service) => (
        <RecentServiceRow key={service.id} service={service} />
      ))}
    </div>
  );
}
