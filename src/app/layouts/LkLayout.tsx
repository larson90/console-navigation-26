import React from 'react';
import { Outlet, useLocation } from 'react-router';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { PlatformProvider } from '../context/PlatformContext';
import { NavigationPrototypeProvider, useNavigationPrototype } from '../context/NavigationPrototypeContext';
import { ServicePageBreadcrumbProvider } from '../context/ServicePageBreadcrumbContext';
import { UserActionToastProvider } from '../context/UserActionToastContext';
import { ScreenLoadingProvider } from '../context/ScreenLoadingContext';
import { TooltipProvider } from '../components/ui/tooltip';
import { LkHeader } from '../components/LkHeader';
import { NavigationPrototypeOverlay } from '../components/NavigationPrototypeOverlay';
import NavigationMenuPrototype1 from '../components/NavigationMenuPrototype1';
import NavigationMenuPrototype2 from '../components/NavigationMenuPrototype2';
import NavigationMenuPrototype3 from '../components/NavigationMenuPrototype3';
import { getPrototypeIdFromPath } from '../navigationPrototype';
import type { NavigationPrototypeId } from '../navigationPrototype';

function PrototypeContent({ id }: { id: NavigationPrototypeId }) {
  switch (id) {
    case '1':
      return <NavigationMenuPrototype1 />;
    case '2':
      return <NavigationMenuPrototype2 />;
    case '3':
      return <NavigationMenuPrototype3 />;
    default:
      return null;
  }
}

function LkLayoutContent() {
  const { pathname } = useLocation();
  const { isMenuOpen, selectedPrototypeId } = useNavigationPrototype();
  const legacyPrototypePath = getPrototypeIdFromPath(pathname);
  const showMenuOverlay = isMenuOpen || legacyPrototypePath !== null;
  const overlayPrototypeId = legacyPrototypePath ?? selectedPrototypeId;

  return (
    <div className="min-h-screen bg-[#eeeff3]">
      <LkHeader prototypeId={selectedPrototypeId} />
      <Outlet />
      {showMenuOverlay && (
        <NavigationPrototypeOverlay prototypeId={overlayPrototypeId}>
          <PrototypeContent id={overlayPrototypeId} />
        </NavigationPrototypeOverlay>
      )}
    </div>
  );
}

export default function LkLayout() {
  return (
    <DndProvider backend={HTML5Backend}>
      <PlatformProvider>
        <NavigationPrototypeProvider>
          <ServicePageBreadcrumbProvider>
            <UserActionToastProvider>
              <ScreenLoadingProvider>
                <TooltipProvider delayDuration={300}>
                  <LkLayoutContent />
                </TooltipProvider>
              </ScreenLoadingProvider>
            </UserActionToastProvider>
          </ServicePageBreadcrumbProvider>
        </NavigationPrototypeProvider>
      </PlatformProvider>
    </DndProvider>
  );
}
