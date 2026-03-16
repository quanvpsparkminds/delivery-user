import { images } from "@assets/index";
import { useAppNavigation } from "navigators";
import React from "react";
import { Image, Pressable, View } from "react-native";
import { style } from "theme";
import { STextStyle, SViewStyle } from "types";
import { AppText } from "../AppText";
import { isAndroid } from "utils";

type AppHeaderProp = {
  label: string;
};

export const AppHeader: React.FC<AppHeaderProp> = ({ label }) => {
  const navigation = useAppNavigation();

  return (
    isAndroid && (
      <View style={$root}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image source={images["chevron_left"]} />
        </Pressable>
        <AppText style={$title}>{label}</AppText>
      </View>
    )
  );
};

const $root: SViewStyle = [
  style.row,
  style.align_center,
  style.gap_md,
  style.my_sm,
];
const $title: STextStyle = [style.tx_font_medium, { fontSize: 22 }];
