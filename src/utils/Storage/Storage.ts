import { MMKV } from "react-native-mmkv";
import * as Keychain from "react-native-keychain";

export const storage = new MMKV({
  id: "PLATE",
});

// Wrapper to maintain compatibility with RNSecureStorage API
const secureStorageWrapper = {
  setItem: async (key: string, value: string) => {
    try {
      return await Keychain.setGenericPassword(key, value, { service: key });
    } catch (error) {}
  },
  getItem: async (key: string) => {
    const credentials = await Keychain.getGenericPassword({ service: key });
    if (credentials && credentials.username === key) {
      return credentials.password;
    }
    return null;
  },
  removeItem: async (key: string) => {
    try {
      return await Keychain.resetGenericPassword({ service: key });
    } catch (error) {}
  },
};

export const secureStorage = secureStorageWrapper;
