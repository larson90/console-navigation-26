import React from 'react';
import { Outlet, useLocation } from 'react-router';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { PlatformProvider } from '../context/PlatformContext';
import { NavigationPrototypeProvider, useNavigationPrototype } from '../context/NavigationPrototypeContext';
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
  const { selectedPrototypeId } = useNavigationPrototype();
  const activePrototype = getPrototypeIdFromPath(pathname);

  return (
    <div className="min-h-screen bg-[#eeeff3]">
      <LkHeader prototypeId={selectedPrototypeId} />
      <Outlet />
      {activePrototype && (
        <NavigationPrototypeOverlay prototypeId={activePrototype}>
          <PrototypeContent id={activePrototype} />
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
          <LkLayoutContent />
        </NavigationPrototypeProvider>
      </PlatformProvider>
    </DndProvider>
  );
}
