import { images } from "@assets/index";
import { StaticScreenProps } from "@react-navigation/native";
import { AppText, Layout } from "components";
import { useOrderDetailQuery } from "hooks";
import React from "react";
import { ActivityIndicator, Image, ScrollView, View } from "react-native";
import { palette, spacing, style } from "theme";
import { STextStyle, SViewStyle } from "types";
import { symbol } from "utils";

type Props = StaticScreenProps<{ id: string }>;

export const OrderDetailScreen = ({ route }: Props) => {
  const { id } = route.params;
  const { data: orderResponse, isLoading } = useOrderDetailQuery(id);
  const order = orderResponse?.data;

  if (isLoading) {
    return (
      <View style={[style.flex_1, style.center]}>
        <ActivityIndicator size="large" color={palette.primary500} />
      </View>
    );
  }

  if (!order) {
    return (
      <View style={[style.flex_1, style.center]}>
        <AppText children="Không tìm thấy đơn hàng" />
      </View>
    );
  }

  return (
    <Layout>
      <ScrollView contentContainerStyle={style.p_md}>
        <View style={[$section, style.mb_md]}>
          <AppText style={$sectionTitle} children="Tài xế của bạn" />
          {order.delivery ? (
            <View style={[style.row, style.align_center]}>
              <View style={$avatarPlaceholder}>
                <Image
                  source={images.delivery}
                  style={{ width: 30, height: 30 }}
                />
              </View>
              <View style={style.ml_sm}>
                <AppText
                  style={style.tx_font_bold}
                  children={`${order.delivery.firstName} ${order.delivery.lastName}`}
                />
                <AppText
                  style={style.tx_size_sm}
                  children={order.delivery.phoneNumber}
                />
              </View>
            </View>
          ) : (
            <AppText
              children="Đang tìm tài xế..."
              style={style.tx_color_gray500}
            />
          )}
        </View>

        <View style={[$section, style.mb_md]}>
          <AppText style={$sectionTitle} children="Từ nhà hàng" />
          <AppText
            style={style.tx_font_bold}
            children={order.restaurant?.fullName}
          />
          <AppText
            children={order.restaurant?.address}
            style={style.tx_size_sm}
          />
        </View>

        <View style={[$section, style.mb_md]}>
          <AppText style={$sectionTitle} children="Địa chỉ giao hàng" />
          <AppText children={order.address} />
        </View>

        <View style={$section}>
          <AppText style={$sectionTitle} children="Danh sách món" />
          {order.items.map((item, index) => (
            <View
              key={index}
              style={[style.row, style.justify_between, style.my_xs]}
            >
              <AppText children={item.name} />
              <AppText
                children={`${symbol}${item.price}`}
                style={style.tx_font_bold}
              />
            </View>
          ))}
          <View style={$divider} />
          <View style={[style.row, style.justify_between, style.mt_sm]}>
            <AppText children="Phí giao hàng" />
            <AppText
              children={`${symbol}${order.deliveryFee?.toFixed(1) ?? 0}`}
            />
          </View>
          <View style={[style.row, style.justify_between, style.mt_xs]}>
            <AppText children="Tổng cộng" style={style.tx_font_bold} />
            <AppText
              children={`${symbol}${order.totalAmount?.toFixed(1)}`}
              style={[$totalAmount]}
            />
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

const $statusCard: SViewStyle = [
  style.bg_color_primary500,
  style.p_md,
  style.round_md,
  style.center,
];
const $statusLabel: STextStyle = [
  style.tx_color_white,
  style.tx_size_sm,
  { opacity: 0.8 },
];
const $statusValue: STextStyle = [
  style.tx_color_white,
  style.tx_size_lg,
  style.tx_font_bold,
];

const $section: SViewStyle = [
  style.bg_color_white,
  style.p_md,
  style.round_md,
  style.shadow,
];
const $sectionTitle: STextStyle = [
  style.tx_color_gray500,
  style.tx_size_sm,
  style.tx_font_bold,
  style.mb_sm,
  style.tx_uppercase,
];

const $avatarPlaceholder: SViewStyle = [
  style.center,
  { width: 50, height: 50, borderRadius: 25, backgroundColor: palette.gray100 },
];

const $divider: SViewStyle = [
  { height: 1, backgroundColor: palette.gray200, marginVertical: spacing.sm },
];

const $totalAmount: STextStyle = [
  style.tx_color_primary500,
  style.tx_size_lg,
  style.tx_font_bold,
];
