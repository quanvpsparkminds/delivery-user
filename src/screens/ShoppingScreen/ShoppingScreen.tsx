import { AppTab, AppText, Layout } from "components";
import React, { useState } from "react";
import { EShoppingType, Shoppings } from "./ShoppingScreen.types";
import { STextStyle, SViewStyle } from "types";
import { style } from "theme";
import { FlatList, Image, View } from "react-native";
import { images } from "@assets/index";

export const ShoppingScreen = () => {
  const [type, setType] = useState<EShoppingType>(EShoppingType.Grocery);
  return (
    <Layout safeAreaOnTop paddingX="md" style={style.gap_md}>
      <AppTab
        tabs={Object.values(EShoppingType)}
        activeTab={type}
        onChangeTab={setType}
      />
      <AppText tx="shopping.near" style={$title} />
      <FlatList
        data={Shoppings}
        contentContainerStyle={style.gap_sm}
        renderItem={({ item }) => {
          return (
            <View style={$box}>
              <Image source={images.blank} />
              <View style={[style.flex_1, style.gap_sm]}>
                <AppText style={$name}>{item.name}</AppText>
                <View style={$location}>
                  <Image source={images.location} />
                  <AppText style={$txLocation}>{item.distance}km</AppText>
                  <View style={style.mx_xs} />
                  <Image source={images.car} />
                  <AppText style={$txLocation}>{item.time}min</AppText>
                </View>
              </View>
              <View style={[style.row, style.gap_xxs]}>
                <Image source={images.icon_star} />
                <AppText>{item.rate}</AppText>
                <AppText>({item.rating})</AppText>
              </View>
            </View>
          );
        }}
      />
    </Layout>
  );
};

const $title: STextStyle = [style.tx_font_bold, { fontSize: 18 }];
const $box: SViewStyle = [
  style.row,
  style.gap_xs,
  style.round_sm,
  style.p_sm,
  style.border_color_gray100,
  { borderWidth: 1 },
];
const $name: STextStyle = [style.tx_font_semiBold];
const $location: SViewStyle = [style.row, style.gap_xxxs, style.align_center];
const $txLocation: STextStyle = [{ fontSize: 14 }];
