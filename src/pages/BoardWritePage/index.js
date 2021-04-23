import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { addPost } from "../../actions/board.actions";

const BoardWritePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const onSubmitWriteForm = (e) => {
    e.preventDefault();
    const contents = {
      title,
      content,
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
