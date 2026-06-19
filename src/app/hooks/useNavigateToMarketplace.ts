import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useNavigationPrototype } from '../context/NavigationPrototypeContext';
import { buildMarketplaceNavState, MARKETPLACE_PATH } from '../navigation/marketplaceNavigation';

export function useNavigateToMarketplace() {
  const navigate = useNavigate();
  const { completeMenuNavigation } = useNavigationPrototype();

  return useCallback(() => {
    navigate(MARKETPLACE_PATH, { state: buildMarketplaceNavState() });
    completeMenuNavigation();
  }, [completeMenuNavigation, navigate]);
}
