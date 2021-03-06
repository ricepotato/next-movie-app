import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";

export interface PosterProps {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
}

const Poster: NextPage<PosterProps> = ({
  id,
  title,
  release_date,
  vote_average,
  poster_path,
}) => {
  const [src, setSrc] = useState(
    `https://image.tmdb.org/t/p/w300${poster_path}`
  );
  return (
    <div className="cursor-pointer">
      <div className="relative w-full h-72">
        <Image
          className="rounded-md object-cover shadow-lg"
          alt={src}
          src={src}
          placeholder="blur"
          blurDataURL="image-blur-placeholder.png"
          onError={() => setSrc("/image-blur-placeholder.png")}
          layout="fill"
        ></Image>
      </div>
      <div className="mt-2 flex justify-between">
        <div>
          <span className="block text-sm font-semibold">{title}</span>
          <span className="block text-xs text-gray-300">{release_date}</span>
        </div>
        <span className="text-sm">⭐️{vote_average}/10</span>
      </div>
    </div>
  );
};

export default Poster;
