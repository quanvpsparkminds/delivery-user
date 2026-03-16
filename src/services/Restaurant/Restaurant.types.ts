export type TMenu = {
  id: number;
  image: string | null;
  type: string;
  originPrice: number | null;
  price: number;
  name: string;
  isDelete: boolean;
};

export type TRoute = {
  distance: number;
  duration: number;
  fee: number;
};

export type TRestaurant = {
  id: number;
  email: string;
  fullName: string;
  phoneCode: string;
  phoneNumber: string;
  countryId: number;
  cityId: number;
  address: string;
  postCode: string;
  type: string;
  image: string | null;
  lng: string;
  lat: string;
  route?: TRoute;
  menu?: TMenu[];
};
