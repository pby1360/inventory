
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

type SearchType = {
  [key: string]: string | number;
}

export type { Place, PlaceUser, User, SearchType };