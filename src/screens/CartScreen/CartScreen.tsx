import { images } from "@assets/index";
import { AppButton, AppText, Layout } from "components";
import {
  useAppDispatch,
  useAppSelector,
  useCreateOrderMutation,
} from "hooks";
import React, { useMemo, useState } from "react";
import { Alert, Image, SectionList, View } from "react-native";
import { palette, spacing, style } from "theme";
import { STextStyle, SViewStyle } from "types";
import { hexToRgbA, symbol } from "utils";
import * as Components from "./components";
import { useAppNavigation } from "navigators";
import {
  clearCart,
  selectCartItems,
  TCartItem,
} from "store/slices/CartSlice";
import { selectLocation } from "store/slices/LocationSlice";


export const CartScreen = () => {
  const navigation = useAppNavigation();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const location = useAppSelector(selectLocation);
  const { mutate: createOrder, isPending } = useCreateOrderMutation();


  const groupedCarts = useMemo(() => {
    const groups = cartItems.reduce((acc, item) => {
      const key = item.restaurantId;
      if (!acc[key]) {
        acc[key] = {
          title: item.restaurantName,
          id: key,
          data: [],
        };
      }
      acc[key].data.push(item);
      return acc;
    }, {} as Record<number, { id: number; title: string; data: TCartItem[] }>);
    return Object.values(groups);
  }, [cartItems]);

  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
    {}
  );

  const getItemKey = (item: TCartItem) => `${item.restaurantId}-${item.id}`;

  const isSectionChecked = (sectionId: number) => {
    const section = groupedCarts.find((s) => s.id === sectionId);
    if (!section) return false;
    return section.data.every((item) => selectedItems[getItemKey(item)]);
  };

  const toggleItem = (item: TCartItem) => {
    const key = getItemKey(item);
    setSelectedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleSection = (sectionId: number) => {
    const section = groupedCarts.find((s) => s.id === sectionId);
    if (!section) return;

    const allChecked = isSectionChecked(sectionId);
    const updated = { ...selectedItems };

    section.data.forEach((item) => {
      updated[getItemKey(item)] = !allChecked;
    });

    setSelectedItems(updated);
  };

  const handleCheckout = (sectionId: number) => {
    const section = groupedCarts.find((s) => s.id === sectionId);
    if (!section) return;

    const itemsToOrder = section.data
      .filter((item) => selectedItems[getItemKey(item)])
      .flatMap((item) => Array(item.quantity).fill({ idMenu: item.id }));

    if (itemsToOrder.length === 0) {
      Alert.alert("Please select items to order");
      return;
    }

    const firstItem = section.data[0];

    createOrder(
      {
        restaurantId: sectionId,
        items: itemsToOrder,
        lat: location.lat.toString(),
        lng: location.long.toString(),
        deliveryFee: firstItem.fee || 0,
        deliveryAddress: location.address || "ádasd",
        address: location.address || "ádds",
      },
      {
        onSuccess: (response) => {
          dispatch(clearCart());
          navigation.navigate("FindingDriver");
        },
        onError: (error: any) => {
          Alert.alert("Order Failed", error?.message || "Something went wrong");
        },
      }
    );
  };

  return (
    <Layout paddingX="md" safeAreaOnBottom>
      <SectionList
        sections={groupedCarts}
        stickySectionHeadersEnabled={false}
        keyExtractor={(item) => getItemKey(item)}
        renderItem={({ item }) => (
          <View style={$item}>
            <Components.CCheckBox
              checked={!!selectedItems[getItemKey(item)]}
              onToggle={() => toggleItem(item)}
            />
            <View style={$icon}>
              {item.image ? (
                <Image
                  source={{ uri: item.image }}
                  style={{ width: "100%", height: "100%", borderRadius: 8 }}
                />
              ) : (
                <Image source={images.delivery} />
              )}
            </View>
            <View style={style.flex_1}>
              <AppText>{item.name}</AppText>
              <View style={[style.row, style.justify_between]}>
                <AppText style={$price}>
                  {symbol}
                  {item.price}
                </AppText>
                <AppText>x{item.quantity}</AppText>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={[style.gap_xs, { paddingBottom: 100 }]}
        renderSectionHeader={({ section }) => {
          const subtotal = section.data
            .filter((item) => selectedItems[getItemKey(item)])
            .reduce((acc, item) => acc + item.price * item.quantity, 0);

          return (
            <View style={$headerContainer}>
              <View style={[$headerSection, style.justify_between]}>
                <View style={[style.row, style.align_center, style.gap_sm]}>
                  <Components.CCheckBox
                    checked={isSectionChecked(section.id)}
                    onToggle={() => toggleSection(section.id)}
                  />
                  <AppText style={$txSection}>{section.title}</AppText>
                </View>
                <AppButton
                  titleTx="common.checkout"
                  onPress={() => handleCheckout(section.id)}
                  loading={isPending}
                  style={{ paddingHorizontal: spacing.sm }}
                />
              </View>
              {subtotal > 0 && (
                <View style={[style.row, style.justify_between, style.px_sm, style.pb_xs]}>
                  <AppText children="Subtotal" style={style.tx_font_semiBold} />
                  <AppText style={style.tx_font_bold}>
                    {symbol}
                    {subtotal}
                  </AppText>
                </View>
              )}
              <View style={$divider} />
            </View>
          );
        }}
      />
    </Layout>
  );
};

const IMAGE_WIDTH = 75;

const $item: SViewStyle = [style.row, style.gap_md, style.align_center];
const $headerSection: SViewStyle = [
  style.row,
  style.gap_md,
  style.align_center,
  style.py_sm,
  style.bg_color_white,
];
const $icon: SViewStyle = [
  style.center,
  style.round_sm,
  {
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
    backgroundColor: hexToRgbA(palette.primary500, 0.1),
  },
];
const $price: STextStyle = [style.tx_font_semiBold];
const $txSection: STextStyle = [style.tx_font_bold];
const $headerContainer: SViewStyle = [style.bg_color_white, style.pt_sm];
const $divider: SViewStyle = [
  style.bg_color_gray200,
  { height: 1, marginVertical: spacing.xs },
];
