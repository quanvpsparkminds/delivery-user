import { AppIcon, AppText, Layout } from "components";
import { selectUser } from "store/slices/AuthSlice";
import { useSelector } from "react-redux";
import React from "react";
import {
  Image,
  ScrollView,
  View,
  Pressable,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from "react-native";
import { palette, spacing, style } from "theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const AccountScreen = () => {
  const user = useSelector(selectUser);
  const insets = useSafeAreaInsets();

  return (
    <Layout backgroundColor={palette.gray50} safeAreaOnTop>
      <ScrollView
        contentContainerStyle={$scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={$profileContainer}>
          <View style={$avatarWrapper}>
            <Image
              source={
                user?.image
                  ? { uri: user.image }
                  : { uri: "https://i.pravatar.cc/300" }
              }
              style={$avatar}
            />
          </View>
          <AppText style={$name}>{`${user?.firstName ?? "Nam"} ${
            user?.lastName ?? "Nguyen"
          }`}</AppText>
          <AppText style={$phone}>
            {user?.phoneNumber ?? "+84 90 123 4567"}
          </AppText>
        </View>

        {/* Points Card */}
        <Pressable style={$pointsCard}>
          <View style={style.row_between}>
            <View style={style.row_center}>
              <View style={$starIconWrapper}>
                <AppIcon name="icon_star" size="sm" colorName="white" />
              </View>
              <View style={style.ml_sm}>
                <AppText style={$pointsLabel}>CONCIERGE POINTS</AppText>
                <View style={style.row_center}>
                  <AppText style={$pointsValue}>1,240</AppText>
                  <AppText style={$ptsUnit}>pts</AppText>
                </View>
              </View>
            </View>
            <AppIcon
              name="chevron_left"
              style={{ transform: [{ rotate: "180deg" }] }}
              colorName="gray400"
              size="sm"
            />
          </View>
        </Pressable>

        {/* Account Management Section */}
        <View style={$sectionContainer}>
          <AppText style={$sectionTitle}>Account Management</AppText>
          <View style={$menuContainer}>
            <MenuItem
              icon="calendar"
              title="My Orders"
              subtitle="Lịch sử đơn hàng"
            />
            <MenuItem
              icon="location"
              title="Saved Places"
              subtitle="Địa chỉ đã lưu"
            />
            <MenuItem
              icon="tab_account"
              title="Payment Methods"
              subtitle="Phương thức thanh toán"
            />
            <MenuItem
              icon="home_promo"
              title="Promo Codes"
              subtitle="Mã giảm giá"
            />
            <MenuItem icon="edit" title="Settings" subtitle="Cài đặt" />
            <MenuItem
              icon="tab_account"
              title="Help Center"
              subtitle="Trung tâm trợ giúp"
            />
          </View>
        </View>
        <View style={{ height: insets.bottom + spacing.xl }} />
      </ScrollView>
    </Layout>
  );
};

const MenuItem = ({
  icon,
  title,
  subtitle,
}: {
  icon: any;
  title: string;
  subtitle: string;
}) => (
  <Pressable style={$menuItem}>
    <View style={style.row_center}>
      <View style={$menuIconWrapper}>
        <AppIcon name={icon} size="sm" colorName="primary500" />
      </View>
      <View style={style.ml_md}>
        <AppText style={$menuTitle}>{title}</AppText>
        <AppText style={$menuSubtitle}>{subtitle}</AppText>
      </View>
    </View>
    <AppIcon
      name="chevron_left"
      style={{ transform: [{ rotate: "180deg" }] }}
      colorName="gray300"
      size="xs"
    />
  </Pressable>
);

const $scrollContent: ViewStyle = {
  paddingBottom: spacing.xxl,
};

const $profileContainer: ViewStyle = {
  alignItems: "center",
  paddingTop: spacing.xxl,
  paddingBottom: spacing.xl,
  backgroundColor: palette.gray50,
  borderBottomLeftRadius: 40,
  borderBottomRightRadius: 40,
};

const $avatarWrapper: ViewStyle = {
  width: 120,
  height: 120,
  borderRadius: 20,
  backgroundColor: palette.white,
  padding: 4,
  ...style.shadow,
  marginBottom: spacing.md,
};

const $avatar: ImageStyle = {
  width: "100%",
  height: "100%",
  borderRadius: 16,
};

const $name: TextStyle = {
  ...style.tx_font_bold,
  fontSize: 28,
  color: palette.gray900,
};

const $phone: TextStyle = {
  ...style.tx_font_medium,
  fontSize: 14,
  color: palette.gray500,
  marginTop: 4,
};

const $badge: ViewStyle = {
  backgroundColor: "#FFEECC",
  paddingHorizontal: 12,
  paddingVertical: 4,
  borderRadius: 12,
  marginTop: 12,
};

const $badgeText: TextStyle = {
  ...style.tx_font_bold,
  fontSize: 10,
  color: palette.primary700,
};

const $walletCard: ViewStyle = {
  marginHorizontal: spacing.md,
  marginTop: -30,
  backgroundColor: palette.primary500,
  borderRadius: 24,
  padding: spacing.xl,
  ...style.shadow,
};

const $walletHeader: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: spacing.xs,
};

const $walletLabel: TextStyle = {
  color: palette.white,
  fontSize: 12,
  ...style.tx_font_bold,
  marginLeft: spacing.xs,
  opacity: 0.9,
};

const $walletValue: TextStyle = {
  color: palette.white,
  fontSize: 32,
  ...style.tx_font_bold,
};

const $pointsCard: ViewStyle = {
  marginHorizontal: spacing.md,
  marginTop: spacing.md,
  backgroundColor: palette.white,
  borderRadius: 24,
  padding: spacing.lg,
  ...style.shadow,
};

const $starIconWrapper: ViewStyle = {
  backgroundColor: palette.primary500,
  width: 32,
  height: 32,
  borderRadius: 16,
  alignItems: "center",
  justifyContent: "center",
};

const $pointsLabel: TextStyle = {
  fontSize: 10,
  ...style.tx_font_bold,
  color: palette.gray500,
};

const $pointsValue: TextStyle = {
  fontSize: 24,
  ...style.tx_font_bold,
  color: palette.primary600,
};

const $ptsUnit: TextStyle = {
  fontSize: 14,
  ...style.tx_font_medium,
  color: palette.gray900,
  marginLeft: 4,
  marginTop: 4,
};

const $sectionContainer: ViewStyle = {
  marginTop: spacing.xl,
  paddingHorizontal: spacing.md,
};

const $sectionTitle: TextStyle = {
  ...style.tx_font_bold,
  fontSize: 18,
  color: palette.gray900,
  marginBottom: spacing.md,
};

const $menuContainer: ViewStyle = {
  backgroundColor: "#F8F8F8",
  borderRadius: 24,
  padding: spacing.sm,
};

const $menuItem: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingVertical: spacing.md,
  paddingHorizontal: spacing.sm,
};

const $menuIconWrapper: ViewStyle = {
  width: 44,
  height: 44,
  borderRadius: 12,
  backgroundColor: palette.white,
  alignItems: "center",
  justifyContent: "center",
  ...style.shadow,
};

const $menuTitle: TextStyle = {
  ...style.tx_font_bold,
  fontSize: 16,
  color: palette.gray900,
};

const $menuSubtitle: TextStyle = {
  ...style.tx_font_medium,
  fontSize: 12,
  color: palette.gray500,
};
