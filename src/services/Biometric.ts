import { t } from "i18next";
import RNBiometrics, { BiometryType } from "react-native-biometrics";

export type TBiometryType = BiometryType | undefined;

export class Biometric {
  private _biometric: RNBiometrics;
  private _type: TBiometryType;
  private _available: boolean | undefined;

  constructor() {
    this._biometric = new RNBiometrics();
  }

  async init() {
    const { biometryType, available } =
      await this._biometric.isSensorAvailable();
    this._type = biometryType;
    this._available = available;

    return available;
  }

  async validate() {
    const promptResult = await this._biometric.simplePrompt({
      promptMessage: t("biometric.promtMessage"),
      cancelButtonText: t("biometric.cancelButtonText"),
    });
    return promptResult;
  }

  get ready() {
    return this._available !== undefined;
  }
  get isAvailable() {
    return Boolean(this._available);
  }
  get type() {
    return this._type;
  }
}

export const biometric = new Biometric();
