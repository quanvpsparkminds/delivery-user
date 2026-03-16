import { images } from "@assets/index";
import React from "react";
import { Image, Pressable } from "react-native";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
import { palette, spacing, style } from "theme";
import { SImageStyle, SViewStyle } from "types";


type CCheckBoxProps = {
  checked: boolean;
  onToggle: () => void;
};
export const CCheckBox: React.FC<CCheckBoxProps> = ({ checked, onToggle }) => {
  return (
    <Pressable style={$checkBox} onPress={onToggle}>
      {checked && (
        <Animated.View
          style={$activeCheckBox}
          entering={ZoomIn}
          exiting={ZoomOut}
        >
          <Image
            source={images.check}
            style={$check}
            tintColor={palette.white}
          />
        </Animated.View>
      )}
    </Pressable>
  );
};


const CHECK_BOX_WIDTH = 20;

const $checkBox: SViewStyle = [
  style.border_color_gray200,
  style.center,
  style.round_xxs,
  { width: CHECK_BOX_WIDTH, height: CHECK_BOX_WIDTH, borderWidth: 1 },
];

const $activeCheckBox: SViewStyle = [
  style.bg_color_primary500,
  style.center,
  style.round_xxs,
  { width: CHECK_BOX_WIDTH, height: CHECK_BOX_WIDTH },
];
const $check: SImageStyle = {
  width: CHECK_BOX_WIDTH - spacing.xs,
  height: CHECK_BOX_WIDTH - spacing.xs,
};