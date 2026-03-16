import { palette, spacing, style } from "theme";
import { AppButtonPresetStyles } from "./AppButton.types";
import { TColorScheme } from "provider";
import { STextStyle, SViewStyle } from "types";
import { ViewStyle } from "react-native";

const $buttonBase: SViewStyle = [style.inbut, style.row_center];
const $titleBase: STextStyle = [
  { fontSize: spacing.txBaseSize },
  style.tx_font_semiBold,
];

export const getAppButtonPresetStyles = (
  colorScheme: TColorScheme
): AppButtonPresetStyles => ({
  button: {
    filled_enabled: [$buttonBase, { backgroundColor: colorScheme.primary }],
    filled_disabled: [$buttonBase, { backgroundColor: palette.gray100 }],
    outlined_enabled: [
      $buttonBase,
      { borderWidth: 1, borderColor: colorScheme.surface },
    ],
    outlined_disabled: [
      $buttonBase,
      { borderWidth: 1, borderColor: palette.gray100 },
    ],
    transparent_enabled: [$buttonBase],
    transparent_disabled: [$buttonBase],
  },
  title: {
    filled_enabled: [$titleBase, { color: colorScheme.background }],
    filled_disabled: [$titleBase, { color: palette.gray400 }],
    outlined_enabled: [$titleBase, { color: colorScheme.primary }],
    outlined_disabled: [$titleBase, , { color: palette.gray100 }],
    transparent_enabled: [$titleBase, { color: colorScheme.primary }],
    transparent_disabled: [$titleBase, { color: palette.gray400 }],
  },
});

export const $loader: ViewStyle = {
  width: "100%",
  height: "120%",
};
