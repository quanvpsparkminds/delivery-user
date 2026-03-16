import { useAppTheme } from "provider";
import React from "react";
import { View, ViewProps } from "react-native";

type ColoredViewProps = {} & ViewProps;

export const ColoredView: React.FC<ColoredViewProps> = ({ style, ...rest }) => {
  const { colorScheme } = useAppTheme();
  return (
    <View
      style={[{ backgroundColor: colorScheme.background }, style]}
      {...rest}
    />
  );
};
