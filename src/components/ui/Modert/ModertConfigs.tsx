import React, {
  PropsWithChildren,
  useContext,
  useImperativeHandle,
  useState,
} from "react";
import { Modert } from "./Modert";
import { AppButtonProps, EAppButtonType } from "../AppButton";
import { useTx } from "i18n";

type ModertProps = {
  title?: string;
  message: string;
  buttons: AppButtonProps[];
  visible: boolean;
  disabledBackdropPress?: boolean;
};

type ShowModalParams = Partial<Pick<ModertProps, "buttons">> &
  Omit<ModertProps, "buttons" | "visible">;

type ModertProviderProps = {
  modert: ModertProps;
  show: (props: ShowModalParams) => void;
  hide: () => void;
  visible: boolean;
};

const dfModertProps: ModertProps = {
  title: "",
  message: "",
  buttons: [],
  visible: false,
};

const modertRef =
  React.createRef<Pick<ModertProviderProps, "show" | "hide" | "visible">>();
const context = React.createContext<ModertProviderProps>(
  {} as ModertProviderProps
);
const Provider = context.Provider;

const ModertProvider: React.FC<PropsWithChildren> = (props) => {
  const { t } = useTx();
  const [modertProps, setModertProps] = useState<ModertProps>(dfModertProps);

  const show: ModertProviderProps["show"] = (props) =>
    setModertProps({
      ...props,
      visible: true,
      buttons: props.buttons?.length
        ? props.buttons.map((item) => ({
            ...item,
            onPress: () => {
              hide();
              item.onPress?.(undefined as any);
            },
          }))
        : [
            {
              title: t("common.ok"),
              onPress: hide,
              type: EAppButtonType.transparent,
            },
          ],
    });

  const hide = () => setModertProps((prev) => ({ ...prev, visible: false }));

  useImperativeHandle(
    modertRef,
    () => ({
      show,
      hide,
      visible: modertProps.visible,
    }),
    [modertProps.visible]
  );

  return (
    <Provider
      value={{ modert: modertProps, show, hide, visible: modertProps.visible }}
      {...props}
    >
      {props.children}
      <Modert />
    </Provider>
  );
};

const useModert = () => useContext(context);

export { ModertProvider, useModert, modertRef };
