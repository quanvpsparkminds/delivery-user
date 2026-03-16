import { AppText, Banner, Layout } from "components";
import React from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import { spacing, style } from "theme";
import { SImageStyle, STextStyle, SViewStyle } from "types";
import { Groceries } from "./GroceryScreen.types";
import { images } from "@assets/index";
import { currency } from "utils";
import { useAppNavigation } from "navigators";

export const GroceryScreen = () => {
  const navigation = useAppNavigation();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Banner />
      <Layout paddingX="md">
        <AppText style={$txPromo}>Buy Any 2, Save $2</AppText>
        <AppText style={$sub}>
          On select Pepsi, Mountain Dew, Starry, Doritos, Ruffles, and Lay's
          items
        </AppText>
        <View style={$menu}>
          {Groceries.map((e, index) => (
            <Pressable style={$item} key={index}>
              <Image
                source={e.image as any}
                style={$img}
                resizeMode="contain"
              />
              <AppText numberOfLines={2} style={$name}>
                {e.name}
              </AppText>
              <AppText style={$price}>
                {currency}
                {e.price}
              </AppText>
              <View style={$rateBox}>
                <Image source={images.icon_star} />
                <AppText style={$txRate}>{e.rate}</AppText>
                <AppText style={$txRate}>-</AppText>
                <AppText
                  tx="home.rating"
                  txOptions={{ rate: e.rating }}
                  style={$txRate}
                ></AppText>
              </View>
            </Pressable>
          ))}
        </View>
      </Layout>
    </ScrollView>
  );
};

const WIDTH = spacing.screenWidth / 2 - spacing.md * 1.5;

const $menu: SViewStyle = [style.row, style.gap_md, { flexWrap: "wrap" }];
const $txPromo: STextStyle = [style.tx_font_bold, style.tx_size_xl];
const $sub: STextStyle = [style.tx_color_gray400];

const $item: SViewStyle = [
  style.gap_xxs,
  { width: spacing.screenWidth / 2 - spacing.md * 1.5 },
];
const $img: SImageStyle = [{ width: WIDTH, height: WIDTH * (121 / 171) }];
const $name: STextStyle = [style.tx_size_sm];
const $rateBox: SViewStyle = [style.row, style.align_center, style.gap_xxs];
const $txRate: STextStyle = [style.tx_size_sm];
const $price: STextStyle = [style.tx_font_semiBold];
