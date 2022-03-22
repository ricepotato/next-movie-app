import type { NextPage } from "next";
import { useRouter } from "next/router";
import Seo from "@components/Seo";
import { useTvSearch, useMovieSearch } from "@libs/useSearch";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Poster from "@components/Poster";

interface OnSubmitData {
  query?: string;
}

const Search: NextPage = () => {
  const [query, setQuery] = useState<string | undefined>();
  const {
    data: tvData,
    isLoading: isTvLoading,
    isError: isTvError,
  } = useTvSearch(query);
  const { register, handleSubmit } = useForm();
  const onSubmit = (queryData: OnSubmitData) => {
    const { query } = queryData;
    setQuery(query);
  };
  const {
    data: movieData,
    isLoading: isMovieLoading,
    isError: isMovieError,
  } = useMovieSearch(query);

  const router = useRouter();
  const onPosterClick = (id: number) => {
    router.push(`/movie/${id}`);
  };

  return (
    <div className="pt-16 px-5 bg-slate-800 h-screen text-white overflow-y-scroll">
      <Seo title="Search"></Seo>
      <h1 className="py-2 font-semibold text-2xl ">Search</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("query")}
            type="text"
            className="focus border-0 border-gray-500 bg-transparent w-full h-16 p-2 text-2xl"
            placeholder="Search Movies or TV Shows"
          ></input>
        </form>
      </div>
      {movieData ? (
        <div>
          <h3 className="mt-4 mb-2 text-2xl">Movie Results</h3>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
            {movieData?.map((movie) => (
              <div key={movie.id} onClick={() => onPosterClick(movie.id)}>
                <Poster
                  id={movie.id}
                  title={movie.title}
                  release_date={movie.release_date}
                  vote_average={movie.vote_average}
                  poster_path={movie.poster_path}
                ></Poster>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {tvData ? (
        <div>
          <h3 className="mt-4 mb-2 text-2xl">Tv Shows Results</h3>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
            {tvData?.map((tvShow) => (
              <div key={tvShow.id} onClick={() => onPosterClick(tvShow.id)}>
                <Poster
                  id={tvShow.id}
                  title={tvShow.name}
                  release_date={tvShow.first_air_date}
                  vote_average={tvShow.vote_average}
                  poster_path={tvShow.poster_path}
                ></Poster>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Search;
