import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import gravatar from "gravatar";
import "./style.css";

const ProfilePage = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  console.log(auth);

  return (
    <Layout>
      <Header title={"프로필"} />
      <section className="user-info">
        <div className="user-image">
          <img
            src={gravatar.url(auth.email, { s: "72px", d: "retro" })}
            alt={auth.firstName + auth.lastName}
          />
        </div>
        <div className="user-data">
          <b className="email">이메일: {auth.email}</b>
          <span>이름: {auth.firstName + auth.lastName}</span>
        </div>
      </section>
      <section className="account">
        <h3>계정</h3>
        <Link to="/changepassword">비밀번호 변경</Link>
        <Link to="/deleteuser">회원 탈퇴</Link>
      </section>
      <div className="buttons">
        <button className="btn btn-logout" onClick={() => dispatch(logout(auth.uid))}>
          <h3>로그아웃</h3>
        </button>
      </div>
    </Layout>
  );
};

export default ProfilePage;
