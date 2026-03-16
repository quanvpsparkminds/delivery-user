import { ComponentPresetStyle } from "types";
import { TextStyle, ViewStyle } from "react-native";

export const defaultButtonPressedScale = 0.99;

export enum EAppButtonType {
  filled = "filled",
  outlined = "outlined",
  transparent = "transparent",
}

export enum EAppButtonStatus {
  enabled = "enabled",
  disabled = "disabled",
}

export type TAppButtonPresetStyles = ComponentPresetStyle<
  EAppButtonType,
  EAppButtonStatus,
  ViewStyle
>;

export type TAppButtonTitlePresetStyles = ComponentPresetStyle<
  EAppButtonType,
  EAppButtonStatus,
  TextStyle
>;

export type AppButtonPresetStyles = {
  title: TAppButtonTitlePresetStyles;
  button: TAppButtonPresetStyles;
};
