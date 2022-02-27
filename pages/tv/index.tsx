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
    <div>
      <Seo title="Tvs"></Seo>
      <div>
        <h2>Top Rated Shows</h2>
        {!ratedShows && <Loading></Loading>}
        <div>
          {ratedShows?.map((tvShow: TvShowProps, idx) => (
            <div key={tvShow.id} onClick={() => onPosterClick(tvShow.id)}>
              <Poster
                id={tvShow.id}
                title={tvShow.name}
                release_date={tvShow.first_air_date}
                vote_average={tvShow.vote_average}
              ></Poster>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>Popular Shows</h2>
        {!popularShows && <Loading></Loading>}
        <div>
          {popularShows?.map((tvShow: TvShowProps, idx) => (
            <div key={tvShow.id} onClick={() => onPosterClick(tvShow.id)}>
              <Poster
                id={tvShow.id}
                title={tvShow.name}
                release_date={tvShow.first_air_date}
                vote_average={tvShow.vote_average}
              ></Poster>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2>Airing Tody Shows</h2>
        {!airingShows && <Loading></Loading>}
        <div>
          {airingShows?.map((tvShow: TvShowProps, idx) => (
            <div key={tvShow.id} onClick={() => onPosterClick(tvShow.id)}>
              <Poster
                id={tvShow.id}
                title={tvShow.name}
                release_date={tvShow.first_air_date}
                vote_average={tvShow.vote_average}
              ></Poster>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tv;
