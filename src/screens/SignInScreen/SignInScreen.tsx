import { AppText, Layout } from "components";
import { useAppNavigation } from "navigators";
import React, { useLayoutEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ESignInType } from "./SignInScreen.types";
import { SImageStyle, STextStyle, SViewStyle } from "types";
import { style } from "theme";
import { useAppTheme } from "provider";
import * as Components from "./components";
import Animated, { ZoomInDown } from "react-native-reanimated";
import { Image, View } from "react-native";
import { images } from "@assets/index";

export const SignInScreen = () => {
  const navigation = useAppNavigation();
  const { t, i18n } = useTranslation();
  const { colorScheme } = useAppTheme();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const [mode, setMode] = useState<ESignInType>(ESignInType.SIGN_IN);

  const form = useMemo(() => {
    switch (mode) {
      case ESignInType.SIGN_IN:
        return <Components.SignInForm />;
      case ESignInType.SIGN_UP:
        return <Components.SignUpForm />;
      default:
        return undefined;
    }
  }, [mode]);

  return (
    <Layout paddingX="md" safeAreaOnBottom safeAreaOnTop style={style.gap_sm}>
      <View style={$box}>
        <Image source={images.logo} style={$logo} />
      </View>
      <AppText tx={`signIn.title.${mode}`} style={$title} />
      <AppText
        tx={`signIn.sub`}
        style={[$sub, { color: colorScheme.surface }]}
      />
      <Components.STabs mode={mode} onChangeTab={setMode} />
      {form}
    </Layout>
  );
};

const $title: STextStyle = [
  style.tx_size_xxl,
  style.tx_font_bold,
  style.tx_center,
];
const $sub: STextStyle = [style.tx_center, style.tx_size_sm];
const $box: SViewStyle = [style.center, style.mt_xl];
const $logo: SImageStyle = { width: 100, height: 100 };
