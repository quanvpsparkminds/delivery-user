import { AppIcon } from "components";
import { useAppTheme } from "provider";
import React from "react";
import { Pressable, View } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";
import { palette, style } from "theme";
import { SViewStyle } from "types";
import { AppText, AppTextProps } from "../AppText";

type AppCheckBoxProps = {
  checked: boolean;
  onValueChange: (value: boolean) => void;
  labelTx?: AppTextProps["tx"];
  label?: AppTextProps["children"];
};

const iconSize = style.inbut.height * 0.4;
const radius = iconSize * 0.4;

export const AppCheckBox: React.FC<AppCheckBoxProps> = ({
  checked,
  onValueChange,
  labelTx,
  label,
}) => {
  const { colorScheme } = useAppTheme();

  return (
    <View style={$root}>
      <Pressable
        onPress={() => onValueChange(!checked)}
        style={[
          $button,
          { borderColor: checked ? colorScheme.primary : colorScheme.surface },
        ]}
      >
        {checked && (
          <Animated.View
            entering={ZoomIn.duration(150)}
            style={[
              $checkedBackground,
              { backgroundColor: colorScheme.primary },
            ]}
          />
        )}
        <AppIcon
          name="check"
          size={iconSize}
          tintColor={checked ? colorScheme.onPrimary : palette.transparent}
        />
      </Pressable>
      <AppText tx={labelTx}>{label}</AppText>
    </View>
  );
};

const $root: SViewStyle = [
  { borderRadius: radius },
  style.row,
  style.align_center,
  style.gap_sm,
];
const $button: SViewStyle = [
  { borderRadius: radius, borderWidth: 1 },
  style.px_xxxs,
  style.square,
  style.center,
  style.overflow_hidden,
];
const $checkedBackground: SViewStyle = [
  style.abs_fo,
  style.zIndexM1,
  { borderRadius: radius - 1 },
];
