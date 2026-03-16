import React, { PropsWithChildren } from "react";
import { Modal, ModalProps, Pressable, View } from "react-native";
import { hexToRgbA } from "utils";
import { SViewStyle } from "types";
import { spacing, style } from "theme";
import { AppText } from "../AppText";
import { useAppTheme } from "provider";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppButton } from "../AppButton";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";

export type AppModalProps = {
  onSave?: () => void;
  maxHeight?: number;
} & ModalProps &
  PropsWithChildren;

export const AppModal: React.FC<AppModalProps> = ({
  onRequestClose,
  children,
  onSave,
  maxHeight = spacing.screenWidth,
  ...rest
}) => {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useAppTheme();

  const handleSave = () => onSave?.();

  return (
    <Modal transparent statusBarTranslucent animationType="fade" {...rest}>
      <View style={$modal}>
        <Pressable
          style={[
            $modalBackdrop,
            {
              backgroundColor: hexToRgbA(
                colorScheme.onBackground.toString(),
                0.5
              ),
            },
          ]}
          onPress={onRequestClose}
        />
        <Animated.View
          entering={FadeInDown}
          style={[
            $modalContent,
            { backgroundColor: colorScheme.background, maxHeight },
          ]}
        >
          {children}
        </Animated.View>
        <Animated.View
          entering={FadeInDown}
          exiting={FadeOutUp}
          style={$button}
        >
          <Pressable
            style={({ pressed }) => [
              $modalCancelBtn,
              {
                backgroundColor: colorScheme.background,
                marginBottom: insets.bottom || spacing.md,
                transform: [{ scale: pressed ? 0.99 : 1 }],
              },
            ]}
            onPress={onRequestClose}
          >
            <AppText style={{ color: colorScheme.error }} tx="common.cancel" />
          </Pressable>
          {onSave ? (
            <AppButton
              titleTx="common.save"
              style={style.flex_2}
              onPress={handleSave}
            />
          ) : undefined}
        </Animated.View>
      </View>
    </Modal>
  );
};

const $modal: SViewStyle = [style.flex_1, style.justify_end];
const $modalBackdrop: SViewStyle = [style.abs_fo, { zIndex: -1 }];
const $modalContent: SViewStyle = [
  style.mx_md,
  style.mb_xs,
  style.overflow_hidden,
  { borderRadius: style.inbut.borderRadius },
];
const $button: SViewStyle = [style.row, style.mx_md, style.gap_xs];
const $modalCancelBtn: SViewStyle = [
  style.inbut,
  style.center,
  style.mb_xs,
  style.flex_1,
];
