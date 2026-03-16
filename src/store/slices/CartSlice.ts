import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TMenu, TRestaurant } from "services";

export type TCartItem = TMenu & {
  quantity: number;
  restaurantId: number;
  restaurantName: string;
  distance?: number;
  duration?: number;
  fee?: number;
};

interface CartState {
  items: TCartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ item: TMenu; restaurant: TRestaurant }>
    ) => {
      const { item, restaurant } = action.payload;
      const existingItem = state.items.find(
        (i) => i.id === item.id && i.restaurantId === restaurant.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...item,
          quantity: 1,
          restaurantId: restaurant.id,
          restaurantName: restaurant.fullName,
          distance: restaurant.route?.distance,
          duration: restaurant.route?.duration,
          fee: restaurant.route?.fee,
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: number; restaurantId: number }>) => {
      const index = state.items.findIndex(
        (i) => i.id === action.payload.id && i.restaurantId === action.payload.restaurantId
      );
      if (index !== -1) {
        if (state.items[index].quantity > 1) {
          state.items[index].quantity -= 1;
        } else {
          state.items.splice(index, 1);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
