import { images } from "@assets/index";
import { AppText } from "components";
import React, { useState } from "react";
import {
  Animated,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { spacing, style } from "theme";
import { SImageStyle, STextStyle, SViewStyle } from "types";
import { Dishes } from "../StoreScreen.types";
import { symbol } from "utils";
import { useTx } from "i18n";

const IMAGE_HEADER = 340;

import { useAppDispatch, useAppSelector } from "hooks";
import {
  addToCart,
  removeFromCart,
  selectCartItems,
} from "store/slices/CartSlice";
import { TRestaurant } from "services";
import { getImage } from "utils/Image";

type Props = {
  scrollY: Animated.Value;
  restaurant: TRestaurant;
};
export const SBody: React.FC<Props> = ({ scrollY, restaurant }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const [infoHeight, setInfoHeight] = useState<number>(100);
  const { bottom } = useSafeAreaInsets();
  const { t } = useTx();

  const getItemQuantity = (itemId: number) => {
    return (
      cartItems.find((i) => i.id === itemId && i.restaurantId === restaurant.id)
        ?.quantity || 0
    );
  };

  return (
    <Animated.ScrollView
      style={[$root, { bottom }]}
      contentContainerStyle={style.gap_sm}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true },
      )}
    >
      <View
        style={{ marginTop: IMAGE_HEADER - infoHeight * 0.5 - spacing.sm }}
      />
      <View
        style={$box}
        onLayout={(e) => setInfoHeight(e.nativeEvent.layout.height)}
      >
        <View style={style.row}></View>
        <AppText style={$txDeli}>{restaurant.fullName}</AppText>
        <AppText>{restaurant.address}</AppText>
        <View style={$divider} />
        <View style={$row}>
          <Image source={images.delivery} />
          <View>
            <AppText tx="store.delivery" style={$txDeli} />
            <AppText
              tx="store.arrive"
              txOptions={{
                minutes: (restaurant.route?.duration || 0).toFixed(0),
                about: (restaurant.route?.distance || 0).toFixed(2),
              }}
            />
          </View>
        </View>
      </View>

      <AppText style={$txDeli}>Menu</AppText>
      <View style={[style.row_wrap, style.gap_md]}>
        {restaurant.menu?.map((item) => (
          <View key={item.id} style={$dish}>
            <View style={style.center}>
              {item.image ? (
                <Image
                  source={{ uri: getImage(item.image) }}
                  style={$imgDish}
                  resizeMode="contain"
                />
              ) : (
                <View style={[$imgDish, $imgPlaceholder]}>
                  <Image source={images.icon_star} />
                </View>
              )}
              {getItemQuantity(item.id) > 0 ? (
                <View
                  style={[$add, style.row, style.justify_between, style.p_xxxs]}
                >
                  <Pressable
                    onPress={() =>
                      dispatch(
                        removeFromCart({
                          id: item.id,
                          restaurantId: restaurant.id,
                        }),
                      )
                    }
                  >
                    <AppText children="-" style={$txAdd} />
                  </Pressable>
                  <AppText
                    children={getItemQuantity(item.id).toString()}
                    style={[$txAdd, style.px_sm]}
                  />
                  <Pressable
                    onPress={() => dispatch(addToCart({ item, restaurant }))}
                  >
                    <AppText children="+" style={$txAdd} />
                  </Pressable>
                </View>
              ) : (
                <Pressable
                  style={$add}
                  onPress={() => dispatch(addToCart({ item, restaurant }))}
                >
                  <AppText children={`+ ${t("common.add")}`} style={$txAdd} />
                </Pressable>
              )}
            </View>
            <AppText>{item.name}</AppText>
            <AppText style={$txDeli}>
              {symbol}
              {item.price}
            </AppText>
          </View>
        ))}
      </View>
      <View style={{ height: spacing.lg }} />
    </Animated.ScrollView>
  );
};

const ITEM_WIDTH = (spacing.screenWidth - spacing.md * 2) / 2 - 10;
const $root: SViewStyle = [
  style.flex_1,
  style.abs,
  style.px_md,
  { top: 0, right: 0, left: 0 },
];

const $box: SViewStyle = [
  style.bg_color_white,
  style.round_sm,
  style.border_color_gray200,
  style.p_md,
  { borderWidth: 1 },
];
const $divider: SViewStyle = [
  { height: 1 },
  style.bg_color_gray200,
  style.my_xs,
];
const $row: SViewStyle = [style.row, style.align_center, style.gap_xs];
const $txDeli: STextStyle = [style.tx_font_bold, style.tx_size_md];
const $dish: SViewStyle = [{ width: ITEM_WIDTH }, style.gap_xs];
const $rateBox: SViewStyle = [style.row, style.align_center, style.gap_xxs];
const $add: SViewStyle = [
  style.bg_color_primary500,
  style.border_color_white,
  style.px_lg,
  style.py_xxxs,
  style.round_xs,
  style.abs,
  { borderWidth: 1, bottom: 0 },
];
const $imgDish: SImageStyle = [
  { width: ITEM_WIDTH, height: ITEM_WIDTH * (121 / 171), borderRadius: 8 },
];
const $imgPlaceholder: SViewStyle = [
  {
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
];
const $txAdd: STextStyle = [style.tx_color_white, style.tx_size_sm];
