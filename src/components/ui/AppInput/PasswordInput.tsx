import { AppIcon, AppTextInput, AppTextInputProps } from "components";
import React from "react";
import { Pressable } from "react-native";
import { scale } from "theme";

type PaswordInputProps = {} & AppTextInputProps;

export const PasswordInput: React.FC<PaswordInputProps> = (props) => {
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  return (
    <AppTextInput
      {...props}
      secureTextEntry={secureTextEntry}
      Right={({ tintColor }) => (
        <Pressable onPress={() => setSecureTextEntry((prev) => !prev)}>
          <AppIcon
            name={secureTextEntry ? "eye_off" : "eye"}
            size={scale.x(20, 20)}
            tintColor={tintColor}
          />
        </Pressable>
      )}
    />
  );
};
