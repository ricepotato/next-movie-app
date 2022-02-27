import type { NextPage } from "next";
import Seo from "../../components/Seo";

const Movie: NextPage = () => {
  return (
    <div>
      <Seo title="Movies"></Seo>
      <div>
        <h2>Upcomming Movies</h2>
        <ul>
          <li>posters</li>
          <li>posters</li>
        </ul>
      </div>
      <div>
        <h2>Now Playing</h2>
        <ul>
          <li>posters</li>
          <li>posters</li>
        </ul>
      </div>
      <div>
        <h2>Popular Movies</h2>
        <ul>
          <li>posters</li>
          <li>posters</li>
        </ul>
      </div>
    </div>
  );
};

export default Movie;
