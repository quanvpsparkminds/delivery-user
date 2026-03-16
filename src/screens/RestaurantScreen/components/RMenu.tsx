import { images } from "@assets/index";
import { AppText } from "components";
import { TxKeyPath } from "i18n";
import { AppStackParamList, useAppNavigation } from "navigators";
import React from "react";
import { FlatList, Image, Pressable, View } from "react-native";
import { spacing, style } from "theme";
import { STextStyle, SViewStyle } from "types";

type TRMenu = {
  image: keyof typeof images;
  label: TxKeyPath;
  navigate?: keyof AppStackParamList;
};

const menu: TRMenu[] = [
  { image: "home_seller", label: "home.menu.seller" },
  { image: "home_promo", label: "home.menu.promo" },
  { image: "home_meal", label: "home.menu.meal" },
  { image: "home_nearby", label: "home.menu.nearby", navigate: "Map" },
];

export const RMenu = () => {
  const navigation = useAppNavigation();
  const handleOnPress = (key: keyof AppStackParamList) =>
    navigation.navigate(key);

  return (
    <FlatList
      horizontal
      scrollEnabled={false}
      showsHorizontalScrollIndicator={false}
      data={menu}
      renderItem={({ item }) => (
        <Pressable
          style={$item}
          onPress={() => item.navigate && handleOnPress(item.navigate)}
        >
          <Image source={images[item.image]} />
          <AppText tx={item.label as TxKeyPath} style={$tx} />
        </Pressable>
      )}
    />
  );
};

const WIDTH = (spacing.screenWidth - spacing.md * 2) / 4;
const $item: SViewStyle = [
  style.center,
  style.py_md,
  style.gap_xxs,
  {
    width: WIDTH,
    height: WIDTH,
  },
];

const $tx: STextStyle = [style.tx_size_sm];
