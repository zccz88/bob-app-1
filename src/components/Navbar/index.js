import React from "react";
import { Link, useParams } from "react-router-dom";
import "./style.css";

const Navbar = () => {
  const { path } = useParams();
  console.log(path);
  return (
    <nav class="nav">
      <Link to="/board" class="nav__link">
        <i class="material-icons nav__icon">dashboard</i>
        <span class="nav__text">게시판</span>
      </Link>
      <Link to="/chatlist" class="nav__link">
        <i class="material-icons nav__icon">devices</i>
        <span class="nav__text">채팅목록</span>
      </Link>
      <Link to="/profile" class="nav__link">
        <i class="material-icons nav__icon">person</i>
        <span class="nav__text">프로필</span>
      </Link>
    </nav>
  );
};

export default Navbar;
