import { images } from "@assets/index";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import { AppText } from "components";
import { TxKeyPath } from "i18n";
import { AppTabbarParamList } from "navigators";
import { useAppTheme } from "provider";
import React from "react";
import { Image } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { palette, style } from "theme";
import { SImageStyle, STextStyle, SViewStyle } from "types";

type TTabRoute = {
  key: string;
  icon: any;
  label: TxKeyPath;
  name: keyof AppTabbarParamList;
};

const tabs: TTabRoute[] = [
  {
    key: "restaurant",
    icon: images.tab_restaurant,
    label: "tabs.restaurant",
    name: "Restaurant",
  },
  {
    key: "grocery",
    icon: images.tab_banana,
    label: "tabs.grocery",
    name: "Grocery",
  },
  {
    key: "shopping",
    icon: images.tab_shopping,
    label: "tabs.shopping",
    name: "Shopping",
  },
  {
    key: "search",
    icon: images.tab_search,
    label: "tabs.search",
    name: "Search",
  },
  {
    key: "account",
    icon: images.tab_account,
    label: "tabs.account",
    name: "Account",
  },
];

export const AppBottomTabbar = ({ state, navigation }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useAppTheme();

  const handleTabPress = (route: any, isFocused: boolean) => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={[
        $tabBar,
        {
          paddingBottom: insets.bottom,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const tabRoute = tabs.find((tab) => tab.name === route.name);

        if (!tabRoute) return null;

        const tintColor = isFocused ? colorScheme.primary : palette.gray500;

        return (
          <PlatformPressable
            key={route.key}
            style={$tabItem}
            onPress={() => handleTabPress(route, isFocused)}
          >
            <Image source={tabRoute.icon} style={[$tabIcon, { tintColor }]} />
            <AppText
              style={[
                $tabLabel,
                { color: tintColor },
                isFocused && style.tx_font_semiBold,
              ]}
              tx={tabRoute.label}
            />
          </PlatformPressable>
        );
      })}
    </Animated.View>
  );
};

const tabIconSize = 30;
const $tabBar: SViewStyle = [style.row, style.align_center];
const $tabItem: SViewStyle = [style.flex_1, style.center, style.py_xs];
const $tabIcon: SImageStyle = [
  {
    width: tabIconSize,
    height: tabIconSize,
    resizeMode: "center",
  },
];
const $tabLabel: STextStyle = [style.tx_size_sm, style.tx_center];
