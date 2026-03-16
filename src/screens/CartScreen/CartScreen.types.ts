export type TCart = {
  branchId: string;
  branchName: string;
  name: string;
  price: number;
};

export const Carts: TCart[] = [
  {
    branchId: "123",
    branchName: "Groceri Official",
    name: "Diet Mountain Dew Soda (2L)",
    price: 10,
  },
  {
    branchId: "123",
    branchName: "Groceri Official",
    name: "Coca (2L)",
    price: 10,
  },
  {
    branchId: "111",
    branchName: "Crave & Co",
    name: "Triple Party Burger",
    price: 20,
  },
];
