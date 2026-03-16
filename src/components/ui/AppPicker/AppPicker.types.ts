export type TPickerItem = {
  key: string;
  label: string;
  active?: boolean;
} & {
  [k in string]: any;
};
