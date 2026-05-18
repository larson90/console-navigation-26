import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import NavigationMenuPrototype3 from '../components/NavigationMenuPrototype3';

export default function Prototype3() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-[#eeeff3] relative">
        <NavigationMenuPrototype3 />
      </div>
    </DndProvider>
  );
}
