import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import NavigationMenuPrototype1 from '../components/NavigationMenuPrototype1';

export default function Prototype1() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-[#eeeff3] relative">
        <NavigationMenuPrototype1 />
      </div>
    </DndProvider>
  );
}
