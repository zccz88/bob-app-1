import React, { useEffect } from "react";
import { firestore } from "../../fbase";

const Posts = () => {
  const getPosts = async () => {
    const db = await firestore.collection("board").get();
    console.log(db);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return <div>post</div>;
};

export default Posts;
