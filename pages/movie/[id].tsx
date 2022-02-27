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
  genres: [{ id: number; name: string }];
  videos: { results: [{ site: string; key: string }] };
  production_companies: [{ logo_path: string; id: number }];
  production_countries: [{ name: string }];
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
    <div>
      <Seo title={movie !== null ? movie.title : ""}></Seo>

      {movie !== null ? (
        <div>
          <div></div>
          <div>
            <div></div>
            <div>
              <h2>{movie.title}</h2>
              <div>
                <span>{movie.release_date}</span>
                <span>.</span>
                <span>{movie.runtime}</span>
                <span>.</span>
                <span>{movie.genres.map((genre) => genre.name)}</span>
              </div>
              <p>description</p>
              {movie.videos ? (
                <div>
                  <h3>video links</h3>
                  <ul>
                    {movie.videos?.results
                      .filter((video) => video.site == "YouTube")
                      .map((video, idx) => (
                        <Link
                          key={idx}
                          href={`https://www.youtube.com/watch?v=${video.key}`}
                          passHref={true}
                        >
                          <Image
                            alt={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                            src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                            width={100}
                            height={100}
                          ></Image>
                        </Link>
                      ))}
                  </ul>
                </div>
              ) : null}

              <div>
                <ul>
                  {movie.production_companies.map((company) =>
                    company.logo_path !== null ? (
                      <li key={company.id}>
                        <Image
                          src={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                          alt={`https://image.tmdb.org/t/p/original${company.logo_path}`}
                          width={100}
                          height={100}
                        ></Image>
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
              <div>
                <ul>
                  {movie.production_countries.map((country, idx) => (
                    <li key={idx}>{country.name}</li>
                  ))}
                </ul>
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
