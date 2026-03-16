import { zodResolver } from "@hookform/resolvers/zod";
import { AppButton, AppTextInput, PasswordInput } from "components";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import Animated, { ZoomInEasyDown } from "react-native-reanimated";
import { AuthFormValues, authSchemas } from "schemas";
import { RegisterFormValues, registerSchemas } from "schemas/RegisterSchemas";
import { style } from "theme";
import { SViewStyle } from "types";

export const SignUpForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchemas),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
    },
  });

  const handleSignIn = (data: RegisterFormValues) => {};

  return (
    <Animated.View entering={ZoomInEasyDown} style={style.flex_1}>
      <ScrollView contentContainerStyle={style.gap_sm}>
        <View style={$nameBox}>
          <View style={style.flex_1}>
            <Controller
              control={control}
              name="firstName"
              render={({ field: { value, onChange } }) => (
                <AppTextInput
                  labelTx="input.firstName.label"
                  placeholderTx="input.firstName.placeholder"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors?.firstName?.message}
                />
              )}
            />
          </View>
          <View style={style.flex_1}>
            <Controller
              control={control}
              name="lastName"
              render={({ field: { value, onChange } }) => (
                <AppTextInput
                  labelTx="input.lastName.label"
                  placeholderTx="input.lastName.placeholder"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors?.lastName?.message}
                />
              )}
            />
          </View>
        </View>
        <Controller
          control={control}
          name="phone"
          render={({ field: { value, onChange } }) => (
            <AppTextInput
              labelTx="input.phone.label"
              placeholderTx="input.phone.placeholder"
              value={value}
              onChangeText={onChange}
              errorMessage={errors?.phone?.message}
              keyboardType="number-pad"
            />
          )}
        />
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
        <AppButton
          titleTx="common.signIn"
          onPress={handleSubmit(handleSignIn)}
        />
      </ScrollView>
    </Animated.View>
  );
};

const $nameBox: SViewStyle = [style.row, style.gap_md];
