import "i18n";

import { LoaderProvider } from "@baont97/rn-loader";
import { createStaticNavigation } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { ModertProvider } from "components/ui";
import { useAppDispatch, useQueryClient } from "hooks";
import { AppStack } from "navigators/AppStack";
import { AppThemeProvider, useAppTheme } from "provider";
import React from "react";
import BootSplash from "react-native-bootsplash";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { api } from "services";
import { Toaster } from "sonner-native";
import { persistor, signIn, store } from "store";
import { getReactNavigationTheme, style, typography } from "theme";
import { isAndroid, secureStorage, StorageKeys } from "utils";
import { PermissionsAndroid } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import { updateLocation } from "store/slices/LocationSlice";

export const App = () => {
  const queryClient = useQueryClient();

  const boostrapAsync = async () => {
    // Retrieve tokens from secure storage
    const token = await secureStorage.getItem(StorageKeys.token);
    if (token) {
      // Setup API with tokens
      api.setup({ token, enableLogging: __DEV__ });
      store.dispatch(signIn({ token }));
    }
  };

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AppThemeProvider>
          <LoaderProvider>
            <Provider store={store}>
              <PersistGate persistor={persistor} onBeforeLift={boostrapAsync}>
                <ModertProvider>
                  <KeyboardProvider>
                    <ThemedNavigation />
                  </KeyboardProvider>
                </ModertProvider>
              </PersistGate>
            </Provider>
          </LoaderProvider>
        </AppThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

const RootNavigation = createStaticNavigation(AppStack);

const ThemedNavigation = () => {
  const appTheme = useAppTheme();
  const navTheme = getReactNavigationTheme(appTheme);
  const dispatch = useAppDispatch();

  const handleRequiredLocation = () => {
    async function requestPermission() {
      if (isAndroid) {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      }
    }
    requestPermission();
    Geolocation.getCurrentPosition(
      (position) => {
        console.log({ position });
        dispatch(
          updateLocation({
            lat: position.coords?.latitude,
            long: position.coords?.longitude,
          }),
        );
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  return (
    <GestureHandlerRootView style={style.flex_1}>
      <KeyboardProvider statusBarTranslucent navigationBarTranslucent>
        <RootNavigation
          onReady={() => {
            BootSplash.hide();
            handleRequiredLocation();
          }}
          theme={navTheme}
        />
        <Toaster
          richColors
          toastOptions={{
            style: { borderRadius: 8 },
            titleStyle: {
              fontFamily: typography.medium,
              fontWeight: "normal",
            },
          }}
          duration={2000}
        />
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
};
