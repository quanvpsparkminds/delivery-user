import React from "react";
import { FlatList, Pressable, View } from "react-native";
import { STextStyle, SViewStyle } from "types";
import { AppText } from "../AppText";
import { style } from "theme";

type AppTabProps<T> = {
  tabs: T[];
  activeTab: T;
  onChangeTab: (value: T) => void;
};

export const AppTab: React.FC<AppTabProps<any>> = ({
  tabs,
  activeTab,
  onChangeTab,
}) => {
  return (
    <View>
      <FlatList
        horizontal
        data={tabs}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.gap_xs}
        renderItem={({ item }) => {
          const isActive = item === activeTab;
          return (
            <Pressable
              onPress={() => onChangeTab(item)}
              style={[$item, isActive && $active]}
            >
              <AppText
                tx={`appTab.${item}` as any}
                style={isActive && $txActive}
              />
            </Pressable>
          );
        }}
      />
    </View>
  );
};

const HEIGHT = 30;
const $item: SViewStyle = [
  style.center,
  style.py_xxs,
  style.px_xl,
  style.rounded,
  style.border_color_gray100,
  { borderWidth: 1, height: HEIGHT },
];
const $active: SViewStyle = [style.bg_color_primary500, { borderWidth: 0 }];
const $txActive: STextStyle = [style.tx_color_white, style.tx_font_bold];
