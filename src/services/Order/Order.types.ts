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
  id: number;
  status: string;
  totalPrice: number;
  distance: number;
  duration: number;
  fee: number;
};
