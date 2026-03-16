import React, { useMemo } from "react";
import { TxKeyPath } from "i18n";
import { TOptions } from "i18next";
import { STextStyle } from "types";
import { KColorScheme, useAppTheme } from "provider";
import { Text, TextProps } from "react-native";
import { KPalette, palette, spacing, style } from "theme";
import { useTranslation } from "react-i18next";

export type AppTextProps = {
  tx?: TxKeyPath;
  txOptions?: TOptions;
  color?: KColorScheme | KPalette;
} & TextProps;

export const AppText: React.FC<AppTextProps> = ({
  children,
  tx,
  txOptions,
  color = "onBackground",
  style,
  ...rest
}) => {
  const { colorScheme } = useAppTheme();
  const { t } = useTranslation();

  const content = useMemo<AppTextProps["children"]>(
    () => (tx ? t(tx, txOptions) : children),
    [tx, txOptions, children, t]
  );

  return (
    <Text
      {...rest}
      style={[
        $root,
        {
          color: Object.hasOwn(colorScheme, color)
            ? colorScheme[color as KColorScheme]
            : palette[color as KPalette],
        },
        style,
      ]}
    >
      {content}
    </Text>
  );
};

const $root: STextStyle = [
  style.tx_font_regular,
  { fontSize: spacing.txBaseSize },
];
