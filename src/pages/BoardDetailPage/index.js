import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Layout from "../../components/Layout";
import { firestore } from "../../fbase";

const BoardDetailPage = () => {
  const { boardId } = useParams();
  console.log(boardId);
  const [postData, setPostData] = useState({});

  const getPostData = useCallback(async () => {
    const db = await firestore.collection("board").doc(boardId);
    db.get()
      .then((doc) => {
        if (doc.exists) {
          setPostData(doc.data());
          console.log(postData);
        } else {
          alert("존재하지 않는 게시물입니다.");
        }
      })
      .catch((error) => {
        alert("게시글 조회에 실패했습니다.");
      });
  }, [boardId, postData]);

  useEffect(() => {
    getPostData();
    return () => setPostData({});
  }, []);

  return (
    <Layout>
      <h1>{postData.title}</h1>
    </Layout>
  );
};

export default BoardDetailPage;
