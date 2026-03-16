import React from "react";
import { images } from "@assets/index";
import { AppText, AppTextProps } from "../AppText";
import { Image, View } from "react-native";
import { spacing, style } from "theme";
import { SImageStyle, SViewStyle } from "types";
import { useAppTheme } from "provider";

export type BlankBoxProps = {
  style?: SViewStyle;
} & AppTextProps;

export const BlankBox: React.FC<BlankBoxProps> = ({ style, ...textProps }) => {
  const { colorScheme } = useAppTheme();

  return (
    <View style={[style, $root]}>
      <Image
        source={images.blank}
        style={$image}
        tintColor={colorScheme.surface}
      />
      <AppText style={{ color: colorScheme.surface }} {...textProps} />
    </View>
  );
};

const $root: SViewStyle = [style.center, style.gap_sm];
const $image: SImageStyle = [
  { width: spacing.screenWidth * 0.15, height: spacing.screenWidth * 0.15 },
];
