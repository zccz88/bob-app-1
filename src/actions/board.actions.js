import { boardConstants } from "./constants";
import { auth, firestore, firebaseInstance } from "../fbase";

const getToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (1 + date.getMonth())).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

  return year + month + day + " " + hours + ":" + minutes + ":" + seconds;
}

export const addPost = (contents) => {
  return (dispatch) => {
    const currentUser = auth.currentUser;
    const db = firestore;
    console.log(currentUser.uid);

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

export const addComment = (comments) => {
  return (dispatch) => {
    const currentUser = auth.currentUser;
    const db = firestore;
    console.log(currentUser.uid);

    db.collection("comment")
      .add({
        ...comments,
        owner: currentUser.uid,
        date: getToday(),
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

export const updatePost = (contents, boardId) => {
  return (dispatch) => {
    const currentUser = auth.currentUser;
    const db = firestore;
    console.log(currentUser.uid);

    db.collection("board").doc(boardId)
      .update({
        ...contents,
        owner: currentUser.uid,
        date: new Date(),
      })
      .then((data) => {
        dispatch({
          type: `${boardConstants.UPDATE_POST}_SUCCESS`,
        });
        console.log("게시글 등록", data);
      })
      .catch(() => {
        dispatch({
          type: `${boardConstants.UPDATE_POST}_FAILURE`,
        });
      });
  };
};