import { images } from "@assets/index";
import { AppText, Layout } from "components";
import { format, isToday, isYesterday } from "date-fns";
import { useTx } from "i18n";
import React from "react";
import { Image, SectionList, View } from "react-native";
import { palette, style } from "theme";
import { STextStyle, SViewStyle } from "types";
import { hexToRgbA } from "utils";
import { Notifications, TNotification } from "./NotificationScreen.types";

export const NotificationScreen = () => {
  const { t } = useTx();
  const formatSectionTitle = (dateString: string): string => {
    const date = new Date(dateString);
    if (isToday(date)) return t("common.today");
    if (isYesterday(date)) return t("common.yesterday");
    return format(date, "MMM dd - yyyy");
  };

  const groupedNotifications = Object.values(
    Notifications.reduce((acc, item) => {
      const date = new Date(item.createDate);
      const key = format(date, "yyyy-MM-dd");
      if (!acc[key]) {
        acc[key] = {
          title: key,
          data: [],
          sortKey: date.getTime(),
        };
      }
      acc[key].data.push(item);
      acc[key].data.sort(
        (a, b) =>
          new Date(b.createDate).getTime() - new Date(a.createDate).getTime()
      );

      return acc;
    }, {} as Record<string, { title: string; data: TNotification[]; sortKey: number }>)
  ).sort((a, b) => b.sortKey - a.sortKey);

  return (
    <Layout paddingX="md" safeAreaOnBottom>
      <SectionList
        sections={groupedNotifications}
        keyExtractor={(item, index) => item.title + index}
        contentContainerStyle={style.gap_sm}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <View style={$item}>
            <View style={$icon}>
              <Image source={images.delivery} />
            </View>
            <View style={style.flex_1}>
              <AppText numberOfLines={2} style={$title}>
                {item.title}
              </AppText>
              <AppText numberOfLines={2} style={$sub}>
                {item.sub}
              </AppText>
              <View style={style.flex_1} />
              <AppText style={$time}>
                {format(new Date(item.createDate), "hh:mm a")}
              </AppText>
            </View>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <AppText style={$txSection}>{formatSectionTitle(title)}</AppText>
        )}
      />
    </Layout>
  );
};

const WIDTH = 100;

const $item: SViewStyle = [style.row, style.gap_sm];

const $icon: SViewStyle = [
  style.center,
  style.round_sm,
  {
    width: WIDTH,
    height: WIDTH,
    backgroundColor: hexToRgbA(palette.primary500, 0.1),
  },
];

const $title: STextStyle = [style.tx_font_semiBold];
const $sub: STextStyle = [style.tx_size_sm];
const $time: STextStyle = [
  style.tx_size_sm,
  style.tx_right,
  style.tx_color_gray400,
];
const $txSection: STextStyle = [style.tx_font_semiBold, style.tx_color_gray500];
