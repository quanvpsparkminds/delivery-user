import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { CASH_FUND_TRANSACTION_QUERY_KEYS } from "hooks/CashFundTransaction";
import {
  advanceApi,
  TCreateAdvanceRequest,
  TUpdateAdvanceRequest,
  TAdvanceSearchParams,
  AdvanceStatus,
} from "services";

export const ADVANCE_QUERY_KEYS = {
  all: ["advances"] as const,
  lists: () => [...ADVANCE_QUERY_KEYS.all, "list"] as const,
  list: (params?: TAdvanceSearchParams) =>
    [...ADVANCE_QUERY_KEYS.lists(), params] as const,
};

// GET search advances with infinite query for pagination
export const useAdvancesInfiniteQuery = (
  params?: TAdvanceSearchParams,
  pageSize: number = 20
) => {
  return useInfiniteQuery({
    queryKey: ADVANCE_QUERY_KEYS.list(params),
    queryFn: async ({ pageParam = 0 }) => {
      return advanceApi.searchAdvances(params, pageSize, pageParam);
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.data?.detail?.length < pageSize) {
        return undefined;
      }

      return allPages.length;
    },
    select(data) {
      return data?.pages.flatMap((page) => page.data);
    },
    initialPageParam: 0,
    enabled: true,
    staleTime: 1 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

// POST - Create Advance
export const useCreateAdvanceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TCreateAdvanceRequest) => {
      return advanceApi.createAdvance(data);
    },
    onSuccess: () => {
      // Invalidate all advance queries
      queryClient.invalidateQueries({
        queryKey: ADVANCE_QUERY_KEYS.all,
      });
    },
  });
};

// PUT - Update Advance Status
export const useUpdateAdvanceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: TUpdateAdvanceRequest;
    }) => {
      return advanceApi.updateAdvance(id, data);
    },
    onSuccess: () => {
      // Invalidate all advance queries
      queryClient.invalidateQueries({
        queryKey: ADVANCE_QUERY_KEYS.all,
      });
      queryClient.invalidateQueries({
        queryKey: CASH_FUND_TRANSACTION_QUERY_KEYS.all,
      });
    },
  });
};

// DELETE - Delete Advance
export const useDeleteAdvanceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      return advanceApi.deleteAdvance(id);
    },
    onSuccess: () => {
      // Invalidate all advance queries
      queryClient.invalidateQueries({
        queryKey: ADVANCE_QUERY_KEYS.all,
      });
    },
  });
};
