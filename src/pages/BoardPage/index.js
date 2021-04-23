import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import Header from "../../components/Header";

const BoardPage = ({ history }) => {
  let lat;
  let long;

  if (navigator.geolocation) {
    //위치 정보를 얻기
    navigator.geolocation.getCurrentPosition((pos) => {
      lat = pos.coords.latitude; // 위도
      long = pos.coords.longitude; // 경도
    });
  } else {
    alert("이 브라우저에서는 Geolocation이 지원되지 않습니다.");
  }
  console.log(lat, long);
  return (
    <Layout>
      <Header title={"밥 친구 게시판"} />
      <button onClick={() => history.push("/write")}>작성</button>
    </Layout>
  );
};

export default BoardPage;
