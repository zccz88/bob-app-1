import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../actions/board.actions";
import axios from "axios";
import { useParams } from "react-router";
import { firestore } from "../../fbase";

const BoardUpdate = ({history}) => {
  const {boardId}=useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const loadedCoords = localStorage.getItem("coords");
  const parsedCoords = JSON.parse(loadedCoords);
  const lat = parsedCoords.latitude;
  const long = parsedCoords.longitude;
  const [cityName, setCityName] = useState("");
  const [dongName, setDongName] = useState("");
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    const key = '30ee4841c133d7b69f5287ba46b3c9f3';
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
    dispatch(updatePost(contents, boardId));
    history.push('/board');
  };

  const auth = useSelector((state) => state.auth);//정보확인
  //console.log("현재접속자 = "+auth.uid)
  //console.log("작성자 = "+postData.owner);
  
  const link = firestore.collection("board").doc(boardId).id;
  //console.log("보드 = "+link);

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

export default BoardUpdate;
