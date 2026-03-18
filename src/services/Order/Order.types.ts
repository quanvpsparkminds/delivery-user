export type TOrderRequest = {
  restaurantId: number;
  deliveryFee?: number;
  deliveryAddress: string;
  items: { idMenu: number }[];
  lng: string;
  lat: string;
  address: string;
};

export type TOrderResponse = {
  address: string;
  createdAt: string;
  delivery?: {
    address: string;
    avatar: string | null;
    birthday: string | null;
    cityId: number;
    countryId: number;
    currentLng: number | null;
    current_Lat: number | null;
    email: string;
    firstName: string;
    id: number;
    lastName: string;
    onboarding: boolean;
    phoneCode: string;
    phoneNumber: string;
    postCode: string | null;
    status: string;
  } | null;
  deliveryAddress: string;
  deliveryFee: number | null;
  id: string;
  items: {
    id: number;
    name: string;
    price: number;
  }[];
  lat: string;
  lng: string;
  restaurant: {
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
    lng: number | null;
    lat: number | null;
  };
  status: string;
  totalAmount: number;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    birthday: string | null;
    phoneNumber: string;
    image: string | null;
    id: number;
    phoneCode: string;
  };
};
