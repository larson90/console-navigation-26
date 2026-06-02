import { useMemo } from 'react';
import { type ServiceCategory, SERVICE_CATEGORIES } from '../data/serviceCatalog';
import { serviceMatchesSearch } from '../data/serviceHierarchy';

const PLATFORM_SERVICE_CATEGORIES = SERVICE_CATEGORIES.filter(
  (c) => c.id !== 'security-administration',
);

function categoryMatchesQuery(category: ServiceCategory, query: string): boolean {
  return category.title.toLowerCase().includes(query);
}

function filterCategoryServices(category: ServiceCategory, query: string): ServiceCategory {
  const filteredMegaServices =
    category.megaservice?.services.filter((service) =>
      serviceMatchesSearch(service.id, service.title, service.subtitle, query),
    ) ?? [];

  const filteredRegularServices = category.services.filter((service) =>
    serviceMatchesSearch(service.id, service.title, service.subtitle, query),
  );

  const filteredSubcategories =
    category.subcategories
      ?.map((sub) => ({
        ...sub,
        services: sub.services.filter((service) =>
          serviceMatchesSearch(service.id, service.title, service.subtitle, query),
        ),
      }))
      .filter((sub) => sub.services.length > 0) ?? [];

  return {
    ...category,
    megaservice:
      filteredMegaServices.length > 0 && category.megaservice
        ? { ...category.megaservice, services: filteredMegaServices }
        : undefined,
    services: filteredRegularServices,
    subcategories: filteredSubcategories,
  };
}

function categoryHasVisibleServices(category: ServiceCategory): boolean {
  return (
    (category.megaservice?.services.length ?? 0) +
      category.services.length +
      (category.subcategories?.reduce((n, s) => n + s.services.length, 0) ?? 0) >
    0
  );
}

export function usePlatformServiceSearch(searchQuery: string) {
  const trimmed = searchQuery.trim();
  const query = trimmed.toLowerCase();

  const { filteredCategories, matchedCategoryIds } = useMemo(() => {
    if (!trimmed) {
      return {
        filteredCategories: PLATFORM_SERVICE_CATEGORIES,
        matchedCategoryIds: [] as string[],
      };
    }

    const matchedIds: string[] = [];
    const categories = PLATFORM_SERVICE_CATEGORIES.map((category) => {
      if (categoryMatchesQuery(category, query)) {
        matchedIds.push(category.id);
        return category;
      }
      return filterCategoryServices(category, query);
    }).filter(
      (category) =>
        categoryMatchesQuery(category, query) || categoryHasVisibleServices(category),
    );

    return { filteredCategories: categories, matchedCategoryIds: matchedIds };
  }, [trimmed, query]);

  const hasCatalogResults = filteredCategories.length > 0;
  const isCategorySearch = matchedCategoryIds.length > 0;

  return {
    filteredCategories,
    matchedCategoryIds,
    hasCatalogResults,
    isCategorySearch,
    showFilteredCatalog: trimmed.length > 0 && hasCatalogResults,
  };
}

export { PLATFORM_SERVICE_CATEGORIES };
