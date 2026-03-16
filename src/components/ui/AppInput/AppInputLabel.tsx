import React from "react";
import { TOptions } from "i18next";
import { TxKeyPath } from "i18n";
import { AppText, AppTextProps } from "../AppText";
import { STextStyle } from "types";
import { style } from "theme";
import { useAppTheme } from "provider";

type AppInputLabelProps = {
  label?: string;
  labelTx?: TxKeyPath;
  labelTxOptions?: TOptions;
} & AppTextProps;

export const AppInputLabel: React.FC<AppInputLabelProps> = ({
  label,
  labelTx,
  labelTxOptions,
  ...rest
}) => {
  const { colorScheme } = useAppTheme();
  return !!labelTx || !!label ? (
    <AppText
      tx={labelTx}
      txOptions={labelTxOptions}
      style={[$tx, { color: colorScheme.surface }]}
      {...rest}
    >
      {label}
    </AppText>
  ) : undefined;
};

const $tx: STextStyle = [style.tx_size_sm, style.tx_font_medium];
