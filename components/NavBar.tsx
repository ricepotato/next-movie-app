import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const NavBar: NextPage = () => {
  const router = useRouter();
  return (
    <nav>
      <div>
        <Link href="/movie">
          <a className={router.pathname === "/movie" ? "active" : ""}>Movie</a>
        </Link>
        <Link href="/tv">
          <a className={router.pathname === "/tv" ? "active" : ""}>Tv</a>
        </Link>
        <Link href="/search">
          <a className={router.pathname === "/search" ? "active" : ""}>
            Search
          </a>
        </Link>
      </div>

      <style jsx>{`
        a {
          text-decoration: none;
        }
        nav {
          display: flex;
          gap: 10px;
          flex-direction: column;
          align-items: center;
          padding-top: 20px;
          padding-bottom: 10px;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
            rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
        }
        img {
          max-width: 100px;
          margin-bottom: 5px;
        }
        nav a {
          font-weight: 600;
          font-size: 18px;
        }
        .active {
          color: tomato;
        }
        nav div {
          display: flex;
          gap: 10px;
        }
      `}</style>
    </nav>
  );
};

export default NavBar;
