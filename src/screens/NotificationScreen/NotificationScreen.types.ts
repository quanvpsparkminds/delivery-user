export type TNotification = {
  title: string;
  sub: string;
  createDate: string;
};

export const Notifications: TNotification[] = [
  {
    title: "Your order is being prepared",
    sub: "The restaurant has received your order and is getting it ready.",
    createDate: "2025-11-08T12:28:05.715Z",
  },
  {
    title: "Order delivered",
    sub: "Enjoy your meal! Thanks for ordering with Convilu.",
    createDate: "2025-11-08T12:20:05.715Z",
  },
  {
    title: "Almost there!",
    sub: "Let us know by rating your order experience today!",
    createDate: "2025-11-07T10:28:05.715Z",
  },
  {
    title: "Your courier is on the way to the restaurant",
    sub: "Your courier is just a few minutes away. Get ready to receive your order!",
    createDate: "2025-11-01T12:28:05.715Z",
  },
];
