import type { NextPage } from "next";

interface Props {
  title: string;
  year: string;
}

const Poster: NextPage<Props> = ({ title, year }) => {
  return (
    <a>
      <div>
        <div>
          <div></div>
          <span>
            <span>⭐️</span> 8.2/10
          </span>
        </div>
        <span>Sing 2</span>
        <span>2021</span>
      </div>
    </a>
  );
};

export default Poster;
