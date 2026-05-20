import { createBrowserRouter } from 'react-router';
import LkLayout from './layouts/LkLayout';
import LkDashboard from './pages/LkDashboard';

function PrototypeRoutePlaceholder() {
  return null;
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: LkLayout,
    children: [
      {
        index: true,
        Component: LkDashboard,
      },
      {
        path: 'prototype-1',
        Component: PrototypeRoutePlaceholder,
      },
      {
        path: 'prototype-2',
        Component: PrototypeRoutePlaceholder,
      },
      {
        path: 'prototype-3',
        Component: PrototypeRoutePlaceholder,
      },
    ],
  },
]);
