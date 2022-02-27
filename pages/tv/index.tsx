import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "../../components/Loading";
import Seo from "../../components/Seo";
import Poster, { PosterProps } from "../../components/Poster";

export interface TvShowProps {
  id: number;
  name: string;
  first_air_date: string;
  vote_average: number;
  poster_path: string;
}

interface setTvShowFunction {
  (results: any): void;
}

const Tv: NextPage = () => {
  const [ratedShows, setRatedShows] = useState([]);
  const [popularShows, setPopularShows] = useState([]);
  const [airingShows, setAiringShows] = useState([]);
  const router = useRouter();
  const onPosterClick = (id: number) => {
    router.push(`/tv/${id}`);
  };

  const getRatedShows = () => getTvShowTmpl("/api/tv/top_rated", setRatedShows);
  const getPopularShows = () =>
    getTvShowTmpl("/api/tv/popular", setPopularShows);
  const getAiringShows = () =>
    getTvShowTmpl("/api/tv/airing_today", setAiringShows);

  const getTvShowTmpl = async (url: string, cb: setTvShowFunction) => {
    const response = await fetch(url);
    const { results } = await response.json();
    cb(results);
  };

  useEffect(() => {
    getRatedShows();
    getPopularShows();
    getAiringShows();
  }, []);

  return (
    <div className="pt-16 px-5 bg-slate-800 text-white">
      <Seo title="Tv shows"></Seo>
      <div>
        <h2 className="py-2 font-semibold text-2xl ">😃 Top Rated Shows</h2>
        {!ratedShows && <Loading></Loading>}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
          {ratedShows?.map((tvShow: TvShowProps, idx) => (
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
      <div>
        <h2 className="py-2 mt-5 font-semibold text-2xl">😍 Popular Shows</h2>
        {!popularShows && <Loading></Loading>}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
          {popularShows?.map((tvShow: TvShowProps, idx) => (
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
      <div>
        <h2 className="py-2 mt-5 font-semibold text-2xl">
          😁 Airing Tody Shows
        </h2>
        {!airingShows && <Loading></Loading>}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
          {airingShows?.map((tvShow: TvShowProps, idx) => (
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
    </div>
  );
};

export default Tv;
