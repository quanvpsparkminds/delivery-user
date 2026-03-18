import { lotties } from "@assets/lotties";
import { Layout } from "components";
import { useAppDispatch, useLocationQuery, useMeQuery } from "hooks";
import { useSocket } from "hooks/Socket/Socket";
import LottieView from "lottie-react-native";
import { useAppNavigation } from "navigators";
import React, { useEffect, useLayoutEffect } from "react";
import { updateMe } from "store/slices/AuthSlice";
import { updateAddress } from "store/slices/LocationSlice";
import { style } from "theme";

export const FetchingScreen = () => {
  const navigation = useAppNavigation();
  const { data: locationData, isLoading: isLoadingLocation } =
    useLocationQuery();
  const { data: userData, isLoading: isLoadingUser } = useMeQuery();
  const dispatch = useAppDispatch();

  useSocket();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  useEffect(() => {
    if (!isLoadingLocation && userData?.data) {
      if (locationData) {
        dispatch(updateAddress({ address: locationData.display_name }));
      }
      if (userData?.data) {
        dispatch(updateMe(userData.data));
      }
      navigation.replace("AppTabbar");
    }
  }, [isLoadingLocation, isLoadingUser, locationData, userData, dispatch]);

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
