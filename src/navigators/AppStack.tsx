import { images } from "@assets/index";
import { StaticParamList, useNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { useAppSelector } from "hooks";
import {
  CartScreen,
  FetchingScreen,
  LanguageScreen,
  MapScreen,
  NotificationScreen,
  SignInScreen,
  StoreScreen,
} from "screens";
import { selectIsSignedIn } from "store";
import { isAndroid } from "utils";
import { AppTabbarNavigator } from "./AppTabbarNavigator";

const useIsSignedIn = () => useAppSelector(selectIsSignedIn);
const useIsSignedOut = () => !useAppSelector(selectIsSignedIn);

export const AppStack = createNativeStackNavigator({
  screenOptions: {
    headerBackImageSource: isAndroid ? images.chevron_left : undefined,
    headerShadowVisible: false,
    headerBackButtonDisplayMode: "minimal",
  },
  groups: {
    SignedIn: {
      if: useIsSignedIn,
      screens: {
        FetchData: FetchingScreen,
        AppTabbar: {
          screen: AppTabbarNavigator,
          options: {
            headerShown: false,
          },
        },
        Map: MapScreen,
        Notification: NotificationScreen,
        Cart: CartScreen,
        Store: {
          screen: StoreScreen,
          params: { id: 0 as number | string },
        },
      },
    },
    SignedOut: {
      if: useIsSignedOut,
      screens: {
        SignIn: SignInScreen,
      },
    },
  },
  screens: {
    Language: LanguageScreen,
  },
});

export type AppStackParamList = StaticParamList<typeof AppStack>;

export type AppStackNavigationProps<T extends keyof AppStackParamList> =
  NativeStackNavigationProp<AppStackParamList, T>;

export function useAppNavigation<T extends keyof AppStackParamList>() {
  return useNavigation<AppStackNavigationProps<T>>();
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}
