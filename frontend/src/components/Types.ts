
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
  placeId: number;
  placeName: string;
  category: string;
  address?: string;
  permission: string;
  userStatus: string;
  userCount : number;
}

export type { Place, PlaceUser };