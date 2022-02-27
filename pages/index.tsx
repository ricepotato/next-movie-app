import type { NextPage } from "next";
import Seo from "../components/Seo";

const Home: NextPage = () => {
  return (
    <div className="pt-16 px-5 bg-slate-800 h-screen text-white">
      <Seo title="Next Movie App"></Seo>
      <h1 className="text-2xl font-semibold">Hello! Next Movie App 😀</h1>
    </div>
  );
};

export default Home;
