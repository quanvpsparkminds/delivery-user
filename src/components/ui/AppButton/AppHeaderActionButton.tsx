import React from "react";
import { Image, ImageSourcePropType } from "react-native";
import { style } from "theme";
import { HeaderButton, HeaderButtonProps } from "@react-navigation/elements";

type AppHeaderActionButtonProps = {
  source: ImageSourcePropType;
  tintColor?: string;
} & Omit<HeaderButtonProps, "children">;

export const AppHeaderActionButton: React.FC<AppHeaderActionButtonProps> = (
  props
) => {
  return (
    <HeaderButton {...props} style={[style.headerButton, props.style]}>
      <Image {...props} style={style.headerImage} tintColor={props.tintColor} />
    </HeaderButton>
  );
};
