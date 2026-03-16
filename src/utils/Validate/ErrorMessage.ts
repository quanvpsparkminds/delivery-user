import { TxKeyPath } from "i18n";
import { t, TFunction } from "i18next";

type ErrorMessageOptions = {
  length?: number;
  value?: number | string;
};

type ErrorType = "required" | "maxLength" | "minLength" | "incorrectEmail";

type GetErrorMessageParams = {
  inputName?: TxKeyPath;
  type?: ErrorType;
  options?: ErrorMessageOptions;
};

const getErrorMessage = ({
  type,
  options,
  inputName,
}: GetErrorMessageParams) => {
  const translatedInputName = inputName !== undefined ? t(inputName) : "";
  switch (type) {
    case "required":
      return t("errorMessage.input.required", {
        input: translatedInputName.toLocaleLowerCase(),
      });
    case "incorrectEmail":
      return t("errorMessage.input.incorrectEmail");
    case "maxLength":
      return t("errorMessage.maxLength", {
        length: options?.length?.toString(),
      });
    case "minLength":
      return t("errorMessage.minLength", {
        length: options?.length?.toString(),
      });
    default:
      return "";
  }
};

export const getTrErrorMessage = () => ({
  required: (inputName: TxKeyPath, options?: ErrorMessageOptions) =>
    getErrorMessage({ inputName, type: "required", options }),
  maxLength: (options: ErrorMessageOptions) =>
    getErrorMessage({ type: "maxLength", options }),
  minLength: (options: ErrorMessageOptions) =>
    getErrorMessage({ type: "minLength", options }),
  incorrectEmail: (inputName?: TxKeyPath) =>
    getErrorMessage({ inputName, type: "incorrectEmail" }),
});

export type TranslatedErrorMessage = ReturnType<typeof getTrErrorMessage>;
