import useSWR from "swr";
import Poster, { PosterProps } from "../components/Poster";

type MovieCategory = "upcoming" | "popular" | "now_playing";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface UseMovieResult {
  results: PosterProps[];
}

export default function useMovie(category: MovieCategory) {
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
