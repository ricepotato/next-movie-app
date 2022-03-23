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

export interface UseTvResult {
  results: TvShowProps[];
}

interface TvShowSeason {
  name: string;
  poster_path: string;
}

interface TvShowDetail {
  name: string;
  first_air_date: string;
  genres: [{ id: number; name: string }];
  videos: { results: [{ site: string; key: string }] };
  production_companies: [{ logo_path: string; id: number }];
  production_countries: [{ name: string }];
  seasons: [TvShowSeason];
  backdrop_path: string;
  poster_path: string;
  overview: string;
}

export function useTv(category: TvCategory) {
  const { data, error } = useSWR<UseTvResult>(`/api/tv/${category}`, fetcher);
  return {
    tvShows: data?.results,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useTvDetail(id: string | string[] | undefined) {
  const { data, error } = useSWR<TvShowDetail>(
    id === undefined ? null : `/api/tv/${id}`,
    fetcher
  );
  return {
    tvShow: data,
    isLoading: !error && !data,
    isError: error,
  };
}
