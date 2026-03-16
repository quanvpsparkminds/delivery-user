import { BlankBox, BlankBoxProps } from "../BlankBox";
import { Loader } from "../Loader";
import { SViewStyle } from "types";
import { useAppTheme } from "provider";
import React from "react";
import { FlatList, FlatListProps, RefreshControl, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { spacing, style } from "theme";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { useRefreshByUser } from "hooks";

type InfiniteQueryFlatlistProps<T> = {
  blankProps?: BlankBoxProps;
  safeAreaOnBottom?: boolean;
} & FlatListProps<T> &
  UseInfiniteQueryResult<T>;

export function InfiniteQueryFlatlist<T>({
  data,
  blankProps,
  safeAreaOnBottom,
  isLoading,
  isRefetching,
  refetch,
  fetchNextPage,
  hasNextPage,
  ...rest
}: InfiniteQueryFlatlistProps<T>) {
  const { colorScheme } = useAppTheme();
  const { refetchByUser, isRefetchingByUser } = useRefreshByUser(refetch);

  const insets = useSafeAreaInsets();

  return isLoading ? (
    <Loader style={$loader} />
  ) : (
    <FlatList
      refreshControl={
        <RefreshControl
          tintColor={colorScheme.onBackground}
          refreshing={isRefetchingByUser}
          onRefresh={refetchByUser}
        />
      }
      data={data}
      onEndReached={() => fetchNextPage()}
      onEndReachedThreshold={0.4}
      ListFooterComponent={() => (
        <>
          {hasNextPage ? <Loader style={style.py_sm} /> : <View />}
          {safeAreaOnBottom && (
            <View style={{ height: insets.bottom || spacing.md }} />
          )}
        </>
      )}
      ListEmptyComponent={() => (
        <BlankBox {...blankProps} style={[$blankBox, blankProps?.style]} />
      )}
      ItemSeparatorComponent={() => <View style={style.h_md} />}
      contentContainerStyle={style.py_sm}
      style={style.w_screenWidth}
      {...rest}
    />
  );
}
const $loader: SViewStyle = [{ width: "50%" }, style.self_center];

const $blankBox: SViewStyle = [
  style.h_screenWidth,
  style.center,
  { width: "100%" },
];
