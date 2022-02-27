import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const active = () =>
  "flex items-center px-2 border-b-2 border-b-orange-500 h-14";

const NavBar: NextPage = () => {
  const router = useRouter();
  return (
    <header className="fixed top-0 left-0 w-full bg-slate-800 z-10 shadow-lg opacity-90">
      <nav className="flex px-10 justify-start text-white text-sm items-center space-x-10 h-14 font-semibold">
        <div className={router.pathname === "/movie" ? active() : ""}>
          <Link href="/movie">Movies</Link>
        </div>
        <div className={router.pathname === "/tv" ? active() : ""}>
          <Link href="/tv">Tv Shows</Link>
        </div>
        <div className={router.pathname === "/search" ? active() : ""}>
          <Link href="/search">Search</Link>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
