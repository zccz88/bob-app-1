import { AppBar, Toolbar } from "@material-ui/core";
import React from "react";
// import { useDispatch, useSelector } from "react-redux";

const Header = ({ title }) => {
  // const auth = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  return (
    <AppBar position="static" style={{ backgroundColor: "#fafafa", color: "#c62828" }}>
      <Toolbar style={{ display: "flex", justifyContent: "center" }}>
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
