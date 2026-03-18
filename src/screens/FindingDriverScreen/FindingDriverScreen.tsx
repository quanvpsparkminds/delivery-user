import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import { AppText, Layout, AppModal, AppButton } from "components";
import { useOrdersQuery, useFindShipperMutation } from "hooks";
import { useAppNavigation } from "navigators";
import { style, spacing, palette } from "theme";
import { STextStyle, SViewStyle } from "types";

export const FindingDriverScreen = () => {
  const navigation = useAppNavigation();
  const { data: ordersResponse, refetch: refetchOrders } = useOrdersQuery();
  const { mutate: findShipper } = useFindShipperMutation();
  const [modalVisible, setModalVisible] = useState(false);

  const order = ordersResponse?.data?.[0];

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (order) {
      if (order.status !== "CONFIRMED") {
        intervalId = setInterval(() => {
          findShipper(order.id, {
            onSuccess: () => {
              refetchOrders();
            },
          });
        }, 5000);
      } else {
        // Driver found!
        setModalVisible(true);
      }
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [order, findShipper, refetchOrders]);

  const handleGoToDetail = () => {
    setModalVisible(false);
    if (order) {
      navigation.navigate("OrderDetail", { id: order.id });
    }
  };

  return (
    <Layout style={[$container, style.center]}>
      <View style={style.align_center}>
        <ActivityIndicator size="large" color={palette.primary500} />
        <AppText style={$title} children="Đang tìm tài xế cho bạn..." />
        <AppText
          style={$subtitle}
          children="Vui lòng đợi trong giây lát, chúng tôi đang kết nối với tài xế gần nhất."
        />
      </View>

      <AppModal visible={modalVisible} onRequestClose={() => {}}>
        <View style={style.p_md}>
          <AppText style={$modalTitle} children="Đã tìm thấy tài xế!" />
          <AppText
            style={style.mb_md}
            children={`Tài xế ${order?.delivery?.firstName} ${order?.delivery?.lastName} đã nhận đơn hàng của bạn.`}
          />
          <AppButton title="Xem chi tiết đơn hàng" onPress={handleGoToDetail} />
        </View>
      </AppModal>
    </Layout>
  );
};

const $container: SViewStyle = [style.flex_1, style.bg_color_white];
const $title: STextStyle = [
  style.tx_size_lg,
  style.tx_font_bold,
  style.mt_md,
  style.tx_center,
];
const $subtitle: STextStyle = [
  style.tx_color_gray500,
  style.tx_center,
  style.mt_sm,
  style.px_md,
];
const $modalTitle: STextStyle = [
  style.tx_size_lg,
  style.tx_font_bold,
  style.mb_sm,
  style.tx_center,
];
