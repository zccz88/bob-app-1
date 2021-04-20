import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions";
import Header from "../../components/Header";
import Layout from "../../components/Layout";

const ProfilePage = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <Layout>
      <Header title={"프로필"} />

      <Button variant="contained" color="secondary" onClick={() => dispatch(logout(auth.uid))}>
        로그아웃
      </Button>
    </Layout>
  );
};

export default ProfilePage;
