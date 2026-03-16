import React, { useMemo } from "react";
import { Image } from "react-native";
import { AppTextInput, AppTextInputProps } from "../AppInput/AppInput";
import { images } from "@assets/index";
import { AppPicker, AppPickerProps } from "../AppPicker";

type AppInputPickerProps = AppTextInputProps & AppPickerProps;

export function AppInputPicker(props: AppInputPickerProps) {
  const formatedValue = useMemo<string | undefined>(
    () =>
      (props.multiple
        ? props.activeKey
            ?.map((x) => props.items?.find((y) => y.key === x)?.label)
            ?.join(", ")
        : props.items.find((x) => x.key === props.activeKey)?.label) || "",
    [props.activeKey, props.items, props.multiple]
  );

  return (
    <AppPicker multiple={false} {...props}>
      <AppTextInput
        {...props}
        Right={
          props.disabled
            ? undefined
            : ({ tintColor }) => (
                <Image source={images.chevron_down} tintColor={tintColor} />
              )
        }
        value={formatedValue}
      />
    </AppPicker>
  );
}
