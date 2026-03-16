// import { STextStyle, SViewStyle } from "models";
// import { useAppTheme } from "provider";
// import React from "react";
// import { StyleSheet, TextStyle, ViewStyle } from "react-native";
// import RNPhoneInput, {
//   PhoneInputProps as RNPhoneInputProps,
// } from "react-native-international-phone-number";
// import { palette, scaleFontSize, style } from "theme";

// type PhoneInputProps = {} & RNPhoneInputProps;

// export const PhoneInput: React.FC<PhoneInputProps> = (props) => {
//   const { colorScheme, colorSchemeName } = useAppTheme();

//   const $flattenText: TextStyle = StyleSheet.flatten($text);

//   return (
//     <RNPhoneInput
//       {...props}
//       phoneInputStyles={{
//         container: [$container, { borderColor: colorScheme.surface }],
//         flagContainer: style.bg_transparent,
//         callingCode: $flattenText,
//         input: $flattenText,
//       }}
//       modalStyles={{
//         countryName: $flattenText,
//         callingCode: $flattenText,
//         searchInput: { ...$flattenText, ...($countryInput as ViewStyle) },
//         countryButton: $countryInput,
//       }}
//       theme={colorSchemeName === "dark" ? "dark" : "light"}
//     />
//   );
// };

// const $container: SViewStyle = {
//   ...style.round_md,
//   ...style.inbut,
// };

// const $text: STextStyle = [
//   style.tx_font_regular,
//   { fontSize: scaleFontSize(14), fontWeight: undefined },
// ];

// const $countryInput: SViewStyle = {
//   borderWidth: StyleSheet.hairlineWidth,
//   backgroundColor: palette.transparent,
// };
