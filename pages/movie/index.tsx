import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Seo from "../../components/Seo";
import Loading from "../../components/Loading";
import Poster, { PosterProps } from "../../components/Poster";

interface setMovieFunction {
  (results: any): void;
}

const Movie: NextPage = () => {
  const [upcommingMovies, setUpcommiongMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const router = useRouter();
  const onPosterClick = (id: number) => {
    router.push(`/movie/${id}`);
  };

  const getUpcomingMovies = () =>
    getMovieTmpl(`/api/movies/upcoming`, setUpcommiongMovies);
  const getPopularMovies = () =>
    getMovieTmpl(`/api/movies/popular`, setPopularMovies);
  const getNowPlayingMovies = () =>
    getMovieTmpl(`/api/movies/now_playing`, setNowPlayingMovies);

  const getMovieTmpl = async (url: string, cb: setMovieFunction) => {
    const response = await fetch(url);
    const { results } = await response.json();
    cb(results);
  };

  useEffect(() => {
    getUpcomingMovies();
    getPopularMovies();
    getNowPlayingMovies();
  }, []);
  return (
    <div className="pt-16 px-5 bg-slate-800 text-white">
      <Seo title="Movies"></Seo>
      <div>
        <h2 className="py-2 font-semibold text-2xl ">😃 Upcoming Movies</h2>
        {!upcommingMovies && <Loading></Loading>}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
          {upcommingMovies?.map((movie: PosterProps, idx) => (
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
      <div>
        <h2 className="py-2 mt-5 font-semibold text-2xl">😊 Now Playing</h2>
        {!nowPlayingMovies && <Loading></Loading>}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
          {nowPlayingMovies?.map((movie: PosterProps, idx) => (
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
      <div>
        <h2 className="py-2 mt-5 font-semibold text-2xl">😍 Popular Movies</h2>
        {!popularMovies && <Loading></Loading>}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
          {popularMovies?.map((movie: PosterProps, idx) => (
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
    </div>
  );
};

export default Movie;
