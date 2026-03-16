import { useAppTheme } from "provider";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ImageStyle,
  Linking,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
} from "react-native";
import { spacing, style } from "theme";
import { STextStyle, SViewStyle, TFile } from "types";
import { AppModal } from "../AppModal";
import { TPickerItem } from "./AppPicker.types";

import { AppInputLabel, AppText, modertRef, PickerItem } from "components";
import { useTranslation } from "react-i18next";
import {
  CameraType,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
  MediaType,
  PhotoQuality,
} from "react-native-image-picker";
import { Camera } from "react-native-vision-camera";
import { delay } from "utils";
import { useConfig, useSystemeQuery } from "hooks";

const itemHeight = style.inbut.height;

export type AppImagePickerProps = {
  value?: TFile | string;
  onValueChange: (value: TFile) => void;
  label: string;
  isCamera?: boolean;
  placeholder?: string;
  errors?: string;
};

export const AppImagePicker = (props: AppImagePickerProps) => {
  const { colorScheme } = useAppTheme();
  const { t } = useTranslation();
  const { onValueChange, value, label, placeholder, errors, isCamera } = props;
  const { isImageConfig } = useConfig();

  const items: TPickerItem[] = [
    { key: "camera", label: t("image.camera") },
    { key: "gallery", label: t("image.gallery") },
  ];

  const [visible, setVisible] = useState<boolean>(false);

  const open = () => {
    if (__DEV__) {
      handleGalleryLaunch();
    } else {
      handleCameraLaunch();
    }
  };

  const close = () => setVisible(false);

  const handleItemPressed = async (item: TPickerItem) => {
    close();
    await delay(500);
    switch (item.key) {
      case "camera":
        handleCameraLaunch();
        break;
      default:
        handleGalleryLaunch();
        break;
    }
  };

  const checkCameraPermission = async () => {
    try {
      const permission = await Camera.requestCameraPermission();
      return permission === "granted";
    } catch (error) {
      return false;
    }
  };

  const handleCameraLaunch = async () => {
    if (await checkCameraPermission()) {
      const options = {
        mediaType: "photo" as MediaType,
        quality: 0.9 as PhotoQuality,
        maxWidth: 1024,
        maxHeight: 1024,
        includeBase64: false,
        cameraType: "back" as CameraType,
      };
      launchCamera(options, (response: ImagePickerResponse) => {
        if (response.didCancel || response.errorMessage) return;
        if (response.assets && response.assets[0]) {
          const file = response.assets[0];
          props.onValueChange({
            name: file.fileName || "",
            type: file.type || "",
            uri: file.uri || "",
            size: file.fileSize,
          });
        }
      });
    } else {
      modertRef.current?.show({
        title: "Thông báo",
        message: "Bạn chưa cấp quyền chụp ảnh, vui lòng cấp quyền để chụp ảnh",
        buttons: [
          {
            title: "Huỷ",
          },
          {
            title: "Cài đặt",
            onPress: () => Linking.openSettings(),
          },
        ],
      });
    }
  };

  const handleGalleryLaunch = () => {
    const options = {
      mediaType: "photo" as MediaType,
      quality: 0.9 as PhotoQuality,
      selectionLimit: 1,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel || response.errorMessage) return;

      if (response.assets && response.assets[0]) {
        const file = response.assets[0];
        onValueChange({
          name: file.fileName || "",
          type: file.type || "",
          uri: file.uri || "",
          size: file.fileSize,
        });
      }
    });
  };

  const renderErrorMessage = (error?: string) => {
    if (!error) return null;

    return (
      <View style={$errorContainer}>
        <AppText style={$errorText}>{error as string}</AppText>
      </View>
    );
  };
  return (
    <>
      <Pressable
        style={({ pressed }) => ({
          transform: [{ scale: pressed ? 0.99 : 1 }],
          opacity: isImageConfig ? 1 : 0.5,
        })}
        onPress={open}
        disabled={!isImageConfig}
      >
        <View pointerEvents="none">
          <View style={style.gap_xxs}>
            <AppInputLabel label={label} />
            <View
              style={[
                $imageEmpty,
                {
                  borderColor: errors ? colorScheme.error : colorScheme.surface,
                },
              ]}
            >
              {value ? (
                <Image
                  style={$image}
                  source={{
                    uri: typeof value === "string" ? value : value?.uri,
                  }}
                />
              ) : (
                <AppText style={{ color: colorScheme.surface }}>
                  {placeholder}
                </AppText>
              )}
            </View>
          </View>
        </View>
        <AppModal visible={visible} onRequestClose={close}>
          <FlatList
            data={items}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <PickerItem data={item} onPress={() => handleItemPressed(item)} />
            )}
            ItemSeparatorComponent={() => (
              <View
                style={[$divider, { backgroundColor: colorScheme.surface }]}
              />
            )}
            getItemLayout={(_, index) => ({
              length: itemHeight,
              offset: itemHeight * index,
              index,
            })}
          />
        </AppModal>
      </Pressable>
      {renderErrorMessage(errors)}
    </>
  );
};

const $divider: SViewStyle = [
  { height: StyleSheet.hairlineWidth, width: "100%" },
];
const $imageEmpty: SViewStyle = [
  style.round_md,
  style.center,
  {
    width: spacing.screenWidth - spacing.md * 2,
    height: spacing.screenWidth * 0.5,
    borderWidth: spacing.hairlineWidth,
  },
];

const $image: StyleProp<ImageStyle> = [
  style.round_md,
  {
    width: spacing.screenWidth - spacing.md * 2,
    height: spacing.screenWidth * 0.5,
  },
];

const $errorContainer: SViewStyle = [];
const $errorText: STextStyle = [style.tx_size_sm, style.tx_color_error500];
