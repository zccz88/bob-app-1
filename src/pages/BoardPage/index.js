import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Header from "../../components/Header";

const BoardPage = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const loadedCoords = localStorage.getItem("coords");
  const [storageLength, setStorageLength] = useState(localStorage.length);

  useEffect(() => {
    if (storageLength === 1) {
      navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
      setIsLoading(true);
    }
    console.log(storageLength);
  }, [storageLength]);

  const saveCoords = (coordsObj) => {
    localStorage.setItem("coords", JSON.stringify(coordsObj));
    setStorageLength((prevLength) => prevLength + 1);
    setIsLoading(false);
  };

  // if (loadedCoords) {
  //   setIsLoading(false);
  // }

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
      {isLoading ? (
        <div>위치 정보 계산중..</div>
      ) : (
        <button onClick={() => history.push("/write")}>작성</button>
      )}
    </Layout>
  );
};

export default BoardPage;
