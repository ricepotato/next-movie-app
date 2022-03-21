import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Seo from "../../components/Seo";
import Loading from "../../components/Loading";
import { useTvDetail } from "../../lib/useTv";

const TvDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { tvShow, isLoading, isError } = useTvDetail(id);

  return (
    <div className="h-screen bg-slate-800">
      <div className="w-full h-full relative">
        <Image
          alt={`https://image.tmdb.org/t/p/original/${tvShow?.backdrop_path}`}
          src={`https://image.tmdb.org/t/p/original/${tvShow?.backdrop_path}`}
          layout="fill"
          className="object-cover blur-sm opacity-50 pointer-events-none z-0"
        ></Image>
      </div>
      <Seo title={tvShow ? tvShow.name : ""}></Seo>
      {tvShow !== undefined ? (
        <div className="absolute top-0 left-0 w-full px-5 pt-16 overflow-y-scroll">
          <div className="h-[calc(100vh_-_100px)] md:w-full block md:space-x-4 md:flex">
            <div className="relative h-64 md:h-full md:w-1/3">
              <Image
                alt={`https://image.tmdb.org/t/p/original${tvShow?.poster_path}`}
                src={`https://image.tmdb.org/t/p/original${tvShow?.poster_path}`}
                layout="fill"
                className="object-cover rounded-lg shadow-lg"
              ></Image>
            </div>
            <div className="h-full md:w-2/3 z-20 text-white">
              <h2 className="mt-2 md:mt-0 text-2xl font-semibold">
                {tvShow.name}
              </h2>
              <div className="mt-2 text-sm flex space-x-2">
                <span className="block">{tvShow.first_air_date}</span>
                <span className="block">.</span>
                <span className="block">
                  {tvShow.genres?.map((genre) => genre.name)}
                </span>
              </div>
              <p className="mt-5 text-sm">{tvShow.overview}</p>
              <div>
                <h3 className="mt-5 text-xl">Seasons</h3>
                <ul className="mt-2 grid gap-4 grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full">
                  {tvShow.seasons?.map((season, idx) => (
                    <div key={idx}>
                      <h3>{season.name}</h3>
                      <div className="relative w-full h-64">
                        <Image
                          alt={`https://image.tmdb.org/t/p/w300${season.poster_path}`}
                          src={`https://image.tmdb.org/t/p/w300${season.poster_path}`}
                          layout="fill"
                          className="object-cover"
                          placeholder="blur"
                          blurDataURL="/assets/image-blur-placeholder.png"
                        ></Image>
                      </div>
                    </div>
                  ))}
                </ul>
              </div>
              {tvShow.videos ? (
                <div>
                  <h3 className="mt-5 text-xl">YouTube links</h3>
                  <ul className="mt-2 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full">
                    {tvShow.videos?.results
                      .filter((item) => item.site == "YouTube")
                      .map((item, idx) => (
                        <Link
                          key={idx}
                          href={`https://www.youtube.com/watch?v=${item.key}`}
                          passHref={true}
                        >
                          <div className="relative w-full h-32 cursor-pointer">
                            <Image
                              alt={`https://img.youtube.com/vi/${item.key}/hqdefault.jpg`}
                              src={`https://img.youtube.com/vi/${item.key}/hqdefault.jpg`}
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
                  {tvShow.production_companies.map((company) =>
                    company.logo_path !== null ? (
                      <li key={company.id}>
                        <div className="h-12 w-full bg-gray-300 p-2 rounded-sm">
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
