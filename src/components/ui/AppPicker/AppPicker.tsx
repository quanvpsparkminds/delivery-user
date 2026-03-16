import { images } from "@assets/index";
import { useAppTheme } from "provider";
import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  FlatList,
  FlatListProps,
  Image,
  Pressable,
  PressableProps,
  StyleSheet,
  View,
} from "react-native";
import { palette, spacing, style } from "theme";
import { SViewStyle } from "types";
import { hexToRgbA } from "utils";
import { AppModal } from "../AppModal";
import { AppText } from "../AppText";
import { TPickerItem } from "./AppPicker.types";

import _ from "lodash";

const itemHeight = style.inbut.height;
const maxItemPerBatch = Math.floor(spacing.screenWidth / itemHeight);

/// T is active value
/// P is onValueChange callback value
type BaseProps<T> = {
  items: TPickerItem[];
  activeKey: T;
  onValueChange: (input: T) => void;
  autoSubmit?: boolean;
  disabled?: boolean;
  initialScrollIndex?: number;
} & PropsWithChildren;

export type AppPickerProps =
  | ({ multiple: true } & BaseProps<TPickerItem["key"][]>)
  | ({ multiple?: false } & BaseProps<TPickerItem["key"]>);

export const AppPicker = (props: AppPickerProps) => {
  const { colorScheme } = useAppTheme();

  const { autoSubmit = !props.multiple, items } = props;

  const [visible, setVisible] = useState<boolean>(false);
  const [temp, setTemp] = useState<AppPickerProps["activeKey"]>(
    props.activeKey
  );

  const listRef = React.useRef<FlatList<TPickerItem>>(null);

  const open = () => {
    setTemp(props.activeKey);
    setVisible(true);
  };

  const close = () => setVisible(false);

  const handleItemPressed = (item: TPickerItem) => {
    setTemp((prev) => {
      let nextValue: AppPickerProps["activeKey"];
      if (props.multiple === true && _.isArray(temp)) {
        nextValue = _.includes(prev, item.key)
          ? _.filter(prev, (x) => x !== item.key)
          : [...prev, item.key];
      } else {
        nextValue = item.key;
      }
      if (autoSubmit) {
        props.onValueChange(nextValue as any);
        close();
      }
      return nextValue;
    });
  };

  const checkIsActive = useCallback(
    (item: TPickerItem) =>
      props.multiple
        ? temp?.includes?.(item?.key)
        : item.key === (autoSubmit ? props.activeKey : temp),
    [props.multiple, props.activeKey, temp, autoSubmit]
  );

  const handleSavePressed = () => {
    props.onValueChange(temp as any);
    close();
  };

  const initialScrollIndex = useMemo<
    FlatListProps<TPickerItem>["initialScrollIndex"]
  >(() => {
    if (items.length < maxItemPerBatch) return undefined;
    const activeIndex = items.findIndex((x) => x.key === props.activeKey);
    return activeIndex !== -1 ? activeIndex : props.initialScrollIndex;
  }, [items, props.activeKey, props.initialScrollIndex]);

  return (
    <Pressable
      style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.99 : 1 }] })}
      onPress={open}
      disabled={props.disabled}
    >
      <View pointerEvents="none">{props.children}</View>
      <AppModal
        visible={visible}
        onRequestClose={close}
        onSave={autoSubmit && !props.multiple ? undefined : handleSavePressed}
      >
        <FlatList
          ref={listRef}
          data={items.map((x) => ({ ...x, active: checkIsActive(x) }))}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <PickerItem data={item} onPress={() => handleItemPressed(item)} />
          )}
          ItemSeparatorComponent={() => (
            <View
              style={[$divider, { backgroundColor: colorScheme.surface }]}
            />
          )}
          initialScrollIndex={initialScrollIndex}
          getItemLayout={(_, index) => ({
            length: itemHeight,
            offset: itemHeight * index,
            index,
          })}
        />
      </AppModal>
    </Pressable>
  );
};

type PickerItemProps = {
  data: TPickerItem;
} & PressableProps;

export const PickerItem: React.FC<PickerItemProps> = ({ data, ...rest }) => {
  const { colorScheme } = useAppTheme();
  const active = data?.k === "color" ? false : data.active;
  return (
    <Pressable
      {...rest}
      style={({ pressed }) => [
        $item,
        {
          transform: [{ scale: pressed ? 0.99 : 1 }],
          backgroundColor: active
            ? hexToRgbA(colorScheme.surface.toString(), 0.5)
            : palette.transparent,
        },
      ]}
    >
      {data?.k === "color" ? (
        <View style={[$colorStyle, { backgroundColor: data.label }]} />
      ) : undefined}
      <AppText style={style.flex_1}>{data.label}</AppText>
      {data.active ? (
        <Image
          source={images.check}
          style={style.headerImage}
          tintColor={colorScheme.onBackground}
        />
      ) : undefined}
    </Pressable>
  );
};

const $colorStyle: SViewStyle = [
  style.round_lg,
  style.mr_md,
  { width: 20, height: 20 },
];

const $item: SViewStyle = [
  style.inbut,
  style.justify_between,
  style.px_lg,
  style.round_zero,
  style.row,
  style.align_center,
  { height: itemHeight },
];

const $divider: SViewStyle = [
  { height: StyleSheet.hairlineWidth, width: "100%" },
];
