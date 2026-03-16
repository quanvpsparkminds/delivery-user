import { useInfiniteQuery } from "@tanstack/react-query";
import { pokemonApi } from "services";

export const usePokemonInfiniteQuery = (size: number = 20) => {
  return useInfiniteQuery({
    queryKey: ["pokemon"],
    queryFn: async ({ pageParam = 0 }) => {
      return pokemonApi.pokemon(size, pageParam);
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.data?.length < size) {
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
