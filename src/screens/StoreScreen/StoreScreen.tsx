import { StaticScreenProps, useRoute } from "@react-navigation/native";
import { AppText, Layout } from "components";
import { useAppSelector, useRestaurantDetailQuery } from "hooks";
import { useAppNavigation } from "navigators";
import React, { useLayoutEffect, useState } from "react";
import { ActivityIndicator, Animated, NativeScrollPoint, View } from "react-native";
import { selectLocation } from "store/slices/LocationSlice";
import * as Components from "./components";
import { style } from "theme";

type Props = StaticScreenProps<{ id: number }>;

export const StoreScreen = ({ route }: Props) => {
  const navigation = useAppNavigation();
  const id = route.params.id;
  const location = useAppSelector(selectLocation);

  const { data: restaurant, isLoading } = useRestaurantDetailQuery(id, {
    lat: location.lat,
    lng: location.long,
  });

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const scrollY = React.useRef(new Animated.Value(0)).current;

  if (isLoading) {
    return (
      <View style={[style.flex_1, style.center]}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!restaurant) {
    return (
      <View style={[style.flex_1, style.center]}>
        <AppText children="Restaurant not found" />
      </View>
    );
  }

  return (
    <Layout>
      <Components.SHeader scrollY={scrollY} restaurant={restaurant} />
      <Components.SBody scrollY={scrollY} restaurant={restaurant} />
      <Components.SCartFloating restaurant={restaurant} />
    </Layout>
  );
};
