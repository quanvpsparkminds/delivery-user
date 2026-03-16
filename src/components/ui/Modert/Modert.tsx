import { useAppTheme } from "provider";
import React from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import Animated, { Keyframe } from "react-native-reanimated";
import { spacing, style } from "theme";
import { STextStyle, SViewStyle } from "types";
import { hexToRgbA } from "utils";
import { AppButton } from "../AppButton";
import { AppText } from "../AppText";
import { useModert } from "./ModertConfigs";

const enteringKeyframes = new Keyframe({
  0: { opacity: 0.5, transform: [{ scale: 1.1 }] },
  100: { opacity: 1, transform: [{ scale: 1 }] },
}).duration(250);

export const Modert: React.FC = () => {
  const { modert, hide } = useModert();
  const appTheme = useAppTheme();

  return (
    <>
      {modert.visible ? (
        <Pressable
          style={[
            $root,
            style.abs_fo,
            {
              width: spacing.screenWidth,
              height: spacing.screenHeight,
              backgroundColor: hexToRgbA("#000", 0.2),
            },
          ]}
        >
          <Pressable
            onPress={modert.disabledBackdropPress ? undefined : hide}
            style={[
              $backdrop,
              style.flex_1,
              { backgroundColor: hexToRgbA("#000", 0.2) },
            ]}
          />
          <Animated.View
            entering={enteringKeyframes}
            style={[
              $content,
              {
                backgroundColor:
                  appTheme.colorSchemeName === "dark" ? "black" : "white",
              },
            ]}
          >
            {Boolean(modert.title) && (
              <AppText style={$title}>{modert.title}</AppText>
            )}
            <AppText style={$message}>{modert.message}</AppText>
            <View style={$buttons}>
              {modert.buttons.map((item, key) => (
                <AppButton style={[$button, item.style]} {...item} key={key} />
              ))}
            </View>
          </Animated.View>
        </Pressable>
      ) : undefined}
    </>
  );
};

const $root: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
};

const $content: ViewStyle = {
  width: spacing.screenWidth * 0.8,
  borderRadius: style.inbut.borderRadius,
  padding: spacing.md,
  gap: spacing.md,
};

const $title: STextStyle = [style.tx_font_medium, { fontSize: 18 }];
const $message: STextStyle = [style.opacity_7];

const $buttons: SViewStyle = [
  style.row,
  style.align_center,
  style.justify_end,
  style.gap_sm,
];

const $backdrop: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
  zIndex: -1,
};

const buttonHeight = 28;
const $button: SViewStyle = [
  { height: buttonHeight, borderRadius: buttonHeight / 5 },
  style.px_md,
];
