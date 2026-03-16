module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
        alias: {
          "@components": "./src/components",
          "@screens": "./src/screens",
          "@navigators": "./src/navigators",
          "@store": "./src/store",
          "@hooks": "./src/hooks",
          "@utils": "./src/utils",
          "@services": "./src/services",
          "@types": "./src/types",
          "@i18n": "./src/i18n",
          "@assets": "./assets",
          "@theme": "./src/theme",
          "@provider": "./src/provider",
        },
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
