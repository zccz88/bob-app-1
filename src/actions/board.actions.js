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

export const getList = () => {
  return (dispatch) => {};
};
