import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { RootState } from "store/Store";
import { reduxStorage } from "utils";

export const locationSliceKey = "location";

type LocationState = {
  long: number;
  lat: number;
  address?: string;
};

const initialState: LocationState = {
  long: 0,
  lat: 0,
  address: "",
};

export const locationSlice = createSlice({
  name: locationSliceKey,
  initialState,
  reducers: {
    updateLocation: (
      state,
      action: PayloadAction<{ long: number; lat: number }>
    ) => {
      const { lat, long } = action.payload;
      state.lat = lat;
      state.long = long;
    },
    updateAddress: (state, action: PayloadAction<{ address: string }>) => {
      const { address } = action.payload;
      state.address = address;
    },
  },
});

export const { updateLocation, updateAddress } = locationSlice.actions;

export const selectLocation = (state: RootState) => state.location;
export const selectAddress = (state: RootState) => state.location.address;

// Configure Redux-persist
export default persistReducer<LocationState>(
  {
    key: locationSliceKey,
    storage: reduxStorage,
  },
  locationSlice.reducer
);
