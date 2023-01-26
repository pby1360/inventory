import Home from './pages/home';
import Site from './pages/site/site';
import Area from './pages/area/area';
import Inventory from './pages/inventory/inventory';
import Item from './pages/item/item';
import NotFound from './pages/NotFound';
import SignIn from './components/signIn';
import SignUp from './components/signUp';

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
    name: 'signIn',
    label: 'Sign-in',
    path: '/sign-in',
    component: SignIn,
    isNavData: false,
  },
  {
    name: 'signUp',
    label: 'Sign-up',
    path: '/sign-up',
    component: SignUp,
    isNavData: false,
  },
  {
    name: 'notFound',
    label: 'notFound',
    path: '*',
    component: NotFound,
    isNavData: false,
  },
];