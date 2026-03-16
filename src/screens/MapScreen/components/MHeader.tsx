import { images } from "@assets/index";
import { AppText, AppTextInput, BlankBox } from "components";
import { useAppNavigation } from "navigators";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  View,
  Dimensions,
  FlatList,
  Keyboard,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { selectAddress } from "store/slices/LocationSlice";
import { useAppSelector, useSearchLocationQuery } from "hooks";
import { spacing, style } from "theme";
import { SViewStyle } from "types";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { useDebounceValue } from "usehooks-ts";
import { TLocation, TReverseGeocode } from "services";

const SCREEN_WIDTH = spacing.screenWidth;
const HEIGHT = style.inbut.height;
const CONTAINER_PADDING = spacing.md * 2;
const BACK_BUTTON_WIDTH = HEIGHT + spacing.xs;

type MHeaderProps = {
  onChangeRegion: (value: TLocation) => void;
};

export const MHeader = ({ onChangeRegion }: MHeaderProps) => {
  const navigation = useAppNavigation();
  const insets = useSafeAreaInsets();
  const address = useAppSelector(selectAddress);
  const [debouncedValue, setDebouncedValue] = useDebounceValue("", 100);
  const [search, setSearch] = useState<string>();
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const progress = useSharedValue(0);

  const { data } = useSearchLocationQuery(debouncedValue);

  useEffect(() => {
    progress.value = withTiming(isFocused ? 1 : 0, { duration: 300 });
  }, [isFocused]);

  const handleBack = () => navigation.goBack();

  const animatedBackStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          progress.value,
          [0, 1],
          [0, -BACK_BUTTON_WIDTH],
          Extrapolate.CLAMP
        ),
      },
    ],
    opacity: interpolate(progress.value, [0, 1], [1, 0], Extrapolate.CLAMP),
  }));

  const animatedInputStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          progress.value,
          [0, 1],
          [0, -BACK_BUTTON_WIDTH],
          Extrapolate.CLAMP
        ),
      },
    ],
    width: interpolate(
      progress.value,
      [0, 1],
      [
        SCREEN_WIDTH - CONTAINER_PADDING - BACK_BUTTON_WIDTH,
        SCREEN_WIDTH - CONTAINER_PADDING,
      ],
      Extrapolate.CLAMP
    ),
  }));

  const handleSelectAddress = (data: TReverseGeocode) => {
    onChangeRegion({ long: data.lon, lat: data.lat });
    setSearch(data.display_name);
    Keyboard.dismiss();
  };

  return (
    <View style={[$root, { paddingTop: insets.top || spacing.md }]}>
      <View style={$header}>
        <Animated.View style={[$backBox, animatedBackStyle]}>
          <Pressable onPress={handleBack}>
            <Image source={images.chevron_left} />
          </Pressable>
        </Animated.View>
        <Animated.View style={[animatedInputStyle]}>
          <AppTextInput
            containerStyle={$textBox}
            placeholder={address}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChangeText={(value) => {
              setSearch(value);
              setDebouncedValue(value);
            }}
            value={search}
          />
        </Animated.View>
      </View>
      {data?.length !== 0 && isFocused ? (
        <View style={$searchBox}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Pressable onPress={() => handleSelectAddress(item)}>
                <AppText key={item.osm_id} numberOfLines={2}>
                  {item.display_name}
                </AppText>
              </Pressable>
            )}
            ItemSeparatorComponent={() => <View style={$divider} />}
            ListEmptyComponent={() => <BlankBox />}
          />
        </View>
      ) : undefined}
    </View>
  );
};

const $root: SViewStyle = [
  style.gap_xxs,
  style.abs,
  { right: spacing.md, left: spacing.md },
];

const $searchBox: SViewStyle = [
  style.bg_color_white,
  style.round_sm,
  style.p_md,
  style.gap_sm,
];

const $header: SViewStyle = [style.row, style.gap_xs];

const $backBox: SViewStyle = [
  style.rounded,
  style.bg_color_white,
  style.center,
  { width: HEIGHT, height: HEIGHT },
];

const $textBox: SViewStyle = [style.bg_color_white, { borderWidth: 0 }];
const $divider: SViewStyle = [
  style.bg_color_gray200,
  style.my_xs,
  { height: 1 },
];
