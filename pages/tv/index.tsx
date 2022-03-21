import type { NextPage } from "next";
import { useRouter } from "next/router";
import Loading from "../../components/Loading";
import Seo from "../../components/Seo";
import Poster from "../../components/Poster";
import { useTv, TvShowProps } from "../../lib/useTv";

const Tv: NextPage = () => {
  const {
    tvShows: ratedShows,
    isLoading: isRatedShowLoading,
    isError: isRatedShow,
  } = useTv("top_rated");

  const {
    tvShows: popularShows,
    isLoading: isPopularShowsLoading,
    isError: isPopularShows,
  } = useTv("popular");

  const {
    tvShows: airingShows,
    isLoading: isAiringShowsLoading,
    isError: isAiringShows,
  } = useTv("airing_today");

  const router = useRouter();
  const onPosterClick = (id: number) => {
    router.push(`/tv/${id}`);
  };

  return (
    <div className="pt-16 px-5 bg-slate-800 text-white">
      <Seo title="Tv shows"></Seo>
      <div>
        <h2 className="py-2 font-semibold text-2xl ">😃 Top Rated Shows</h2>
        {isRatedShowLoading && <Loading></Loading>}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
          {ratedShows?.map((tvShow) => (
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
        {isPopularShowsLoading && <Loading></Loading>}
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
        {isAiringShowsLoading && <Loading></Loading>}
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
