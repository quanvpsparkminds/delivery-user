import { TxKeyPath } from "i18n";
import { TFile } from "types";
import { z } from "zod";
import { getTrErrorMessage } from "./ErrorMessage";
import { inputMaxLength } from "./MaxLength";
import { inputMinLength } from "./MinLength";

const textBoxValidator = (labelTx: TxKeyPath) => {
  const errorMsg = getTrErrorMessage();
  return z
    .string()
    .min(1, { message: errorMsg.required(labelTx) })
    .max(inputMaxLength.text, {
      message: errorMsg.maxLength({ length: inputMaxLength.text }),
    });
};

const emailValidator = () => {
  const errorMsg = getTrErrorMessage();
  return z
    .string()
    .min(1, { message: errorMsg.required("input.email.label") })
    .max(inputMaxLength.email, {
      message: errorMsg.maxLength({
        length: inputMaxLength.email,
      }),
    })
    .email({ message: errorMsg.incorrectEmail() });
};

const passwordValidator = () => {
  const errorMsg = getTrErrorMessage();
  return z
    .string()
    .min(1, { message: errorMsg.required("input.password.label") })
    .min(inputMinLength.password, {
      message: errorMsg.minLength({
        length: inputMinLength.password,
      }),
    })
    .max(inputMaxLength.password, {
      message: errorMsg.maxLength({
        length: inputMaxLength.password,
      }),
    });
};

const textAreaValidator = (labelTx: TxKeyPath) => {
  const errorMsg = getTrErrorMessage();
  return z
    .string()
    .min(1, { message: errorMsg.required(labelTx) })
    .max(inputMaxLength.note, {
      message: errorMsg.maxLength({
        length: inputMaxLength.note,
      }),
    });
};

const inputRequired = (labelTx: TxKeyPath) => {
  const errorMsg = getTrErrorMessage();
  return z.string().min(1, { message: errorMsg.required(labelTx) });
};

const imageValidator = () => {
  return z
    .any()
    .refine((file) => file !== null, {
      message: "Vui lòng tải hình ảnh lên",
    })
    .refine(
      (file: TFile) => {
        return (file?.size || 0) <= inputMaxLength.image;
      },
      {
        message: "Vui lòng tải file nhỏ hơn hoặc bằng 5MB",
      }
    );
};
const fileValidator = () => {
  return z
    .any()
    .refine((file) => file !== null, {
      message: "Vui lòng tải file lên",
    })
    .refine(
      (file: TFile) => {
        return (file?.size || 0) <= inputMaxLength.file;
      },
      {
        message: `Vui lòng tải file nhỏ hơn hoặc bằng ${inputMaxLength.file}MB`,
      }
    );
};

const imageMaxValidator = () => {
  return z.any().refine(
    (file: TFile) => {
      return (file?.size || 0) <= inputMaxLength.image;
    },
    {
      message: `Vui lòng tải file nhỏ hơn hoặc bằng ${inputMaxLength.image}MB`,
    }
  );
};

export const validators = {
  textBox: textBoxValidator,
  email: emailValidator,
  password: passwordValidator,
  note: textAreaValidator,
  inputRequired: inputRequired,
  image: imageValidator,
  imageMax: imageMaxValidator,
  file: fileValidator,
};
