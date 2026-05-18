import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import NavigationMenuPrototype2 from '../components/NavigationMenuPrototype2';

export default function Prototype2() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-[#eeeff3] relative">
        <NavigationMenuPrototype2 />
      </div>
    </DndProvider>
  );
}
