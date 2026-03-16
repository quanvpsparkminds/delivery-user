import { images } from "@assets/index";

export enum ERestaurantType {
  DELIVERY = "DELIVERY",
  PICK_UP = "PICK_UP",
  DINE_IN = "DINE_IN",
}

export type TRetaurantRate = {
  image: typeof images;
  name: string;
  rate: number;
  rating: number;
};

export const TopRetaurantRate: TRetaurantRate[] = [
  {
    image: images.restaurant_1,
    name: "Crave & Co – Sydney, New South Wales",
    rate: 4.9,
    rating: 100,
  },
  {
    image: images.restaurant_2,
    name: "Crave & Co – Sydney, New South Wales",
    rate: 4.9,
    rating: 100,
  },
  {
    image: images.restaurant_3,
    name: "Crave & Co – Sydney, New South Wales",
    rate: 4.9,
    rating: 100,
  },
  {
    image: images.restaurant_4,
    name: "Crave & Co – Sydney, New South Wales",
    rate: 4.9,
    rating: 100,
  },
];
