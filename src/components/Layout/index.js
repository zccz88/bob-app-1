import React from "react";
import Navbar from "../Navbar";

const Layout = (props) => {
  return (
    <div>
      {props.children}
      <Navbar />
    </div>
  );
};

export default Layout;
