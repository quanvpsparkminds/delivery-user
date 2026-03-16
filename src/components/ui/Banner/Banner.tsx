import { images } from "@assets/index";
import { useAppNavigation } from "navigators";
import React from "react";
import { Image, Pressable, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { palette, spacing, style } from "theme";
import { SImageStyle, STextStyle, SViewStyle } from "types";
import { hexToRgbA } from "utils";
import { AppText } from "../AppText";
import { useAppSelector } from "hooks";
import { selectAddress } from "store/slices/LocationSlice";

const banners = [images.banner_1, images.banner_2];

export const Banner = () => {
  const navigation = useAppNavigation();

  const { top } = useSafeAreaInsets();
  const address = useAppSelector(selectAddress);

  const handleSearch = () => {
    navigation.navigate("AppTabbar", {
      screen: "Search",
    });
  };

  const handleNotification = () => navigation.navigate("Notification");
  const handleCart = () => navigation.navigate("Cart");

  return (
    <View>
      <View style={[$root, { top, left: spacing.md, right: spacing.md }]}>
        <View style={$location}>
          <AppText style={$txLocation} numberOfLines={1}>
            {address}
          </AppText>
        </View>
        <View style={style.flex_1} />
        <Pressable style={$rounded} onPress={handleNotification}>
          <Image source={images.icon_bell} />
        </Pressable>
        <Pressable style={$rounded} onPress={handleCart}>
          <Image source={images.icon_cart} />
        </Pressable>
      </View>
      <Carousel
        width={spacing.screenWidth}
        height={IMAGE_HEIGHT}
        data={banners}
        renderItem={({ item }) => <Image source={item} style={$banner} />}
        loop
        autoPlay
        scrollAnimationDuration={1000}
      />
      <Pressable style={$search} onPress={handleSearch}>
        <Image source={images.tab_search} tintColor={palette.black} />
        <AppText tx="home.search" style={style.tx_color_gray500} />
      </Pressable>
    </View>
  );
};

const IMAGE_HEIGHT = 340;
const SEARCH_HEIGHT = 50;
const HEIGHT_LOCATION = 34;

const $banner: SImageStyle = [
  { width: spacing.screenWidth, height: IMAGE_HEIGHT },
];

const $search: SViewStyle = [
  style.rounded,
  style.align_center,
  style.row,
  style.px_md,
  style.gap_md,
  style.mx_md,
  {
    height: SEARCH_HEIGHT,
    backgroundColor: "#F7F7F7",
    width: spacing.screenWidth - spacing.md * 2,
    borderWidth: 1,
    borderColor: "#E9E9E9",
    top: -(SEARCH_HEIGHT * 0.5),
  },
];

const $root: SViewStyle = [
  style.row,
  style.align_center,
  style.abs,
  style.gap_xs,
  { zIndex: 999 },
];
const $location: SViewStyle = [
  style.center,
  style.round_sm,
  {
    height: HEIGHT_LOCATION,
    width: spacing.screenWidth * 0.45,
    backgroundColor: hexToRgbA(palette.black, 0.7),
  },
];

const $txLocation: STextStyle = [
  style.tx_color_white,
  style.tx_font_medium,
  style.px_md,
  { fontSize: 12 },
];
const $rounded: SViewStyle = [
  style.rounded,
  style.center,
  style.bg_color_white,
  { width: HEIGHT_LOCATION, height: HEIGHT_LOCATION },
];
