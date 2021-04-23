import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import Header from "../../components/Header";

const BoardPage = ({ history }) => {
  const loadedCoords = localStorage.getItem("coords");
  let lat;
  let long;

  useEffect(() => {
    const loadedCoords = localStorage.getItem("coords");

    if (loadedCoords === null) {
      navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
    } else {
      const parsedCoords = JSON.parse(loadedCoords);
      console.log(parsedCoords);
    }
  }, []);

  const saveCoords = (coordsObj) => {
    localStorage.setItem("coords", JSON.stringify(coordsObj));
  };

  const handleGeoSuccess = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
      latitude,
      longitude,
    };
    saveCoords(coordsObj);
  };

  const handleGeoError = () => {
    alert("위치 정보를 얻어오는 데 실패했습니다.");
  };

  return (
    <Layout>
      <Header title={"밥 친구 게시판"} />
      <button onClick={() => history.push("/write")}>작성</button>
    </Layout>
  );
};

export default BoardPage;
