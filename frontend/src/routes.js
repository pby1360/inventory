import Home from './pages/home';
import Dashboard from './pages/dashboard/dashboard';
import Place from './pages/place/place';
import PlaceCreation from './pages/place/placeCreation';
import PlaceDetail from './pages/place/placeDetail';
import PlaceUser from 'pages/place/placeUser';
import Storage from './pages/storage/storage';
import StorageCreation from 'pages/storage/storageCreation';
import StorageDetail from 'pages/storage/storageDetail';
import Inventory from './pages/inventory/inventory';
import InventoryCreation from './pages/inventory/inventoryCreation';
import InventoryDetail from './pages/inventory/inventoryDetail';
import Item from './pages/item/item';
import ItemCreation from './pages/item/itemCreation';
import ItemDetail from './pages/item/itemDetail';
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
    name: 'placeDetail',
    label: '사업장 상세정보',
    path: '/place/:placeId',
    component: PlaceDetail,
    isNavData: false,
    icon: null
  },
  {
    name: 'placeUser',
    label: '사업장 사용자',
    path: '/place/:placeId/users',
    component: PlaceUser,
    isNavData: false,
    icon: null
  },
  {
    name: 'storage',
    label: '저장소',
    path: '/storage',
    component: Storage,
    isNavData: true,
    icon: MdInventory,
  },
  {
    name: 'storageCreation',
    label: '품목 생성',
    path: '/storage/creation',
    component: StorageCreation,
    isNavData: false,
    icon: null
  },
  {
    name: 'storageDetail',
    label: '품목 상세정보',
    path: '/storage/:id',
    component: StorageDetail,
    isNavData: false,
    icon: null
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
    name: 'itemCreation',
    label: '품목 생성',
    path: '/item/creation',
    component: ItemCreation,
    isNavData: false,
    icon: null
  },
  {
    name: 'itemDetail',
    label: '품목 상세정보',
    path: '/item/:id',
    component: ItemDetail,
    isNavData: false,
    icon: null
  },
  {
    name: 'inventory',
    label: '재고',
    path: '/inventory',
    component: Inventory,
    isNavData: true,
    icon: BsBoxes,
  },
  {
    name: 'inventoryCreation',
    label: '재고 등록',
    path: '/inventory/creation',
    component: InventoryCreation,
    isNavData: false,
    icon: null
  },
  {
    name: 'inventoryDetail',
    label: '재고 상세정보',
    path: '/inventory/:id',
    component: InventoryDetail,
    isNavData: false,
    icon: null
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