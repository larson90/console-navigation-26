import { createBrowserRouter } from 'react-router';
import LkLayout from './layouts/LkLayout';
import LkDashboard from './pages/LkDashboard';

/** Дашборд остаётся под оверлеем меню — виден через затемнение. */
function PrototypeRoutePlaceholder() {
  return <LkDashboard />;
}

export const router = createBrowserRouter(
  [
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
  ],
  { basename: import.meta.env.BASE_URL },
);
