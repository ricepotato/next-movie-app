import type { NextPage } from "next";
import NavBar from "./NavBar";

const Layout: NextPage = ({ children }) => {
  return (
    <div>
      <NavBar></NavBar>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
