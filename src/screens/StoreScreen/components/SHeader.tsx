import { images } from "@assets/index";
import { useAppNavigation } from "navigators";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  NativeScrollPoint,
  Pressable,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { spacing, style } from "theme";
import { SImageStyle, SViewStyle } from "types";

import { TRestaurant } from "services";
import { getImage } from "utils/Image";

type Props = {
  scrollPoint: NativeScrollPoint;
  restaurant: TRestaurant;
};

export const SHeader: React.FC<Props> = ({ scrollPoint, restaurant }) => {
  const { top } = useSafeAreaInsets();
  const navigation = useAppNavigation();

  // animated value
  const scrollY = useRef(new Animated.Value(0)).current;

  // cập nhật animation mỗi lần scrollPoint.y thay đổi
  useEffect(() => {
    scrollY.setValue(scrollPoint.y);
  }, [scrollPoint.y]);

  const IMAGE_HEIGHT = 340;

  // Ảnh kéo lên dựa vào scroll
  const translateY = scrollY.interpolate({
    inputRange: [0, IMAGE_HEIGHT],
    outputRange: [0, -IMAGE_HEIGHT], // đẩy lên tối đa bằng chiều cao ảnh
    extrapolate: "clamp",
  });

  return (
    <View>
      {/* Banner kéo lên khi scroll */}
      <Animated.Image
        source={
          restaurant.image
            ? { uri: getImage(restaurant.image) }
            : images.banner_1
        }
        style={[
          $banner,
          {
            transform: [{ translateY }],
          },
        ]}
      />

      {/* Header cố định */}
      <View style={[$header, { top }]}>
        <Pressable style={$rounded} onPress={navigation.goBack}>
          <Image source={images.chevron_left} />
        </Pressable>

        <View style={style.flex_1} />

        <Pressable style={$rounded}>
          <Image source={images.tab_search} tintColor={"black"} />
        </Pressable>

        <Pressable style={$rounded}>
          <Image source={images.like} />
        </Pressable>

        <Pressable style={$rounded}>
          <Image source={images.share} />
        </Pressable>
      </View>
    </View>
  );
};

const IMAGE_HEIGHT = 340;
const ROUNDED = 34;

const $banner: SImageStyle = {
  width: spacing.screenWidth,
  height: IMAGE_HEIGHT,
};

const $header: SViewStyle = [
  style.row,
  style.align_center,
  style.abs,
  style.gap_xs,
  { zIndex: 999, left: spacing.md, right: spacing.md },
];

const $rounded: SViewStyle = [
  style.rounded,
  style.center,
  style.bg_color_white,
  { width: ROUNDED, height: ROUNDED },
];
