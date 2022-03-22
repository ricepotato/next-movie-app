import useSWR from "swr";
import { TvShowProps } from "./useTv";
import { PosterProps } from "@components/Poster";

interface SearchResult {
  isLoading: boolean;
  isError: boolean;
}

interface UseTvSearchResult extends SearchResult {
  data: TvShowProps[];
}

interface UseMovieSearchResult extends SearchResult {
  data: PosterProps[];
}

function useSearchTemplate(url: string, query: string | undefined) {
  const key = query === "" || query === undefined ? null : `${url}/${query}`;
  const { data, error } = useSWR(key, (url: string) =>
    fetch(url).then((res) => res.json())
  );
  return {
    data: data?.results,
    isLoading: !error && !data,
    isError: error,
  };
}

export const useTvSearch = (query: string | undefined): UseTvSearchResult =>
  useSearchTemplate("/api/search/tv", query);
export const useMovieSearch = (
  query: string | undefined
): UseMovieSearchResult => useSearchTemplate("/api/search/movie", query);
