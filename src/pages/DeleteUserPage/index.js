import React from "react";
import { deleteAccount } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";

const DeleteUserPage = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  if (!auth.authenticated) {
    return <Redirect to="/login" />;
  }

  const onDeleteUser = () => {
    dispatch(deleteAccount(auth.uid));
  };

  return <button onClick={onDeleteUser}>회원 탈퇴</button>;
};

export default DeleteUserPage;
