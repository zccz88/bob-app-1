import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import "./styles.css";
import { firestore } from "../../fbase";
import { Link } from "react-router-dom";

const BoardPage = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [storageLength, setStorageLength] = useState(localStorage.length);
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const db = await firestore.collection("board").get();
    db.forEach((document) => {
      const postObj = {
        ...document.data(),
        id: document.id,
      };
      setPosts((prev) => [postObj, ...prev]);
    });
  };

  useEffect(() => {
    getPosts();
    return () => setPosts([]);
  }, [setPosts]);

  const saveCoords = (coordsObj) => {
    localStorage.setItem("coords", JSON.stringify(coordsObj));
    setStorageLength((prevLength) => prevLength + 1);
    setIsLoading(false);
  };

  const handleGeoSuccess = useCallback((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
      latitude,
      longitude,
    };
    saveCoords(coordsObj);
  }, []);

  const handleGeoError = () => {
    alert("위치 정보를 얻어오는 데 실패했습니다.");
  };

  useEffect(() => {
    if (storageLength === 1) {
      navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
      setIsLoading(true);
    }
    console.log(storageLength);
    return () => setIsLoading(false);
  }, [storageLength, handleGeoSuccess]);

  return (
    <Layout>
      <Header title={"밥 친구 게시판"} />
      <div className="container">
        {posts.map((post) => (
          <Link key={post.id} to={`/board/${post.id}`}>
            {post.title}
          </Link>
        ))}
        <div className="buttons">
          {isLoading ? (
            <div className="fix">위치 정보 계산중</div>
          ) : (
            <button className="fix btn-write" onClick={() => history.push("/write")}>
              작성
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BoardPage;
