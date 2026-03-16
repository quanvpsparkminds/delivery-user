import { AppText } from "components";
import React from "react";
import { Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { spacing, style } from "theme";
import { SViewStyle } from "types";
import { ESignInType } from "../SignInScreen.types";

const tabs = Object.values(ESignInType);

type STabsProps = {
  mode: ESignInType;
  onChangeTab: (value: ESignInType) => void;
};

export const STabs: React.FC<STabsProps> = ({ mode, onChangeTab }) => {
  const offset = useSharedValue<number>(0);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  const handleChangeTab = (value: ESignInType) => {
    onChangeTab(value);
    offset.value = withTiming(
      value === tabs[0] ? 0 : WIDTH * tabs.indexOf(value),
      {
        duration: 300,
      },
    );
  };

  return (
    <View style={$root}>
      {tabs.map((e) => {
        return (
          <Pressable key={e} style={$item} onPress={() => handleChangeTab(e)}>
            <AppText tx={`signIn.tabs.${e}`} />
          </Pressable>
        );
      })}
      <Animated.View style={[$thumb, animatedStyles]} />
    </View>
  );
};

const HEIGHT = spacing.xxl;
const WIDTH = (spacing.screenWidth - spacing.md * 2) / 2;
const RADIUS = 6;

const $root: SViewStyle = [
  style.row,
  style.align_center,
  style.bg_color_gray100,
  { gap: 1, paddingHorizontal: 1, borderRadius: RADIUS },
];

const $item: SViewStyle = [
  style.flex_1,
  style.center,
  style.bg_color_white,
  { marginVertical: 1, height: HEIGHT, borderRadius: RADIUS },
];
const $thumb: SViewStyle = [
  style.abs,
  style.border_color_primary500,
  {
    borderWidth: 1,
    width: WIDTH,
    height: HEIGHT + 1,
    borderRadius: RADIUS,
  },
];
