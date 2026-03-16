import { Platform } from "react-native";
import { modertRef } from "components/ui";

export const blankFunct = () => {};
export const debugLog: Console["log"] = __DEV__ ? console.log : blankFunct;

export const isIOS = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";
export const currency = "$";

export const comingSoon = () =>
  modertRef.current?.show({
    title: "Coming Soon",
    message:
      "This feature is currently under development and will be available in a future update. Stay tuned!",
  });
