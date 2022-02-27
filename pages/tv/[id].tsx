import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Seo from "../../components/Seo";
import Loading from "../../components/Loading";

interface TvShowSeason {
  name: string;
  poster_path: string;
}

interface TvShow {
  name: string;
  first_air_date: string;
  genres: [{ id: number; name: string }];
  videos: { results: [{ site: string; key: string }] };
  production_companies: [{ logo_path: string; id: number }];
  production_countries: [{ name: string }];
  seasons: [TvShowSeason];
}

// iso_639_1: "en",
// iso_3166_1: "US",
// name: "Final Trailer",
// key: "3Svs_hl897c",
// site: "YouTube",
// size: 1080,
// type: "Trailer",
// official: true,
// published_at: "2021-10-31T15:00:01.000Z",
// id: "617fcd72c7c224006566cca3"
// },

const TvDetail: NextPage = () => {
  const [tvShow, setTvShow] = useState<TvShow | null>(null);
  const getTvShowDetail = async (id: string) => {
    const response = await fetch(`/api/tv/${id}`);
    const results = await response.json();
    setTvShow(results);
  };

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id !== undefined) {
      getTvShowDetail(id);
    }
  }, [id]);

  return (
    <div>
      <Seo title="Tv Detail"></Seo>
      <h2>Tv Detail</h2>
      {tvShow !== null ? (
        <div>
          <div></div>
          <div>
            <div></div>
            <div>
              <h2>{tvShow.name}</h2>
              <div>
                <span>{tvShow.first_air_date}</span>
                <span>.</span>
                <span></span>
                <span>.</span>
                <span>{tvShow.genres.map((genre) => genre.name)}</span>
              </div>
              <p>description</p>
              {tvShow.videos ? (
                <div>
                  <h3>video links</h3>
                  <ul>
                    {tvShow.videos?.results
                      .filter((item) => item.site == "YouTube")
                      .map((item, idx) => (
                        <Link
                          key={idx}
                          href={`https://www.youtube.com/watch?v=${item.key}`}
                          passHref={true}
                        >
                          <Image
                            alt={`https://img.youtube.com/vi/${item.key}/hqdefault.jpg`}
                            src={`https://img.youtube.com/vi/${item.key}/hqdefault.jpg`}
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
                  {tvShow.production_companies.map((company) =>
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
                  {tvShow.production_countries.map((country, idx) => (
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

export default TvDetail;
