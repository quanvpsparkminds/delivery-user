import React, { useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { SupportedLngs } from "i18n/i18n.types";
import { AppButton, Layout } from "components/ui";
import { palette, style } from "theme";
import { useTx } from "i18n";
import { useAppNavigation } from "navigators";

export const LanguageScreen = () => {
  const navigation = useAppNavigation<"Language">();
  const { i18n } = useTranslation();
  const { t } = useTx();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t("language.title"),
    });
  });

  return (
    <Layout padding="md" style={style.gap_sm}>
      {[SupportedLngs.vi, SupportedLngs.en].map((lng) => (
        <AppButton
          key={lng}
          title={lng.toUpperCase()}
          style={i18n.language !== lng && { backgroundColor: palette.gray300 }}
          onPress={() => i18n.changeLanguage(lng)}
        />
      ))}
    </Layout>
  );
};
