import type { NextPage } from "next";
import Link from "next/link";

export interface PosterProps {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
}

const Poster: NextPage<PosterProps> = ({
  id,
  title,
  release_date,
  vote_average,
}) => {
  return (
    <Link href={`/movie/${id}`} passHref={true}>
      <div>
        <div>
          <div></div>
          <span>
            <span>⭐️</span> {vote_average}/10
          </span>
        </div>
        <span>{title}</span>
        <span>{release_date}</span>
      </div>
    </Link>
  );
};

export default Poster;
