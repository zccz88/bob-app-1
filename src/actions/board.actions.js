import { boardConstants } from "./constants";
import { auth, firestore, firebaseInstance } from "../fbase";

export const addPost = (contents) => {
  return (dispatch) => {
    const currentUser = auth.currentUser;
    const db = firestore;

    db.collection("board")
      .add({
        ...contents,
        owner: currentUser,
        date: new Date(),
      })
      .then(() => {
        dispatch({
          type: `${boardConstants.ADD_POST}_SUCCESS`,
        });
      });
  };
};
