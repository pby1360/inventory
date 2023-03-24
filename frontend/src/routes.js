import Home from './pages/home';
import Dashboard from './pages/dashboard/dashboard';
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
    isNavData: false,
  },
  {
    name: 'dashboard',
    label: '대시보드',
    path: '/dashboard',
    component: Dashboard,
    isNavData: true,
  },
  {
    name: 'site',
    label: '사업장',
    path: '/site',
    component: Site,
    isNavData: true,
  },
  {
    name: 'area',
    label: '저장소',
    path: '/area',
    component: Area,
    isNavData: true,
  },
  {
    name: 'inventory',
    label: '재고',
    path: '/inventory',
    component: Inventory,
    isNavData: true,
  },
  {
    name: 'item',
    label: '품목',
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