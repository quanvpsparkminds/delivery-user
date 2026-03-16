import { images } from "@assets/index";

export type TGrocery = {
  image: typeof images;
  name: string;
  rate: number;
  rating: number;
  price: number;
};

export const Groceries: TGrocery[] = [
  {
    image: images.blank,
    name: "Diet Mountain Dew Soda (2 L)",
    price: 3.29,
    rate: 4.9,
    rating: 261,
  },
  {
    image: images.blank,
    name: "Diet Mountain Dew Soda (2 L)",
    price: 3.29,
    rate: 4.9,
    rating: 261,
  },
  {
    image: images.blank,
    name: "Diet Mountain Dew Soda (2 L)",
    price: 3.29,
    rate: 4.9,
    rating: 261,
  },
  {
    image: images.blank,
    name: "Diet Mountain Dew Soda (2 L)",
    price: 3.29,
    rate: 4.9,
    rating: 261,
  },
  {
    image: images.blank,
    name: "Diet Mountain Dew Soda (2 L)",
    price: 3.29,
    rate: 4.9,
    rating: 261,
  },
  {
    image: images.blank,
    name: "Diet Mountain Dew Soda (2 L)",
    price: 3.29,
    rate: 4.9,
    rating: 261,
  },
];
