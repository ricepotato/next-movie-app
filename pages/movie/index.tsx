import type { NextPage } from "next";
import Seo from "@components/Seo";
import { useMovie } from "@libs/useMovie";
import PosterList from "@components/PosterList";

const Movie: NextPage = () => {
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
    <div className="pt-16 pb-5 px-5 bg-slate-800 text-white">
      <Seo title="Movies"></Seo>
      <PosterList
        title={"😃 Upcoming Movies"}
        isLoading={isUpcomingLoading}
        posters={upcomingMovies}
      ></PosterList>
      <PosterList
        title={"😊 Now Playing"}
        isLoading={isNowPlayingLoading}
        posters={nowPlayingMovies}
      ></PosterList>
      <PosterList
        title={"😍 Popular Movies"}
        isLoading={isPopularLoading}
        posters={popularMovies}
      ></PosterList>
    </div>
  );
};

export default Movie;
