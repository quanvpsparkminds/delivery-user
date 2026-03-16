import { useAppTheme } from "provider";
import React, { useState } from "react";
import { Pressable, View, TouchableOpacity } from "react-native";
import { spacing, style } from "theme";
import { STextStyle, SViewStyle, TFile } from "types";
import { AppInputLabel, AppText, modertRef, PickerItem } from "components";
import DocumentPicker, { pick } from "@react-native-documents/picker";
import { delay } from "utils";

export type AppFilePickerProps = {
  value?: TFile;
  onValueChange: (value: TFile) => void;
  label: string;
  placeholder?: string;
  errors?: string;
  allowedExtensions?: string[];
  multiple?: boolean;
  Right?: (props: AppFilePickerProps) => React.ReactNode;
};

export const AppFilePicker = (props: AppFilePickerProps) => {
  const { colorScheme } = useAppTheme();
  const [isPickingFile, setIsPickingFile] = useState<boolean>(false);
  const {
    onValueChange,
    value,
    label,
    placeholder,
    errors,
    allowedExtensions = ["pdf", "doc", "docx", "txt", "xlsx"],
    Right,
  } = props;

  const handleItemPressed = async () => {
    if (isPickingFile) return;

    setIsPickingFile(true);

    try {
      await delay(150);
      await handleDocumentPicker();
    } finally {
      setIsPickingFile(false);
    }
  };

  const handleClearFile = () => {
    if (isPickingFile) return;
    onValueChange({
      name: "",
      type: "",
      uri: "",
      size: 0,
    });
  };

  const handleDocumentPicker = async () => {
    try {
      const results = await pick({
        mode: "open",
        destination: "documentDirectory",
      });

      if (results && results.length > 0) {
        const file = results[0];

        if (allowedExtensions.length > 0) {
          const fileName = file.name || "";
          const fileExtension = fileName.split(".").pop()?.toLowerCase() || "";

          if (!allowedExtensions.includes(fileExtension)) {
            modertRef.current?.show({
              title: "Thông báo",
              message: `File không được hỗ trợ. Chỉ chấp nhận: ${allowedExtensions.join(
                ", "
              )}`,
              buttons: [
                {
                  title: "OK",
                },
              ],
            });
            return;
          }
        }

        onValueChange({
          name: file.name || "",
          type: file.type || "",
          uri: file.uri || "",
          size: file.size || 0,
        });
      }
    } catch (error) {
      if (DocumentPicker.isErrorWithCode(error)) {
        return;
      }

      modertRef.current?.show({
        title: "Lỗi",
        message: "Không thể chọn file. Vui lòng thử lại.",
        buttons: [
          {
            title: "OK",
          },
        ],
      });
    }
  };

  const renderFileInfo = () => {
    if (!value || !value.name) return null;

    const fileName = value.name || "Unknown file";
    const fileSize = value.size
      ? `${(value.size / 1024 / 1024).toFixed(2)} MB`
      : "";

    return (
      <View style={$fileInfo}>
        <View style={[style.row, style.align_center, style.justify_between]}>
          <View style={$fileDetails}>
            <AppText style={$fileName} numberOfLines={1}>
              📄 {fileName}
            </AppText>
            {fileSize && <AppText style={$fileSize}>{fileSize}</AppText>}
          </View>

          <View style={[style.row, style.align_center, style.gap_sm]}>
            {Right && Right(props)}

            <TouchableOpacity
              onPress={handleClearFile}
              style={$clearButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <AppText style={$clearButtonText}>✕</AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderErrorMessage = (error?: string) => {
    if (!error) return null;

    return (
      <View style={$errorWrapper}>
        <AppText style={$error}>{error as string}</AppText>
      </View>
    );
  };

  return (
    <>
      <View style={[style.gap_xxs, !errors && style.mb_sm]}>
        <AppInputLabel label={label} />
        <View
          style={[
            $fileContainer,
            {
              borderColor: errors ? colorScheme.error : colorScheme.surface,
            },
          ]}
        >
          {value && value.name ? (
            renderFileInfo()
          ) : (
            <Pressable
              style={({ pressed }) => ({
                transform: [{ scale: pressed ? 0.99 : 1 }],
                flex: 1,
                justifyContent: "center",
              })}
              onPress={() => handleItemPressed()}
              disabled={isPickingFile}
            >
              <View style={[style.row, style.align_center]}>
                <AppText style={{ color: colorScheme.surface }}>📄</AppText>
                <AppText style={[style.pl_sm, { color: colorScheme.surface }]}>
                  {placeholder || "Chọn tài liệu..."}
                </AppText>
              </View>
            </Pressable>
          )}
        </View>
      </View>
      {renderErrorMessage(errors)}
    </>
  );
};

const $fileContainer: SViewStyle = [
  style.inbut,
  style.px_md,
  style.py_sm,
  {
    width: spacing.screenWidth - spacing.md * 2,
    minHeight: spacing.xl * 2,
    borderWidth: spacing.hairlineWidth,
    justifyContent: "center",
  },
];

const $fileInfo: SViewStyle = [
  {
    width: "100%",
  },
];

const $fileDetails: SViewStyle = [style.flex_1, style.mr_sm];

const $fileName: STextStyle = [
  style.tx_size_md,
  style.mb_xxs,
  {
    textAlign: "left",
  },
];

const $fileSize: STextStyle = [
  style.tx_size_sm,
  {
    opacity: 0.7,
  },
];

const $clearButton: SViewStyle = [
  {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
];

const $clearButtonText: STextStyle = [
  {
    fontSize: 14,
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
  },
];

const $errorWrapper: SViewStyle = [style.py_xxs, style.px_xxs, style.mt_md];

const $error: STextStyle = [style.tx_size_sm, style.tx_color_error500];
