import React from 'react';
import type { Solution } from '../data/solutionsCatalog';
import { CategoryServicesSection, ServiceItemWrapper, ServiceWithSubservices } from './navigationServiceUi';
import { ClickableTitleChevron } from './categoryBlockHeaderUi';
import { getSolutionTheme } from './solutionCardTheme';

export interface SolutionBlockProps {
  solution: Solution;
  toggleFavorite?: (id: string) => void;
  favorites?: string[];
  showMoreDetails?: boolean;
}

export function SolutionBlock({
  solution,
  toggleFavorite,
  favorites = [],
  showMoreDetails = false,
}: SolutionBlockProps) {
  const theme = getSolutionTheme(solution.illustrationId);

  return (
    <article className="nav-solution-template">
      <div className="nav-solution-template__top">
        <p className="nav-solution-template__category" style={{ color: theme.accent }}>
          {theme.categoryLabel}
        </p>

        <div className="nav-solution-template__text">
          <h3 className="nav-solutions-promo-title nav-solution-template__title">{solution.title}</h3>
          <p className="nav-solutions-promo-desc nav-solution-template__desc">{solution.description}</p>
        </div>

        <button type="button" className="nav-solution-template__details-btn">
          Подробнее
          <ClickableTitleChevron />
        </button>
      </div>

      {solution.services.length > 0 && (
        <>
          <div className="nav-solution-template__divider" aria-hidden />
          <div className="nav-solution-template__services">
            <CategoryServicesSection showMoreDetails={showMoreDetails}>
              {solution.services.map((service) => (
                <ServiceItemWrapper key={service.id} showMoreDetails={showMoreDetails}>
                  <ServiceWithSubservices
                    service={service}
                    onAddToFavorites={toggleFavorite ?? (() => {})}
                    isFavorite={favorites.includes(service.id)}
                    showMoreDetails={showMoreDetails}
                  />
                </ServiceItemWrapper>
              ))}
            </CategoryServicesSection>
          </div>
        </>
      )}
    </article>
  );
}
