import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

const BoardPage = ({ history }) => {
  return (
    <Layout>
      <Header title={"밥 친구 게시판"} />
      <button onClick={() => history.push("/write")}>작성</button>
    </Layout>
  );
};

export default BoardPage;
