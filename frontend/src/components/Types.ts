
interface Place {
  id?: number;
  name?: string;
  category?: string;
  zipCode?: string;
  address1?: string;
  address2?: string;
  contact?: string;
  remark?: string;
};

interface PlaceUser {
  placeUserId: number;
  placeId: number;
  placeName: string;
  category: string;
  address?: string;
  permission: string;
  userStatus: string;
  userCount : number;
}

interface User {
  id: number;
  placeId: number;
  userId: string;
  userName: string;
  phoneNumber: string;  
  permission: string;
  status: string;
  createAt: string;
}

interface ItemType {
  id?: number;
  placeId: number | undefined;
  name: string;
  type: string;
  price: number | undefined;
  unit: string;
  spec: string;
  createdAt?: string;
  createdBy?: string;
  createUserName?: string;
  modifiedAt?: string;
  modifiedBy?: string;
  modifyUserName?: string;
  remark?: string;
}

interface StorageType {
  id?: number;
  placeId: number | undefined;
  name: string;
  createdAt?: string;
  createdBy?: string;
  createUserName?: string;
  modifiedAt?: string;
  modifiedBy?: string;
  modifyUserName?: string;
  remark?: string;
}

type SearchType = {
  [key: string]: string | number;
}

export type { Place, PlaceUser, User, ItemType, SearchType, StorageType };