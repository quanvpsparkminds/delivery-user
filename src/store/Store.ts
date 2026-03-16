import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { reduxStorage } from "utils";
import AuthSlice, { authSliceKey } from "./slices/AuthSlice";
import LocationSlice, {
  locationSliceKey
} from "./slices/LocationSlice";
import { cartReducer } from "./slices/CartSlice";

const logger = createLogger({});
const rootReducer = combineReducers({
  auth: AuthSlice,
  location: LocationSlice,
  cart: cartReducer,
});

const persistedReducer = persistReducer(
  {
    key: "root",
    storage: reduxStorage,
    blacklist: [authSliceKey, locationSliceKey],
  },
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const extraMiddlewares = [];
    if (__DEV__) extraMiddlewares.push(logger);
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(extraMiddlewares);
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
