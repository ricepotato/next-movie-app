import type { NextPage } from "next";
import { useRouter } from "next/router";
import Seo from "../../components/Seo";
import Loading from "../../components/Loading";
import Poster, { PosterProps } from "../../components/Poster";
import { useMovie } from "../../lib/useMovie";

const Movie: NextPage = () => {
  const router = useRouter();
  const onPosterClick = (id: number) => {
    router.push(`/movie/${id}`);
  };

  const {
    movies: upcomingMovies,
    isLoading: isUpcomingLoading,
    isError: isUpcomingError,
  } = useMovie("upcoming");
  const {
    movies: nowPlayingMovies,
    isLoading: isNowPlayingLoading,
    isError: isNowPlayingError,
  } = useMovie("now_playing");

  const {
    movies: popularMovies,
    isLoading: isPopularLoading,
    isError: isPopularError,
  } = useMovie("popular");

  return (
    <div className="pt-16 px-5 bg-slate-800 text-white">
      <Seo title="Movies"></Seo>
      <div>
        <h2 className="py-2 font-semibold text-2xl ">😃 Upcoming Movies</h2>
        {isUpcomingLoading && <Loading></Loading>}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
          {upcomingMovies?.map((movie: PosterProps) => (
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
        {!isNowPlayingLoading && <Loading></Loading>}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
          {nowPlayingMovies?.map((movie: PosterProps) => (
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
        {!isPopularLoading && <Loading></Loading>}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
          {popularMovies?.map((movie: PosterProps) => (
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
