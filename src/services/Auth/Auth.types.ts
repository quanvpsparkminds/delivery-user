export type TLogin = {
  email: string;
  password: string;
  mode: "USER";
};

export type TLoginResponse = {
  token: string;
};

export type TUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthday: string | null;
  phoneCode: string;
  phoneNumber: string;
  image: string | null;
};