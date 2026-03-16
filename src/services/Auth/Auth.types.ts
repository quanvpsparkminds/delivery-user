export type TLogin = {
  email: string;
  password: string;
  mode: "USER";
};

export type TLoginResponse = {
  token: string;
};