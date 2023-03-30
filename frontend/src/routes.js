import Home from './pages/home';
import Dashboard from './pages/dashboard/dashboard';
import Place from './pages/place/place';
import PlaceCreation from './pages/place/placeCreation';
import Area from './pages/area/area';
import Inventory from './pages/inventory/inventory';
import Item from './pages/item/item';
import NotFound from './pages/NotFound';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import { MdDashboard, MdStore, MdInventory } from 'react-icons/md';
import { BsBox, BsBoxes } from 'react-icons/bs';

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    name: 'home',
    label: 'home',
    path: '/',
    component: Home,
    isNavData: false,
    icon: null,
  },
  {
    name: 'dashboard',
    label: '대시보드',
    path: '/dashboard',
    component: Dashboard,
    isNavData: true,
    icon: MdDashboard,
  },
  {
    name: 'place',
    label: '사업장',
    path: '/place',
    component: Place,
    isNavData: true,
    icon: MdStore,
  },
  {
    name: 'placeCreation',
    label: '사업장 생성',
    path: '/place/creation',
    component: PlaceCreation,
    isNavData: false,
    icon: null
  },
  {
    name: 'area',
    label: '저장소',
    path: '/area',
    component: Area,
    isNavData: true,
    icon: BsBoxes,
  },
  {
    name: 'item',
    label: '품목',
    path: '/item',
    component: Item,
    isNavData: true,
    icon: BsBox,
  },
  {
    name: 'inventory',
    label: '재고',
    path: '/inventory',
    component: Inventory,
    isNavData: true,
    icon: MdInventory,
  },
  {
    name: 'signIn',
    label: 'Sign-in',
    path: '/sign-in',
    component: SignIn,
    isNavData: false,
    icon: null,
  },
  {
    name: 'signUp',
    label: 'Sign-up',
    path: '/sign-up',
    component: SignUp,
    isNavData: false,
    icon: null,
  },
  {
    name: 'notFound',
    label: 'notFound',
    path: '*',
    component: NotFound,
    isNavData: false,
    icon: null,
  },
];