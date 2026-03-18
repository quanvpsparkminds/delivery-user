import { images } from "@assets/index";
import { AppButton, AppModal, AppText } from "components";
import { useAppDispatch, useAppSelector, useCreateOrderMutation } from "hooks";
import React, { useMemo, useState } from "react";
import { Alert, Image, Pressable, ScrollView, View } from "react-native";
import { spacing, style, palette } from "theme";
import { SImageStyle, STextStyle, SViewStyle } from "types";
import { symbol } from "utils";
import { getImage } from "utils/Image";
import { clearCart, selectCartItems } from "store/slices/CartSlice";
import { selectLocation } from "store/slices/LocationSlice";
import { TRestaurant } from "services";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAppNavigation } from "navigators";

type Props = {
  restaurant: TRestaurant;
};

export const SCartFloating: React.FC<Props> = ({ restaurant }) => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const cartItems = useAppSelector(selectCartItems);
  const location = useAppSelector(selectLocation);
  const { bottom } = useSafeAreaInsets();
  const { mutate: createOrder, isPending } = useCreateOrderMutation();

  const restaurantCartItems = useMemo(
    () => cartItems.filter((i) => i.restaurantId === restaurant.id),
    [cartItems, restaurant.id],
  );

  if (restaurantCartItems.length === 0) return null;

  const totalCount = restaurantCartItems.reduce(
    (acc, i) => acc + i.quantity,
    0,
  );
  const totalPrice = restaurantCartItems.reduce(
    (acc, i) => acc + i.price * i.quantity,
    0,
  );

  const handleCheckout = () => {
    if (restaurantCartItems.length === 0) return;

    const itemsToOrder = restaurantCartItems.flatMap((item) =>
      Array(item.quantity).fill({ idMenu: item.id }),
    );

    createOrder(
      {
        restaurantId: restaurant.id,
        items: itemsToOrder,
        lat: location.lat.toString(),
        lng: location.long.toString(),
        deliveryFee: restaurant.route?.fee || 0,
        deliveryAddress: location.address || "undefined",
        address: location.address || "undefined",
      },
      {
        onSuccess: (response) => {
          dispatch(clearCart());
          setModalVisible(false);
          navigation.navigate("FindingDriver");
        },
        onError: (error: any) => {
          Alert.alert("Order Failed", error?.message || "Something went wrong");
        },
      },
    );
  };

  return (
    <>
      <Pressable
        style={[$floatingBar, { bottom: bottom + spacing.md }]}
        onPress={() => setModalVisible(true)}
      >
        <View style={style.row}>
          <View style={[$badge, style.center]}>
            <AppText children={totalCount.toString()} style={$txBadge} />
          </View>
          <AppText children=" Giỏ hàng" style={$txBar} />
        </View>
        <AppText style={$txBar}>
          {symbol}
          {totalPrice}
        </AppText>
      </Pressable>

      <AppModal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        maxHeight={spacing.screenHeight * 0.8}
      >
        <ScrollView contentContainerStyle={style.p_md}>
          <AppText children="Chi tiết đơn hàng" style={$title} />

          <View style={$section}>
            <AppText children="Địa chỉ nhận hàng" style={$label} />
            <View style={style.row}>
              <Image source={images.delivery} style={$icon} />
              <View style={style.flex_1}>
                <AppText children={location.address || "Vị trí hiện tại"} />
              </View>
            </View>
          </View>

          <View style={$section}>
            <AppText children="Cửa hàng" style={$label} />
            <AppText
              children={restaurant.fullName}
              style={style.tx_font_bold}
            />
            <AppText children={restaurant.address} />
            <View style={[style.row, style.mt_xs]}>
              <AppText
                children={`Khoảng cách: ${restaurant.route?.distance?.toFixed(
                  2,
                )} km`}
                style={style.mr_md}
              />
              <AppText children={`Phí: ${symbol}${restaurant.route?.fee}`} />
            </View>
          </View>

          <View style={$divider} />
          <AppText children="Danh sách món" style={$label} />
          {restaurantCartItems.map((item) => (
            <View
              key={item.id}
              style={[
                style.row,
                style.justify_between,
                style.my_xs,
                style.align_center,
              ]}
            >
              <View style={[style.row, style.align_center]}>
                <Image
                  source={
                    item.image
                      ? { uri: getImage(item.image) }
                      : images.icon_star
                  }
                  style={[$imgItem, style.mr_xs]}
                />
                <View>
                  <AppText children={item.name} style={style.tx_font_medium} />
                  <AppText
                    children={`${item.quantity} x ${symbol}${item.price}`}
                    style={style.tx_size_sm}
                  />
                </View>
              </View>
              <AppText
                children={`${symbol}${item.price * item.quantity}`}
                style={style.tx_font_bold}
              />
            </View>
          ))}

          <View style={$divider} />
          <View style={[style.row, style.justify_between, style.mb_md]}>
            <AppText children="Tổng cộng" style={style.tx_font_bold} />
            <AppText
              children={`${symbol}${totalPrice + (restaurant.route?.fee || 0)}`}
              style={style.tx_font_bold}
            />
          </View>

          <AppButton
            titleTx="common.checkout"
            onPress={handleCheckout}
            loading={isPending}
          />
        </ScrollView>
      </AppModal>
    </>
  );
};

const $floatingBar: SViewStyle = [
  style.abs,
  style.row,
  style.justify_between,
  style.align_center,
  style.mx_md,
  style.p_md,
  style.round_sm,
  style.shadow,
  {
    left: 0,
    right: 0,
    backgroundColor: palette.primary500,
  },
];

const $badge: SViewStyle = [
  { width: 24, height: 24, borderRadius: 12, backgroundColor: palette.white },
];

const $txBadge: STextStyle = [style.tx_color_primary500, style.tx_font_bold];
const $txBar: STextStyle = [style.tx_color_white, style.tx_font_bold];

const $title: STextStyle = [style.tx_size_lg, style.tx_font_bold, style.mb_md];
const $section: SViewStyle = [style.mb_md];
const $label: STextStyle = [
  style.tx_color_gray500,
  style.tx_size_sm,
  style.mb_xxs,
];
const $icon: SImageStyle = [{ width: 24, height: 24, marginRight: spacing.xs }];
const $imgItem: SImageStyle = [
  style.round_xxs,
  { width: 40, height: 40, backgroundColor: palette.gray100 },
];
const $divider: SViewStyle = [
  { height: 1 },
  style.bg_color_gray200,
  style.my_md,
];
