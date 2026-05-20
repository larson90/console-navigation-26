import React from 'react';
import { Outlet, useLocation } from 'react-router';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { LkHeader, getPrototypeIdFromPath } from '../components/LkHeader';
import { NavigationPrototypeOverlay } from '../components/NavigationPrototypeOverlay';
import NavigationMenuPrototype1 from '../components/NavigationMenuPrototype1';
import NavigationMenuPrototype2 from '../components/NavigationMenuPrototype2';
import NavigationMenuPrototype3 from '../components/NavigationMenuPrototype3';
import type { NavigationPrototypeId } from '../components/LkHeader';

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

export default function LkLayout() {
  const { pathname } = useLocation();
  const activePrototype = getPrototypeIdFromPath(pathname);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-[#f5f6f8]">
        <LkHeader activePrototype={activePrototype} />
        <Outlet />
        {activePrototype && (
          <NavigationPrototypeOverlay prototypeId={activePrototype}>
            <PrototypeContent id={activePrototype} />
          </NavigationPrototypeOverlay>
        )}
      </div>
    </DndProvider>
  );
}
