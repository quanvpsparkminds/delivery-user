import { useAppTheme } from "provider";
import React from "react";
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KSpacing, spacing } from "theme";

export type LayoutProps = {
  padding?: KSpacing;
  paddingX?: KSpacing;
  paddingY?: KSpacing;
  safeAreaOnTop?: boolean;
  safeAreaOnBottom?: boolean;
  backgroundColor?: ColorValue;
  nonFill?: boolean;
} & ViewProps &
  React.PropsWithChildren;

export const Layout: React.FC<LayoutProps> = (props) => {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useAppTheme();

  const {
    children,
    style: overriedStyle,
    padding,
    paddingX,
    paddingY,
    safeAreaOnTop,
    safeAreaOnBottom,
    backgroundColor,
    nonFill,
  } = props;

  const $style: StyleProp<ViewStyle> = StyleSheet.flatten([
    !nonFill ? $root : undefined,
    overriedStyle,
    { backgroundColor: backgroundColor ?? colorScheme.background },
    padding !== undefined && { padding: spacing[padding] },
    paddingX !== undefined && { paddingHorizontal: spacing[paddingX] },
    paddingY !== undefined && { paddingVertical: spacing[paddingY] },
    safeAreaOnTop && { paddingTop: insets.top },
    safeAreaOnBottom && { paddingBottom: insets.bottom ?? spacing.md },
  ]);

  return <View style={$style}>{children}</View>;
};

const $root: StyleProp<ViewStyle> = {
  flex: 1,
};
