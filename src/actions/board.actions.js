import { boardConstants } from "./constants";
import { auth, firestore, firebaseInstance } from "../fbase";

export const addPost = (contents) => {
  return (dispatch) => {
    const currentUser = auth.currentUser;
    const db = firestore;
    console.log(currentUser);

    db.collection("board")
      .add({
        ...contents,
        owner: currentUser.uid,
        date: new Date(),
      })
      .then((data) => {
        dispatch({
          type: `${boardConstants.ADD_POST}_SUCCESS`,
        });
        console.log("게시글 등록", data);
      })
      .catch(() => {
        dispatch({
          type: `${boardConstants.ADD_POST}_FAILURE`,
        });
      });
  };
};

export const getPostList = () => {
  return (dispatch) => {
    const db = firestore;
    db.collection("board")
      .get()
      .then((querySnapshot) => {
        const posts = [];
        querySnapshot.forEach((document) => {
          const postObj = {
            ...document.data(),
            id: document.id,
          };
          posts.push(postObj);
        });
        dispatch({
          type: `${boardConstants.GET_POST}_SUCCESS`,
        });
      })
      .catch((error) => {
        dispatch({
          type: `${boardConstants.GET_POST}_FAILURE`,
        });
      });
  };
};
