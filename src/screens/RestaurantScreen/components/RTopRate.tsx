import React from "react";
import { ActivityIndicator, Image, Pressable, View } from "react-native";
import { AppText } from "components";
import { SImageStyle, STextStyle, SViewStyle } from "types";
import { spacing, style } from "theme";
import { images } from "@assets/index";
import { useAppNavigation } from "navigators";
import { useRestaurantQuery } from "hooks";
import { getImage } from "utils/Image";

export const RTopRate = () => {
  const navigation = useAppNavigation();
  const { data: restaurants, isLoading } = useRestaurantQuery();

  if (isLoading) {
    return (
      <View style={[$root, { justifyContent: "center" }]}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!restaurants?.length) return null;

  return (
    <View style={style.gap_md}>
      <AppText tx="home.topRate" style={$txHeader} />
      <View style={$root}>
        {restaurants.map((item, index) => (
          <Pressable
            key={index}
            style={$item}
            onPress={() => navigation.navigate("Store", { id: item.id })}
          >
            {item.image ? (
              <Image
                source={{ uri: getImage(item.image) }}
                style={$img}
                resizeMode="contain"
              />
            ) : (
              <View style={[$img, $imgPlaceholder]}>
                <Image source={images.icon_star} />
              </View>
            )}
            <AppText numberOfLines={2} style={$name}>
              {item.fullName}
            </AppText>
            <AppText numberOfLines={1} style={$address}>
              {item.address}
            </AppText>
            <View style={$rateBox}>
              <Image source={images.icon_star} />
              <AppText>{item.type}</AppText>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const WIDTH = spacing.screenWidth / 2 - spacing.md * 1.5;
const $txHeader: STextStyle = [style.tx_size_md, style.tx_font_bold];
const $root: SViewStyle = [style.row, style.gap_md, { flexWrap: "wrap" }];
const $item: SViewStyle = [
  { width: spacing.screenWidth / 2 - spacing.md * 1.5 },
];
const $img: SImageStyle = [
  { width: WIDTH, height: WIDTH * (121 / 171), borderRadius: 8 },
];
const $imgPlaceholder: SViewStyle = [
  {
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
];
const $name: STextStyle = [style.tx_font_bold];
const $address: STextStyle = [{ fontSize: 12, color: "#888" }];
const $rateBox: SViewStyle = [style.row, style.align_center, style.gap_xxs];
