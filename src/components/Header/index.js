import { AppBar, IconButton, Toolbar, MenuIcon, Typography, Button } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
// import "./style.css";
import { logout } from "../../actions";

const Header = ({ title }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <AppBar position="static">
      <Toolbar color="inherit">
        <h2 className="title">{title}</h2>
      </Toolbar>
    </AppBar>
  );

  // return (
  //   <header className="header">
  //     <div style={{ display: "flex" }}>
  //       <div className="logo">Web Messenger</div>
  //       {!auth.authenticated ? (
  //         <ul className="leftMenu">
  //           <li>
  //             <NavLink to={"/login"}>Login</NavLink>
  //           </li>
  //           <li>
  //             <NavLink to={"/signup"}>Sign up</NavLink>
  //           </li>
  //         </ul>
  //       ) : null}
  //     </div>
  //     <div style={{ margin: "20px 0", color: "#fff", fontWeight: "bold" }}>
  //       {auth.authenticated ? `Hi ${auth.firstName} ${auth.lastName}` : ""}
  //     </div>
  //     <ul className="menu">
  //       {auth.authenticated ? (
  //         <li>
  //           <Link to={"#"} onClick={() => dispatch(logout(auth.uid))}>
  //             Logout
  //           </Link>
  //         </li>
  //       ) : null}
  //     </ul>
  //   </header>
  // );
};

export default Header;
