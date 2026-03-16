export enum EShoppingType {
  Grocery = "Grocery",
  Convenience = "Convenience",
  Alcohol = "Alcohol",
  Over = "Over",
}

type TShop = {
  image?: string;
  name: string;
  rate: number;
  rating: number;
  distance: number;
  time: string;
};

export const Shoppings: TShop[] = [
  {
    name: "Groceri - Sydney, New South Wales",
    rate: 4.5,
    rating: 99,
    distance: 1,
    time: "7",
  },
  {
    name: "Groceri - Sydney, New South Wales",
    rate: 4.5,
    rating: 99,
    distance: 1,
    time: "7",
  },
];
