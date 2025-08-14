import { lazy } from 'react';

export const routes = [
  { path: '/', element: lazy(() => import('@home/pages/HomePage')) },
  { path: '/character', element: lazy(() => import('@character/pages/CharacterPage')) },
  { path: '/inventory', element: lazy(() => import('@inventory/pages/InventoryPage')) },
  { path: '/quests', element: lazy(() => import('@quests/pages/QuestsPage')) },
  { path: '/spells', element: lazy(() => import('@spells/pages/SpellsPage')) },
  { path: '/api-demo', element: lazy(() => import('@modules/ApiDemo/pages/ApiDemo')) },
];


