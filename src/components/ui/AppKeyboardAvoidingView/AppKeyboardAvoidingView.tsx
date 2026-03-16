import { useHeaderHeight } from "@react-navigation/elements";
import React from "react";
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
  ScrollView,
  ScrollViewProps,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { style } from "theme";

type AppKeyboardAvoidingViewProps = {} & ScrollViewProps;

export const AppKeyboardAvoidingView: React.FC<AppKeyboardAvoidingViewProps> = (
  props
) => {
  // const insets = useSafeAreaInsets();
  // const headerHeight = useHeaderHeight();

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={style.gap_xs}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={style.flex_1}
      bottomOffset={Platform.OS === "ios" ? 100 : 0}
      ScrollViewComponent={ScrollView}
      {...props}
    />
  );
};
