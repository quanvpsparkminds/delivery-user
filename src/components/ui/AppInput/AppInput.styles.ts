import { STextStyle, SViewStyle } from "types";
import { useAppTheme } from "provider";
import { scale, spacing, style } from "theme";
import { AppTextInputProps } from "./AppInput";
import { hexToRgbA } from "utils";

export const useAppInputStyle = ({
  inputStyle,
  errorMessage,
  containerStyle,
  Left,
  multiline,
}: AppTextInputProps) => {
  const { colorScheme } = useAppTheme();

  return {
    container: [
      $root,
      { borderColor: errorMessage ? colorScheme.error : colorScheme.surface },
      multiline && { minHeight: scale.y(100, 120), height: null },
      containerStyle,
    ],
    input: [
      {
        color: colorScheme.onBackground,
        paddingVertical: 0,
      },
      multiline && style.py_md,
      Boolean(Left) && style.pl_zero,
      $input,
      inputStyle,
    ] as SViewStyle,
    placeholderTextColor: hexToRgbA(colorScheme.onBackground.toString(), 0.5),
  };
};

const $root: SViewStyle = [
  style.inbut,
  style.row,
  style.border_width_hairlineWidth,
];
const $input: STextStyle = [
  style.tx_font_regular,
  style.px_sm,
  { fontSize: spacing.txBaseSize, flex: 1 },
];
