import * as ReactNativeKeychain from "react-native-keychain";
import { Storage } from "redux-persist";

export class Keychain implements Storage {
  options: ReactNativeKeychain.Options = {
    accessible:
      ReactNativeKeychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
  };

  async getItem(key: string) {
    const response = await ReactNativeKeychain.getGenericPassword({
      ...this.options,
      service: key,
    });
    return response ? response.password : "";
  }
  async setItem(key: string, value: string) {
    try {
      const response = await ReactNativeKeychain.setGenericPassword(
        value,
        value,
        { ...this.options, service: key }
      );
      return Boolean(response);
    } catch (error) {}
  }
  async removeItem(key: string) {
    try {
      const response = await ReactNativeKeychain.resetGenericPassword({
        ...this.options,
        service: key,
      });
      return response;
    } catch (error) {}
  }
}
