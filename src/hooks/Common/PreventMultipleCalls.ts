import { useRef, useCallback } from "react";

export const usePreventMultipleCalls = <
  T extends (...args: any[]) => Promise<any>
>(
  func: T
) => {
  const fnRef = useRef<Promise<ReturnType<T>> | null>(null);

  const wrappedFunction = useCallback(
    async (...args: Parameters<T>): Promise<ReturnType<T>> => {
      if (!fnRef.current) {
        fnRef.current = func(...args).finally(() => {
          fnRef.current = null;
        });
      }

      return fnRef.current;
    },
    [func]
  );

  return wrappedFunction;
};
