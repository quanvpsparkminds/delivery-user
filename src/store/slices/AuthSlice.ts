import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { api } from "services";
import { TUser } from "services/Auth/Auth.types";
import { RootState } from "store/Store";
import { reduxSecureStorage, secureStorage, StorageKeys } from "utils";

export const authSliceKey = "auth";

type AuthState = {
  token: string;
  user: TUser | null;
};

const initialState: AuthState = {
  token: "",
  user: null,
};

export const authSlice = createSlice({
  name: authSliceKey,
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<{ token: string }>) => {
      const { token } = action.payload;
      state.token = token;
      // Store token in secure storage
      secureStorage.setItem(StorageKeys.token, token);

      // Configure API
      api.setup({ token });
    },
    updateMe: (state, action: PayloadAction<TUser>) => {
      console.log(action.payload);

      state.user = action.payload;
    },
    updateRole: (state, action: PayloadAction<{ role: string[] }>) => {
      const { role } = action.payload;
    },
    signOut: (state) => {
      state.token = "";
      state.user = null;
      // Clear secure storage
      secureStorage.removeItem(StorageKeys.token);
      // Clear API tokens
      api.ejectTokens();
    },
  },
});

export const { signIn, signOut, updateRole, updateMe } = authSlice.actions;

export const selectIsSignedIn = (state: RootState) => Boolean(state.auth.token);
export const selectUser = (state: RootState) => state.auth.user;

// Configure Redux-persist
export default persistReducer<AuthState>(
  {
    key: authSliceKey,
    storage: reduxSecureStorage,
    blacklist: ["isLoading", "error", "token"],
  },
  authSlice.reducer,
);
