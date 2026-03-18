import { AppTab, Banner, Layout, AppText } from "components";
import React, { useState } from "react";
import { ScrollView, View, Pressable, Image } from "react-native";
import { ERestaurantType } from "./RestaurantScreen.types";
import * as Components from "./components";
import { useAppNavigation } from "navigators";
import { useOrdersQuery } from "hooks";
import { style, palette } from "theme";
import { images } from "@assets/index";

const tabs = Object.values(ERestaurantType);

export const RestaurantScreen = () => {
  const [type, setType] = useState<ERestaurantType>(ERestaurantType.DELIVERY);
  const navigation = useAppNavigation();
  const { data: ordersResponse } = useOrdersQuery();
  const activeOrder = ordersResponse?.data?.[0];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Banner />
      <Layout paddingX="md">
        {activeOrder && activeOrder.status !== "COMPLETED" && activeOrder.status !== "CANCELLED" && (
          <Pressable
            style={[style.row, style.align_center, style.p_md, style.round_md, style.mb_md, { backgroundColor: palette.primary50 }]}
            onPress={() => {
              if (activeOrder.status === "PENDING") {
                navigation.navigate("FindingDriver");
              } else {
                navigation.navigate("OrderDetail", { id: activeOrder.id });
              }
            }}
          >
            <View style={[{ width: 40, height: 40, borderRadius: 20 }, style.bg_color_primary500, style.center]}>
              <Image source={images.delivery} style={[{ width: 20, height: 20, tintColor: palette.white }]} />
            </View>
            <View style={[style.ml_sm, style.flex_1]}>
              <AppText children={`Đơn hàng đang giao #${activeOrder.id.slice(0, 8).toUpperCase()}`} style={[style.tx_font_bold, style.tx_color_primary500]} />
              <AppText children="Nhấn vào để theo dõi tiến trình" style={[style.tx_size_sm, style.tx_color_gray500, style.mt_xxs]} />
            </View>
          </Pressable>
        )}
        <AppTab tabs={tabs} activeTab={type} onChangeTab={setType} />
        <Components.RMenu />
        <Components.RTopRate />
      </Layout>
    </ScrollView>
  );
};
