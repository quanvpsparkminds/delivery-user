import { TxKeyPath } from "i18n";
import { TOptions } from "i18next";
import { useAppTheme } from "provider";
import React from "react";
import { useTranslation } from "react-i18next";
import { ColorValue, TextInput, TextInputProps, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { style } from "theme";
import { STextStyle, SViewStyle } from "types";
import { hexToRgbA } from "utils";
import { AppText } from "../AppText";
import { useAppInputStyle } from "./AppInput.styles";
import { AppInputLabel } from "./AppInputLabel";

export type AppTextInputIconProps = {
  tintColor: ColorValue;
};

export type AppTextInputProps = {
  containerStyle?: SViewStyle;
  inputStyle?: STextStyle;

  label?: string;
  labelTx?: TxKeyPath;
  labelTxOptions?: TOptions;

  placeholder?: string;
  placeholderTx?: TxKeyPath;
  placeholderTxOptions?: TOptions;

  errorMessage?: string | false | undefined;

  Left?: (props: AppTextInputIconProps) => React.ReactNode;
  Right?: (props: AppTextInputIconProps) => React.ReactNode;
} & TextInputProps;

export const AppTextInput: React.FC<AppTextInputProps> = (props) => {
  const {
    inputStyle,
    label,
    labelTx,
    labelTxOptions,
    placeholder,
    placeholderTx,
    placeholderTxOptions,
    errorMessage,
    Left,
    Right,
    ...rest
  } = props;
  const { colorScheme } = useAppTheme();
  const { container, input } = useAppInputStyle(props);
  const { t } = useTranslation();

  return (
    <View style={style.gap_xxs}>
      <AppInputLabel {...{ label, labelTx, labelTxOptions }} />
      <View style={container}>
        {!!Left ? (
          <View style={$left}>
            <Left tintColor={colorScheme.surface} />
          </View>
        ) : undefined}
        <TextInput
          {...rest}
          style={input}
          placeholder={
            placeholder ||
            (placeholderTx ? t(placeholderTx, placeholderTxOptions) : undefined)
          }
          placeholderTextColor={hexToRgbA(
            colorScheme.onBackground.toString(),
            0.5
          )}
          textAlignVertical={props.multiline ? "top" : undefined}
        />
        {!!Right ? (
          <View style={$right}>
            <Right tintColor={colorScheme.surface} />
          </View>
        ) : undefined}
      </View>
      {Boolean(errorMessage) && (
        <View style={$errorWrapper}>
          <AppText style={$error}>{errorMessage}</AppText>
        </View>
      )}
    </View>
  );
};

const $left: SViewStyle = [{ height: "100%", aspectRatio: 1 }, style.center];

const $errorWrapper: SViewStyle = [style.py_xxs, style.px_xxs];

const $error: STextStyle = [style.tx_size_sm, style.tx_color_error500];

const $right: SViewStyle = $left;
