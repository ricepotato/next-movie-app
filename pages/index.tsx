import type { NextPage } from "next";
import Seo from "../components/Seo";

const Home: NextPage = () => {
  return (
    <div>
      <Seo title="Next Movie App"></Seo>
      <h1 className="text-red-400">Hello Next Movie App</h1>
    </div>
  );
};

export default Home;
