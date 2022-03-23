import { useRouter } from "next/router";
import Poster, { PosterProps } from "@components/Poster";
import Loading from "@components/Loading";

interface MoviePosterListProps {
  title: string;
  isLoading: boolean;
  posters: PosterProps[] | undefined;
}

const MoviePosterList = ({
  title,
  isLoading,
  posters,
}: MoviePosterListProps) => {
  const router = useRouter();
  const onPosterClick = (id: number) => {
    router.push(`/movie/${id}`);
  };

  return (
    <div>
      <h2 className="py-2 font-semibold text-2xl ">{title}</h2>
      {isLoading && <Loading></Loading>}
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
        {posters?.map((movie: PosterProps) => (
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
        <button className="w-full h-14 bg-slate-500 flex justify-center items-center rounded-md hover:bg-slate-600">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
export default MoviePosterList;
