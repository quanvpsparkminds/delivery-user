import { images } from "@assets/index";
import { useLoader } from "@baont97/rn-loader";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AppButton,
  AppText,
  AppTextInput,
  modertRef,
  PasswordInput,
} from "components";
import { useAppDispatch, useSignInMutation } from "hooks";
import { useAppTheme } from "provider";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, ScrollView, View } from "react-native";
import Animated, { ZoomInEasyDown } from "react-native-reanimated";
import { AuthFormValues, authSchemas } from "schemas";
import { toast } from "sonner-native";
import { signIn } from "store";
import { style } from "theme";
import { STextStyle, SViewStyle } from "types";

const socials = [
  images.icon_google,
  images.icon_facebook,
  images.icon_apple,
  images.icon_device_mobile,
];

export const SignInForm = () => {
  const { mutate } = useSignInMutation();
  const { colorScheme } = useAppTheme();
  const dispatch = useAppDispatch();
  const loader = useLoader();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchemas),
    defaultValues: {
      email: "quanvp@sparkminds.net",
      password: "123456",
    },
  });

  const handleSignIn = (data: AuthFormValues) => {
    loader.show();
    mutate(data, {
      onSettled: loader.hide,
      onSuccess: (response) => {
        dispatch(signIn({ token: response.data.token }));
        toast.success("Login successfully!");
      },
      onError: (error) => toast.error(error.message),
    });
  };

  return (
    <Animated.View entering={ZoomInEasyDown} style={style.flex_1}>
      <ScrollView contentContainerStyle={style.gap_md}>
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange } }) => (
            <AppTextInput
              labelTx="input.email.label"
              placeholderTx="input.email.placeholder"
              value={value}
              onChangeText={onChange}
              errorMessage={errors?.email?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange } }) => (
            <PasswordInput
              labelTx="input.password.label"
              placeholderTx="input.password.placeholder"
              value={value}
              onChangeText={onChange}
              errorMessage={errors?.password?.message}
            />
          )}
        />
        <AppText tx="signIn.forgot" style={$txForgot} />
        <AppButton
          titleTx="common.signIn"
          onPress={handleSubmit(handleSignIn)}
        />
        <View style={$row}>
          <View style={$line} />
          <AppText
            tx="signIn.loginWith"
            style={[$txOr, { color: colorScheme.surface }]}
          />
          <View style={$line} />
        </View>
        <View style={$row}>
          {socials.map((e, index) => (
            <View key={index} style={$social}>
              <Image source={e} />
            </View>
          ))}
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const $row: SViewStyle = [style.row, style.gap_sm, style.align_center];
const $line: SViewStyle = [style.bg_color_gray100, style.flex_1, { height: 1 }];
const $txOr: STextStyle = [style.tx_size_sm];
const $social: SViewStyle = [
  style.flex_1,
  style.center,
  style.border_color_gray100,
  style.py_md,
  { borderWidth: 1, borderRadius: 10 },
];
const $txForgot: STextStyle = [
  style.tx_right,
  style.tx_size_sm,
  style.tx_font_semiBold,
  style.tx_color_primary500,
];
