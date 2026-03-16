import { StaticScreenProps, useRoute } from "@react-navigation/native";
import { AppText, Layout } from "components";
import { useAppSelector, useRestaurantDetailQuery } from "hooks";
import { useAppNavigation } from "navigators";
import React, { useLayoutEffect, useState } from "react";
import { ActivityIndicator, NativeScrollPoint, View } from "react-native";
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

  const [scrollOffSet, setScrollOffSet] = useState<NativeScrollPoint>({
    x: 0,
    y: 0,
  });

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
      <Components.SHeader scrollPoint={scrollOffSet} restaurant={restaurant} />
      <Components.SBody
        onScroll={(event) => setScrollOffSet(event.nativeEvent.contentOffset)}
        restaurant={restaurant}
      />
      <Components.SCartFloating restaurant={restaurant} />
    </Layout>
  );
};
