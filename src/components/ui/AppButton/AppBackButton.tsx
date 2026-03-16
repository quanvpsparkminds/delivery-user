import React from "react";
import {
  HeaderBackButtonProps,
  HeaderBackButton as RNHeaderBackButton,
} from "@react-navigation/elements";
import { Image, ImageStyle } from "react-native";
import { images } from "@assets/index";
import { useAppTheme } from "provider";
import { isIOS } from "utils";
import { STextStyle, SViewStyle } from "types";
import { style } from "theme";

type HeaderBackButton = {
  imageName?: keyof typeof images;
} & HeaderBackButtonProps;

export const HeaderBackButton = ({
  imageName = "chevron_left",
  ...props
}: HeaderBackButton) => {
  const { colorScheme } = useAppTheme();
  return (
    <RNHeaderBackButton
      {...props}
      style={[$backBtn, props.style]}
      labelStyle={[$backLabel, props.labelStyle]}
      tintColor={(props.tintColor as string) || colorScheme.primary.toString()}
      onPress={props.onPress}
      backImage={
        props.backImage ||
        ((props) => (
          <Image
            source={images[imageName]}
            tintColor={props.tintColor}
            style={$backImage}
          />
        ))
      }
    />
  );
};

const $backBtn: SViewStyle = {
  transform: [{ translateX: isIOS ? -14 : 0 }],
};

const $backImage: ImageStyle = {
  width: 26,
  height: 26,
};

const $backLabel: STextStyle = [style.ml_xs];
