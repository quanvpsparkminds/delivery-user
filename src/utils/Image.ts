import Config from "react-native-config";

export const getImage = (url: string) => {
  return `${Config.BASE_URL}/uploads/${url}`;
};
