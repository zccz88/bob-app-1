import { AppBar, Toolbar } from "@material-ui/core";
import React from "react";

const Header = ({ title }) => {
  return (
    <AppBar position="static" style={{ backgroundColor: "#fafafa", color: "#c62828" }}>
      <Toolbar style={{ display: "flex", justifyContent: "center" }}>
        <h2 className="title">{title}</h2>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
