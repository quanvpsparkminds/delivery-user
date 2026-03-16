import { lotties } from "@assets/lotties";
import { Layout } from "components";
import { useAppDispatch, useLocationQuery } from "hooks";
import LottieView from "lottie-react-native";
import { useAppNavigation } from "navigators";
import React, { useEffect, useLayoutEffect } from "react";
import { updateAddress } from "store/slices/LocationSlice";
import { style } from "theme";

export const FetchingScreen = () => {
  const navigation = useAppNavigation();
  const { data, isLoading } = useLocationQuery();
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (data) {
        dispatch(updateAddress({ address: data.display_name }));
      }
      navigation.replace("AppTabbar");
    }
  }, [isLoading]);

  return (
    <Layout>
      <LottieView
        source={lotties.location_loading}
        style={style.fill_center}
        autoPlay
        loop
      />
    </Layout>
  );
};
