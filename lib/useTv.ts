import useSWR from "swr";

type TvCategory = "top_rated" | "popular" | "airing_today";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export interface TvShowProps {
  id: number;
  name: string;
  first_air_date: string;
  vote_average: number;
  poster_path: string;
}

interface UseTvResult {
  results: TvShowProps[];
}

export function useTv(category: TvCategory) {
  const { data, error } = useSWR<UseTvResult>(`/api/tv/${category}`, fetcher);
  return {
    tvShows: data?.results,
    isLoading: !error && !data,
    isError: error,
  };
}
