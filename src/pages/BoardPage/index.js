import React, { useCallback, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import "./styles.css";
import { firestore } from "../../fbase";
import { Link } from "react-router-dom";
import axios from "axios";

const BoardPage = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [storageLength, setStorageLength] = useState(localStorage.length);
  const [search, setSearch] = useState("");
  const [click, setClick] = useState([]);
  const [posts, setPosts] = useState([]);
  const loadedCoords = localStorage.getItem("coords");
  const parsedCoords = JSON.parse(loadedCoords);
  const lat = parsedCoords.latitude;
  const long = parsedCoords.longitude;
  const [cityName, setCityName] = useState("");
  const [dongName, setDongName] = useState("");
  const [fullName, setfullName] =useState("");

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
  
  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    const key = '30ee4841c133d7b69f5287ba46b3c9f3';
    const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${long}&y=${lat}&input_coord=WGS84`;
    const res = await axios.get(url, {
      headers: { Authorization: "KakaoAK " + key },
    });
    setCityName(res.data.documents[0].address.region_2depth_name);
    setDongName(res.data.documents[0].address.region_3depth_name);
    setfullName(res.data.documents[0].address.region_2depth_name + ' ' +  res.data.documents[0].address.region_3depth_name);
  };

  return (
    <Layout>
      <Header title={"밥 친구 게시판"} />
      <div className="container">
        <div><input className="input" type="text" placeholder="Input title or location...." onChange={(e) => setSearch(e.target.value)}/></div>
        <div>
          <button className="alllocation" onChange={(e)=>setClick(e.target.value)} onClick={()=>{const count = 0; setClick(count);}}>모든 게시글</button>
          <button className="currentlocation" onChange={(e)=>setClick(e.target.value)} onClick={()=>{const count = 1; setClick(count);}}>현재위치게시글</button>
        </div>
        {posts.map((post)=>{
          const full = fullName.toLowerCase().indexOf(search.toLowerCase())>=0;//지역 풀네임(남양주시 와부읍 도곡리)
          const title = post.title.toLowerCase().indexOf(search.toLowerCase())>=0;//게시글 제목
          const city = post.cityName.toLowerCase().indexOf(search.toLowerCase())>=0;//남양주시
          const dong =  post.dongName.toLowerCase().indexOf(search.toLowerCase())>=0;//와부읍 도곡리
          if(click == 0 && (title || full || city || dong)){
            return <Link key={post.id} to={`/board/${post.id}`}> {post.title} </Link>;
          }else if(cityName==post.cityName && (title || full || city || dong)){
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