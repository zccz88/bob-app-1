import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { addPost } from "../../actions/board.actions";
import { getLocation } from "../../utils/getLocation";

const BoardWritePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  let lat;
  let long;
  useEffect(() => {
    if (navigator.geolocation) {
      //위치 정보를 얻기
      navigator.geolocation.getCurrentPosition((pos) => {
        lat = pos.coords.latitude; // 위도
        long = pos.coords.longitude; // 경도
      });
      console.log(lat, long);
    } else {
      alert("이 브라우저에서는 Geolocation이 지원되지 않습니다.");
    }
  });

  const dispatch = useDispatch();

  const onSubmitWriteForm = (e) => {
    e.preventDefault();
    const contents = {
      title,
      content,
      lat,
      long,
    };
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
