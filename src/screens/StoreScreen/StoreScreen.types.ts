import { images } from "@assets/index";

export type TDish = {
  id: string;
  image: typeof images;
  name: string;
  price: number;
  rate: number;
  rating: number;
};

export const Dishes: TDish[] = [
  {
    id: "1",
    image: images.item_dish_1,
    name: "Triple Party Burger",
    price: 20,
    rate: 4.9,
    rating: 99,
  },
  {
    id: "2",
    image: images.item_dish_2,
    name: "Triple Party Burger",
    price: 20,
    rate: 4.9,
    rating: 99,
  },
  {
    id: "3",
    image: images.item_dish_3,
    name: "Triple Party Burger",
    price: 20,
    rate: 4.9,
    rating: 99,
  },
];
