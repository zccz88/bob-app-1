import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { addPost } from "../../actions/board.actions";
// import useLocalStorage from "../../hooks/useLocalStorage";
import axios from "axios";

const BoardWritePage = () => {
  const { kakao } = window;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const loadedCoords = localStorage.getItem("coords");
  const parsedCoords = JSON.parse(loadedCoords);
  const lat = parsedCoords.latitude;
  const long = parsedCoords.longitude;
  const [cityName, setCityName] = useState("");
  const [dongName, setDongName] = useState("");

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    const key = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${long}&y=${lat}&input_coord=WGS84`;
    const res = await axios.get(url, {
      headers: { Authorization: "KakaoAK " + key },
    });
    // console.log(res.data);
    // console.log(res.data.documents[0].address.region_2depth_name);
    // console.log(res.data.documents[0].address.region_3depth_name);
    // console.log(url);
    setCityName(res.data.documents[0].address.region_2depth_name);
    setDongName(res.data.documents[0].address.region_3depth_name);
  };

  const dispatch = useDispatch();

  const onSubmitWriteForm = (e) => {
    e.preventDefault();
    const contents = {
      title,
      content,
      lat,
      long,
      cityName,
      dongName,
    };
    console.log(lat, long);
    dispatch(addPost(contents));
  };
  return (
    <form onSubmit={onSubmitWriteForm}>
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="컨텐츠"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">작성</button>
    </form>
  );
};

export default BoardWritePage;
