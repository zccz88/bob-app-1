import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import "./styles.css";
import { firestore } from "../../fbase";
import { Link } from "react-router-dom";
import { SearchSharp } from "@material-ui/icons";

const BoardPage = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [storageLength, setStorageLength] = useState(localStorage.length);
  const [search, setSearch] = useState("");
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
        <input type="text" placeholder="Input title or location..." onChange={(e) => setSearch(e.target.value)}/>
        {posts.map((post)=>{
          if(search==""){
            return <Link key={post.id} to={`/board/${post.id}`}> {post.title} </Link>;
          }else if
          (
           post.title.toLowerCase().indexOf(search.toLowerCase())>=0
           ||
           post.cityName.toLowerCase().indexOf(search.toLowerCase())>=0
           ||
           post.dongName.toLowerCase().indexOf(search.toLowerCase())>=0
           ){
            return <Link key={post.id} to={`/board/${post.id}`}> {post.title} </Link>;
          }
        })}
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
/*
          if(search == ""){
            return <Link key={post.id} to={`/board/${post.id}`}> {post.title} </Link>;
          }else if(search == post.title || search == post.cityName || search == post.dongName){
            return <Link key={post.id} to={`/board/${post.id}`}> {post.title} </Link>;
          }
*/
/*
          if(search==""){
            return post.title
          }else if(post.title.indexOf(search)>=0){
            return post.title
          }
*/