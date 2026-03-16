import React from "react";
import { lotties } from "@assets/lotties";
import { ViewStyle } from "react-native";
import LottieView, { LottieViewProps } from "lottie-react-native";

type LoaderProps = {} & Omit<LottieViewProps, "source">;

export const Loader: React.FC<LoaderProps> = (props) => {
  return (
    <LottieView
      source={lotties.loader}
      style={[$loader, props.style]}
      autoPlay
      loop
    />
  );
};

export const $loader: ViewStyle = {
  width: "100%",
  height: "100%",
};
