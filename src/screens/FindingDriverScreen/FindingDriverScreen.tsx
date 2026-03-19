import { images } from "@assets/index";
import { lotties } from "@assets/lotties";
import { AppText, Layout } from "components";
import { useFindShipperMutation, useOrdersQuery } from "hooks";
import LottieView from "lottie-react-native";
import { useAppNavigation } from "navigators";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { palette, spacing, style } from "theme";
import { scaleFontSize } from "theme/Spacing";
import { STextStyle } from "types";

const { width, height } = Dimensions.get("window");

export const FindingDriverScreen = () => {
  const insets = useSafeAreaInsets();
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

  useEffect(() => {
    if (order?.status === "CONFIRMED") {
      navigation.replace("OrderDetail", { id: order.id });
    }
  }, [order]);

  const handleCancel = () => {
    // For now, just go back, since we don't have a specific cancel API yet
    navigation.goBack();
  };

  const region = order
    ? {
        latitude: parseFloat(order.lat),
        longitude: parseFloat(order.lng),
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }
    : {
        latitude: 10.8231, // Default to SG if no order
        longitude: 106.6297,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };

  return (
    <Layout style={style.flex_1}>
      <View style={style.flex_1}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          region={region}
          showsUserLocation={false}
          showsMyLocationButton={false}
        >
          {order && (
            <Marker
              coordinate={{
                latitude: parseFloat(order.lat),
                longitude: parseFloat(order.lng),
              }}
              anchor={{ x: 0.5, y: 0.5 }}
            >
              <View style={styles.markerContainer}>
                <LottieView
                  source={lotties.location_loading}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
                <View style={styles.scooterIconContainer}>
                  <Image source={images.delivery} style={styles.scooterIcon} />
                </View>
              </View>
            </Marker>
          )}
        </MapView>

        {/* Bottom Card */}
        <View style={[styles.bottomCard]}>
          <View style={styles.cardHeader}>
            <View style={[style.row, style.align_center, style.flex_1]}>
              <View style={styles.iconCircle}>
                <Image source={images.icon_cart} style={styles.orderIcon} />
              </View>
              <View style={style.ml_sm}>
                <AppText style={styles.cardLabel} children="Đơn hàng của bạn" />
                <AppText
                  style={styles.orderId}
                  children={`#${
                    order?.id.slice(0, 8).toUpperCase() || "FED-1234"
                  }`}
                />
              </View>
            </View>
            <View style={style.align_end}>
              <AppText style={styles.cardLabel} children="DỰ KIẾN LẤY" />
              <AppText style={styles.etaText} children="3-5 phút" />
            </View>
          </View>

          <View style={styles.divider} />

          <View style={[style.row, style.align_center, style.my_md]}>
            <Image
              source={{ uri: order?.restaurant?.image || undefined }}
              style={styles.restaurantImage}
              defaultSource={images.restaurant_1}
            />
            <View style={[style.ml_sm, style.flex_1]}>
              <AppText
                style={styles.restaurantName}
                children={order?.restaurant?.fullName || "The Burger Junction"}
              />
              <View style={[style.row, style.align_center]}>
                <Image source={images.location} style={styles.locationIcon} />
                <AppText
                  style={styles.restaurantAddress}
                  children={
                    order?.restaurant?.address ||
                    "245 Nguyễn Huệ, Quận 1, TP.HCM"
                  }
                  numberOfLines={1}
                />
              </View>
            </View>
          </View>

          {/* <Pressable style={styles.cancelButton} onPress={handleCancel}>
            <Image source={images.close} style={styles.cancelIcon} />
            <AppText style={styles.cancelText} children="Hủy đơn hàng" />
          </Pressable>

          <AppText
            style={styles.footerText}
            children="BẠN CÓ THỂ HỦY ĐƠN TRONG VÒNG 2 PHÚT"
          /> */}
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: 150,
    height: 150,
    position: "absolute",
  },
  scooterIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: palette.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scooterIcon: {
    width: 36,
    height: 36,
    tintColor: palette.primary500,
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    backgroundColor: "rgba(255,255,255,0.8)",
    paddingBottom: spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: palette.black,
  },
  statusTitle: {
    fontSize: scaleFontSize(18),
    fontFamily: "Bold", // Or your font weight style
    fontWeight: "bold",
    color: palette.black,
  },
  statusSubtitle: {
    fontSize: scaleFontSize(10),
    color: palette.primary500,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  bottomCard: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: palette.white,
    borderRadius: 24,
    padding: spacing.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FDF1EC", // primary50-ish
    justifyContent: "center",
    alignItems: "center",
  },
  orderIcon: {
    width: 20,
    height: 20,
    tintColor: palette.primary500,
  },
  cardLabel: {
    fontSize: scaleFontSize(11),
    color: palette.gray500,
  },
  orderId: {
    fontSize: scaleFontSize(15),
    fontWeight: "bold",
    color: palette.black,
  },
  etaText: {
    fontSize: scaleFontSize(18),
    fontWeight: "bold",
    color: palette.primary500,
  },
  divider: {
    height: 1,
    backgroundColor: palette.gray100,
    marginVertical: spacing.sm,
  },
  restaurantImage: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: palette.gray100,
  },
  restaurantName: {
    fontSize: scaleFontSize(16),
    fontWeight: "600",
    color: palette.black,
  },
  restaurantAddress: {
    fontSize: scaleFontSize(12),
    color: palette.gray500,
    marginLeft: 4,
  },
  locationIcon: {
    width: 12,
    height: 12,
    tintColor: palette.gray500,
  },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F5F9", // secondary100
    borderRadius: 12,
    height: 48,
    marginTop: spacing.sm,
  },
  cancelIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: palette.gray600,
  },
  cancelText: {
    fontSize: scaleFontSize(15),
    fontWeight: "bold",
    color: palette.gray800,
  },
  footerText: {
    fontSize: scaleFontSize(10),
    color: palette.gray400,
    textAlign: "center",
    marginTop: spacing.md,
    letterSpacing: 0.5,
  },
});

const $modalTitle: STextStyle = [
  style.tx_size_lg,
  style.tx_font_bold,
  style.mb_sm,
  style.tx_center,
];
