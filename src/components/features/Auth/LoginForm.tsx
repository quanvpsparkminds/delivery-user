import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { style } from "theme";
import { LoginFormValues, loginSchema, STextStyle } from "types";
import { AppButton, AppTextInput, PasswordInput } from "../../ui";

type LoginFormProps = {
  onSubmit: (values: LoginFormValues) => void;
  loading?: boolean;
};

export const LoginForm = ({ onSubmit, loading }: LoginFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  return (
    <>
      <Controller
        control={control}
        name="username"
        render={({ field }) => (
          <AppTextInput
            labelTx="input.login.label"
            placeholderTx="input.login.placeholder"
            value={field.value}
            onChangeText={field.onChange}
            errorMessage={errors.username?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <PasswordInput
            labelTx="input.password.label"
            placeholderTx="input.password.placeholder"
            value={field.value}
            onChangeText={field.onChange}
            errorMessage={errors.password?.message}
          />
        )}
      />
      <AppButton
        titleTx="signIn.submitButton"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
        disabled={(loading || !isValid) && isDirty}
      />
    </>
  );
};

const $txForgot: STextStyle = [style.tx_right];
