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
    <div>
      <Seo title="Movies"></Seo>
      <div>
        <h2>Upcomming Movies</h2>
        {!upcommingMovies && <Loading></Loading>}
        <div>
          {upcommingMovies?.map((movie: PosterProps, idx) => (
            <div key={movie.id} onClick={() => onPosterClick(movie.id)}>
              <Poster
                id={movie.id}
                title={movie.title}
                release_date={movie.release_date}
                vote_average={movie.vote_average}
              ></Poster>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>Now Playing</h2>
        {!nowPlayingMovies && <Loading></Loading>}
        <div>
          {nowPlayingMovies?.map((movie: PosterProps, idx) => (
            <div key={movie.id} onClick={() => onPosterClick(movie.id)}>
              <Poster
                id={movie.id}
                title={movie.title}
                release_date={movie.release_date}
                vote_average={movie.vote_average}
              ></Poster>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>Popular Movies</h2>
        {!popularMovies && <Loading></Loading>}
        <div>
          {popularMovies?.map((movie: PosterProps, idx) => (
            <div key={movie.id} onClick={() => onPosterClick(movie.id)}>
              <Poster
                id={movie.id}
                title={movie.title}
                release_date={movie.release_date}
                vote_average={movie.vote_average}
              ></Poster>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movie;
