import React from "react";
import { AppText, AppTextProps } from "../AppText";
import { Pressable, PressableProps, View } from "react-native";
import {
  defaultButtonPressedScale,
  EAppButtonStatus,
  EAppButtonType,
  TAppButtonPresetStyles,
} from "./AppButton.types";
import { useAppTheme } from "provider";
import { STextStyle, SViewStyle } from "types";
import { Loader } from "../Loader";
import { palette } from "theme";
import { hexToRgbA } from "utils";
import { style as presetStyle } from "theme";
import { AppIcon, AppIconProps } from "components";

import * as styles from "./AppButton.styles";

export type AppButtonProps = {
  title?: AppTextProps["children"];
  titleTx?: AppTextProps["tx"];
  titleTxOptions?: AppTextProps["txOptions"];
  type?: EAppButtonType;
  pressedScale?: number;
  style?: SViewStyle;
  titleStyle?: STextStyle;
  loading?: boolean;
  iconProps?: AppIconProps;
} & Omit<PressableProps, "style">;

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  titleTx,
  titleTxOptions,
  type = EAppButtonType.filled,
  disabled,
  pressedScale = defaultButtonPressedScale,
  style,
  titleStyle,
  loading,
  iconProps,
  ...rest
}) => {
  const { colorScheme } = useAppTheme();
  const presetStyle = styles.getAppButtonPresetStyles(colorScheme);

  const _disabled = disabled || loading;

  const styleKey: keyof TAppButtonPresetStyles = `${type}_${
    _disabled ? EAppButtonStatus.disabled : EAppButtonStatus.enabled
  }`;

  const $root = [presetStyle.button[styleKey], style];
  const $title = [presetStyle.title[styleKey], titleStyle];

  return (
    <Pressable
      {...rest}
      disabled={_disabled || loading}
      style={({ pressed }) => [
        $root,
        type === EAppButtonType.transparent
          ? {
              backgroundColor: pressed
                ? hexToRgbA(colorScheme.surface.toString(), 0.1)
                : palette.transparent,
            }
          : {
              transform: [{ scale: pressed ? pressedScale : 1 }],
              opacity: pressed ? 0.95 : 1,
            },
      ]}
    >
      {loading ? (
        <Loader style={styles.$loader} />
      ) : (
        <View style={$body}>
          {iconProps !== undefined && <AppIcon {...iconProps} size={12} />}
          {titleTx || title ? (
            <AppText tx={titleTx} txOptions={titleTxOptions} style={$title}>
              {title}
            </AppText>
          ) : undefined}
        </View>
      )}
    </Pressable>
  );
};
const $body: SViewStyle = [
  presetStyle.row_center,
  presetStyle.px_md,
  presetStyle.gap_xs,
];
