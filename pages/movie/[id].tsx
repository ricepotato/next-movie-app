import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Seo from "../../components/Seo";
import Loading from "../../components/Loading";

interface Movie {
  title: string;
  release_date: string;
  runtime: number;
  overview: string;
  genres: [{ id: number; name: string }];
  videos: { results: [{ site: string; key: string }] };
  production_companies: [{ logo_path: string; id: number }];
  production_countries: [{ name: string }];
  backdrop_path: string;
  poster_path: string;
}

const MovieDetail: NextPage = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const getMovieDetail = async (id: string) => {
    const response = await fetch(`/api/movies/${id}`);
    const results = await response.json();
    setMovie(results);
  };

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id !== undefined) {
      getMovieDetail(id);
    }
  }, [id]);

  return (
    <div className="relative pt-20 px-5 h-screen bg-slate-800">
      <Seo title={movie !== null ? movie.title : ""}></Seo>
      {movie !== null ? (
        <div className="">
          <Image
            alt={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
            src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
            layout="fill"
            className="object-cover blur-sm opacity-50 pointer-events-none z-0"
          ></Image>
          <div className="h-[calc(100vh_-_100px)] w-full flex space-x-4">
            <div className="relative h-full w-1/3">
              <Image
                alt={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
                src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
                layout="fill"
                className="object-cover rounded-lg shadow-lg"
              ></Image>
            </div>
            <div className="h-full w-2/3 z-20 text-white">
              <div>
                <h2 className="text-2xl font-semibold">{movie.title}</h2>
                <div className="mt-2 text-sm flex space-x-2">
                  <span className="block">{movie.release_date}</span>
                  <span className="block">.</span>
                  <span className="block">{movie.runtime} min</span>
                  <span className="block">.</span>
                  <span className="block">
                    {movie.genres.map((genre) => genre.name).join(" ")}
                  </span>
                </div>
                <p className="mt-5 text-sm">{movie.overview}</p>
                {movie.videos ? (
                  <div>
                    <h3 className="mt-5 text-xl">YouTube links</h3>
                    <ul className="mt-2 flex space-x-2">
                      {movie.videos?.results
                        .filter((video) => video.site == "YouTube")
                        .map((video, idx) => (
                          <Link
                            key={idx}
                            href={`https://www.youtube.com/watch?v=${video.key}`}
                            passHref={true}
                          >
                            <div className="relative h-40 w-40 cursor-pointer">
                              <Image
                                alt={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                                src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                                layout="fill"
                                className="object-cover"
                              ></Image>
                            </div>
                          </Link>
                        ))}
                    </ul>
                  </div>
                ) : null}

                <div>
                  <h3 className="mt-5 text-xl">Productions</h3>
                  <ul className="flex mt-2 space-x-2">
                    {movie.production_companies.map((company) =>
                      company.logo_path !== null ? (
                        <li key={company.id}>
                          <div className="h-28 w-40 bg-gray-300 p-2 rounded-sm">
                            <div className="relative w-full h-full">
                              <Image
                                src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                                alt={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                                layout="fill"
                                className="object-scale-down"
                              ></Image>
                            </div>
                          </div>
                        </li>
                      ) : null
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="mt-5 text-xl">Countries</h3>
                  <ul>
                    {movie.production_countries.map((country, idx) => (
                      <li key={idx}>{country.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading></Loading>
      )}
    </div>
  );
};

export default MovieDetail;
