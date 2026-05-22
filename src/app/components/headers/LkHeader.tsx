import type { NavigationPrototypeId } from '../../navigationPrototype';
import { LkHeaderPrototype1 } from './LkHeaderPrototype1';
import { LkHeaderPrototype2 } from './LkHeaderPrototype2';
import { LkHeaderPrototype3 } from './LkHeaderPrototype3';

interface LkHeaderProps {
  prototypeId: NavigationPrototypeId;
}

export function LkHeader({ prototypeId }: LkHeaderProps) {
  switch (prototypeId) {
    case '1':
      return <LkHeaderPrototype1 />;
    case '2':
      return <LkHeaderPrototype2 />;
    case '3':
      return <LkHeaderPrototype3 />;
    default:
      return <LkHeaderPrototype1 />;
  }
}
