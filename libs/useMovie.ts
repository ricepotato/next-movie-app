import useSWR from "swr";
import Poster, { PosterProps } from "@components/Poster";

type MovieCategory = "upcoming" | "popular" | "now_playing";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export interface UseMovieResult {
  results: PosterProps[];
}

export interface MovieDetail {
  title: string;
  release_date: string;
  runtime: number;
  overview: string;
  genres: [{ id: number; name: string }];
  videos: { results: [{ site: string; key: string }] };
  production_companies: [{ logo_path: string; id: number }];
  production_countries: [{ name: string }];
  backdrop_path: string;
  poster_path: string;
}

export function useMovie(category: MovieCategory) {
  const { data, error } = useSWR<UseMovieResult>(
    `/api/movies/${category}`,
    fetcher
  );
  return {
    movies: data?.results,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useMovieDetail(movieId: string | string[] | undefined) {
  const { data, error } = useSWR<MovieDetail>(
    movieId === undefined ? null : `/api/movies/${movieId}`,
    fetcher
  );
  return {
    movie: data,
    isLoading: !error && !data,
    isError: error,
  };
}
