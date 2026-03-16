import { Pressable, PressableProps, View } from "react-native";
import { AppTextInput, AppTextInputProps } from "./AppInput";
import React from "react";

type DisplayAppTextInputProps = {} & AppTextInputProps & PressableProps;

export const DisplayAppTextInput: React.FC<DisplayAppTextInputProps> = ({
  onPress,
  ...props
}) => {
  return (
    <Pressable {...props} onPress={onPress}>
      <View pointerEvents="none">
        <AppTextInput {...props} editable={false} />
      </View>
    </Pressable>
  );
};
