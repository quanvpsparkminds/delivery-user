import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { ColorSchemeName, ColorValue } from "react-native";
import { palette } from "theme";
import { storage, StorageKeys } from "utils";

export type TColorScheme = {
  /** Main color for primary buttons and headers */
  primary: ColorValue;
  /** Darker version of primary color, used for focus or hover */
  primaryVariant: ColorValue;
  /** Secondary actions or accents (e.g., floating action button) */
  secondary: ColorValue;
  /** Screen and container background */
  background: ColorValue;
  /** Cards, modals, and component surfaces */
  surface: ColorValue;
  /** Success color for success messages, status indicators */
  success: ColorValue;
  /** Warning color for alerts, cautionary messages */
  warning: ColorValue;
  /** Error messages and alerts */
  error: ColorValue;
  /** Text on primary color background (e.g., white on purple button) */
  onPrimary: ColorValue;
  /** Text on secondary color background */
  onSecondary: ColorValue;
  /** Main body text color on light background */
  onBackground: ColorValue;
  /** Text on surfaces (cards, pop-ups, etc.) */
  onSurface: ColorValue;
};

export type KColorScheme = keyof TColorScheme;

const lightColors: TColorScheme = {
  primary: palette.primary500,
  primaryVariant: palette.primary700,
  secondary: palette.secondary500,
  background: palette.white,
  surface: palette.gray500,
  success: palette.green500,
  warning: palette.warning500,
  error: palette.error600,
  onPrimary: palette.white,
  onSecondary: palette.white,
  onBackground: palette.black,
  onSurface: palette.black,
};

const darkColors: TColorScheme = {
  primary: palette.primary500,
  primaryVariant: palette.primary700,
  secondary: palette.secondary500,
  background: palette.black,
  surface: palette.gray700,
  success: palette.green500,
  warning: palette.warning500,
  error: palette.error600,
  onPrimary: palette.black,
  onSecondary: palette.black,
  onBackground: palette.white,
  onSurface: palette.white,
};

export type TAppTheme = {
  colorSchemeName: ColorSchemeName;
  colorScheme: TColorScheme;
  updateScheme: (colorSchemeName: ColorSchemeName) => void;
  toggleScheme: () => void;
};

const dfAppTheme: TAppTheme = {
  colorSchemeName: "light",
  colorScheme: lightColors,
  updateScheme: () => {},
  toggleScheme: () => {},
};

const ThemeContext = createContext<TAppTheme>(dfAppTheme);
export const useAppTheme = () => useContext<TAppTheme>(ThemeContext);

type AppThemeProviderProps = PropsWithChildren;

export const AppThemeProvider: React.FC<AppThemeProviderProps> = ({
  children,
}) => {
  const [colorSchemeName, setColorSchemeName] = useState<ColorSchemeName>(
    () =>
      (storage.getString(StorageKeys.colorSchemeName) as ColorSchemeName) ||
      "light"
  );

  const colorScheme = useMemo<TColorScheme>(() => {
    storage.set(StorageKeys.colorSchemeName, colorSchemeName as string);
    switch (colorSchemeName) {
      case "dark":
        return darkColors;
      default:
        return lightColors;
    }
  }, [colorSchemeName]);

  const updateScheme: TAppTheme["updateScheme"] = useCallback((input) => {
    setColorSchemeName(input);
  }, []);

  const toggleScheme: TAppTheme["toggleScheme"] = useCallback(() => {
    setColorSchemeName((prev) => {
      const nextColorSchemeName: ColorSchemeName =
        prev === "light" ? "dark" : "light";
      return nextColorSchemeName;
    });
  }, [setColorSchemeName]);

  return (
    <ThemeContext.Provider
      value={{
        colorScheme,
        colorSchemeName,
        updateScheme,
        toggleScheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
