import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Seo from "../../components/Seo";
import Loading from "../../components/Loading";
import { useMovieDetail, MovieDetail } from "../../lib/useMovie";

const MovieDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { movie, isLoading, isError } = useMovieDetail(id);

  return (
    <div className="h-screen bg-slate-800">
      <div className="w-full h-full relative">
        <Image
          alt={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          layout="fill"
          className="object-cover blur-sm opacity-50 pointer-events-none z-0"
        ></Image>
      </div>
      <Seo title={movie !== undefined ? movie.title : ""}></Seo>
      {movie !== undefined ? (
        <div className="absolute top-0 left-0 w-full px-5 pt-16 overflow-y-scroll">
          <div className="h-[calc(100vh_-_100px)] md:w-full block md:space-x-4 md:flex">
            <div className="relative h-64 md:h-full md:w-1/3">
              <Image
                alt={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
                src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
                layout="fill"
                className="object-cover rounded-lg shadow-lg"
              ></Image>
            </div>
            <div className="h-full md:w-2/3 z-5 text-white">
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
                    <ul className="mt-2 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full">
                      {movie.videos?.results
                        .filter((video) => video.site == "YouTube")
                        .map((video, idx) => (
                          <Link
                            key={idx}
                            href={`https://www.youtube.com/watch?v=${video.key}`}
                            passHref={true}
                          >
                            <div className="relative w-full h-32 cursor-pointer">
                              <Image
                                alt={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                                src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                                layout="fill"
                                className="object-cover md:object-scale-down rounded-lg"
                                placeholder="blur"
                                blurDataURL="/assets/image-blur-placeholder.png"
                              ></Image>
                            </div>
                          </Link>
                        ))}
                    </ul>
                  </div>
                ) : null}

                <div>
                  <h3 className="mt-5 text-xl">Productions</h3>
                  <ul className="mt-2 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
