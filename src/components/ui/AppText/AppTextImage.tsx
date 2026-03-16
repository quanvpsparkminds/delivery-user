import React from "react";
import { AppText } from "./AppText";
import { STextStyle } from "types";
import { style } from "theme";
import { useAppNavigation } from "navigators";

type AppTextImageProps = {
  text?: string;
};

export const AppTextImage: React.FC<AppTextImageProps> = ({ text }) => {
  const navigation = useAppNavigation();
  const hasImage = Boolean(text);

  const handleViewImage = () =>
    hasImage &&
    navigation.navigate("PreviewImage", {
      imageData: {
        uri: text ?? "",
      },
    });
  return (
    <AppText
      style={hasImage && $text}
      onPress={hasImage ? handleViewImage : undefined}
    >
      {hasImage ? "Xem hình ảnh" : "Chưa có ảnh"}
    </AppText>
  );
};

const $text: STextStyle = [
  style.tx_color_primary500,
  { textDecorationLine: "underline", fontStyle: "italic" },
];
