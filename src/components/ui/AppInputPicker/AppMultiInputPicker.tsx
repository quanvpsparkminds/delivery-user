import React, { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  PressableProps,
  StyleSheet,
  View,
} from "react-native";
import { AppTextInput, AppTextInputProps } from "../AppInput/AppInput";
import { images } from "@assets/index";
import { SViewStyle } from "types";
import { palette, spacing, style } from "theme";
import { useAppTheme } from "provider";
import { AppText } from "../AppText";
import { AppModal } from "../AppModal";
import { hexToRgbA } from "utils";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TPickerItem } from "../AppPicker";

type AppMultiInputPickerProps = {
  items: TPickerItem[];
  activeKey: TPickerItem["key"][];
  onValueChange: (item: TPickerItem["key"][]) => void;
} & AppTextInputProps;

export function AppMultiInputPicker({
  items,
  activeKey,
  onValueChange,
  ...rest
}: AppMultiInputPickerProps) {
  const { colorScheme } = useAppTheme();

  const insets = useSafeAreaInsets();

  const [value, setValue] = useState<string[]>(activeKey);
  const [visible, setVisible] = useState<boolean>(false);

  const formatedValue = useMemo<string | undefined>(() => {
    let label: string = "";
    items.map((e) => {
      if (value.includes(e.key)) label += `${e.label}, `;
    });
    return label.slice(0, -2);
  }, [value, items]);

  const open = () => setVisible(true);

  const close = () => {
    setValue(activeKey);
    setVisible(false);
  };

  const handleItemPressed = (item: TPickerItem) => {
    if (value.includes(item.key)) {
      const removeActiveKey = value?.filter?.((e) => e !== item.key) || [];
      setValue(removeActiveKey);
    } else {
      setValue([...value, item.key]);
    }
  };

  const handleOnSave = () => {
    onValueChange(value);
    setVisible(false);
  };

  return (
    <Pressable
      style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.99 : 1 }] })}
      onPress={open}
    >
      <View pointerEvents="box-only">
        <AppTextInput
          {...rest}
          Right={({ tintColor }) => (
            <Image source={images.chevron_down} tintColor={tintColor} />
          )}
          value={formatedValue}
          onPress={open}
        />
      </View>
      <AppModal visible={visible} onRequestClose={close} onSave={handleOnSave}>
        <FlatList
          data={items.map((x) => ({
            ...x,
            active: value.includes(x.key),
          }))}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <PickerItem
              data={item}
              onPress={() => handleItemPressed(item)}
              isActive={item.active}
            />
          )}
          ItemSeparatorComponent={() => (
            <View
              style={[$divider, { backgroundColor: colorScheme.surface }]}
            />
          )}
        />
      </AppModal>
    </Pressable>
  );
}

type PickerItemProps = {
  data: TPickerItem;
  isActive: boolean;
} & PressableProps;

const PickerItem: React.FC<PickerItemProps> = ({ data, isActive, ...rest }) => {
  const { colorScheme } = useAppTheme();
  return (
    <Pressable
      {...rest}
      style={({ pressed }) => [
        $item,
        {
          transform: [{ scale: pressed ? 0.99 : 1 }],
          backgroundColor: data.active
            ? hexToRgbA(colorScheme.surface.toString(), 0.5)
            : palette.transparent,
        },
      ]}
    >
      <AppText>{data.label}</AppText>
      {isActive ? (
        <Image
          source={images.check}
          width={spacing.md}
          height={spacing.md}
          tintColor={colorScheme.onBackground}
        />
      ) : undefined}
    </Pressable>
  );
};

const $item: SViewStyle = [
  style.inbut,
  style.align_center,
  style.px_lg,
  style.round_zero,
  style.row,
  style.justify_between,
];

const $divider: SViewStyle = [
  { height: StyleSheet.hairlineWidth, width: "100%" },
];
