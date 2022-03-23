import type { NextPage } from "next";
import { useRouter } from "next/router";
import Seo from "@components/Seo";
import { useTv } from "@libs/useTv";
import TvPosterList from "@components/TvPosterList";

const Tv: NextPage = () => {
  const {
    tvShows: ratedShows,
    isLoading: isRatedShowLoading,
    isError: isRatedShowError,
  } = useTv("top_rated");

  const {
    tvShows: popularShows,
    isLoading: isPopularShowsLoading,
    isError: isPopularShowsError,
  } = useTv("popular");

  const {
    tvShows: airingShows,
    isLoading: isAiringShowsLoading,
    isError: isAiringShowsError,
  } = useTv("airing_today");

  return (
    <div className="pt-16 pb-5 px-5 bg-slate-800 text-white">
      <Seo title="Tv shows"></Seo>
      <TvPosterList
        title={"😃 Top Rated Shows"}
        posters={ratedShows}
        isLoading={isRatedShowLoading}
      />
      <TvPosterList
        title={"😍 Popular Shows"}
        posters={popularShows}
        isLoading={isPopularShowsLoading}
      />
      <TvPosterList
        title={"😁 Airing Tody Shows"}
        posters={airingShows}
        isLoading={isAiringShowsLoading}
      />
    </div>
  );
};

export default Tv;
