import { EPermissionName, hasPermission, TAction, useAppSelector } from "hooks";
import React, { PropsWithChildren } from "react";
import { selectRole } from "store";

type PermissionGuardProps = {
  name: EPermissionName;
  action: keyof TAction;
  fallback?: React.ReactNode;
} & PropsWithChildren;

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  name,
  action,
  children,
  fallback,
}) => {
  const role = useAppSelector(selectRole);

  return hasPermission({ role, name, action }) ? children : fallback;
};
