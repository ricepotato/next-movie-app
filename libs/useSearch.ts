import useSWR from "swr";

function useSearchTemplate<T = any>(url: string, query: string | undefined) {
  const key = query === "" || query === undefined ? null : `${url}/${query}`;
  const { data, error } = useSWR<T>(key, (url: string) =>
    fetch(url).then((res) => res.json())
  );
  return {
    data: data?.results,
    isLoading: !error && !data,
    isError: error,
  };
}

export const useTvSearch = <UseTvResult>(query: string | undefined) =>
  useSearchTemplate("/api/search/tv", query);
export const useMovieSearch = <UseMovieResult>(query: string | undefined) =>
  useSearchTemplate("/api/search/movie", query);
