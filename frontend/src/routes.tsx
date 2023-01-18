import Home from './pages/home';
import Site from './pages/site/site';
import Area from './pages/area/area';
import Inventory from './pages/inventory/inventory';
import Item from './pages/item/item';
import NotFound from './pages/NotFound';

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    name: 'home',
    label: 'home',
    path: '/',
    component: Home,
    isNavData: true,
  },
  {
    name: 'site',
    label: 'Site',
    path: '/site',
    component: Site,
    isNavData: true,
  },
  {
    name: 'area',
    label: 'Area',
    path: '/area',
    component: Area,
    isNavData: true,
  },
  {
    name: 'inventory',
    label: 'Inventory',
    path: '/inventory',
    component: Inventory,
    isNavData: true,
  },
  {
    name: 'item',
    label: 'Item',
    path: '/item',
    component: Item,
    isNavData: true,
  },
  {
    name: 'notFound',
    label: 'notFound',
    path: '*',
    component: NotFound,
    isNavData: false,
  },
];