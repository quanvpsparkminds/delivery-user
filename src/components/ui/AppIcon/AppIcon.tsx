import { images } from "@assets/index";
import React from "react";
import { Image, ImageProps } from "react-native";
import { KPalette, KSpacing, palette, spacing } from "theme";
import { KColorScheme, TAppTheme, useAppTheme } from "provider";

type TSize = number | KSpacing;

export type AppIconProps = {
  name: keyof typeof images;
  size?: TSize;
  colorName?: keyof TAppTheme["colorScheme"] | KPalette;
} & ImageProps;

export const AppIcon = ({
  name,
  size = "md",
  colorName,
  tintColor,
  ...rest
}: AppIconProps) => {
  const { colorScheme } = useAppTheme();
  const realSize = typeof size === "number" ? size : spacing[size];
  const resolvedTintColor = colorName
    ? colorName && Object.hasOwn(colorScheme, colorName)
      ? colorScheme[colorName as KColorScheme]
      : palette[colorName as KPalette]
    : colorScheme.onBackground;

  return (
    <Image
      {...(rest as ImageProps)}
      source={images[name as keyof typeof images]}
      style={[
        { width: realSize, height: realSize, tintColor: resolvedTintColor },
        rest.style,
      ]}
      tintColor={resolvedTintColor}
    />
  );
};
