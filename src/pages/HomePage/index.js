import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getRealtimeUsers,
  updateMessage,
  getRealtimeConversations,
} from "../../actions/user.actions";
import Layout from "../../components/Layout";
import "./style.css";

// const User = ({ user, onClick }) => {
//   return (
//     <div onClick={() => onClick(user)} className="displayName">
//       <div className="displayPic">
//         <img
//           src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg"
//           alt=""
//         />
//       </div>
//       <div
//         style={{
//           display: "flex",
//           flex: 1,
//           justifyContent: "space-between",
//           margin: "0 10px",
//         }}
//       >
//         <span style={{ fontWeight: 500 }}>
//           {user.firstName} {user.lastName}
//         </span>
//         <span className={user.isOnline ? `onlineStatus` : `onlineStatus off`}></span>
//       </div>
//     </div>
//   );
// };

const HomePage = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState("");
  const [message, setMessage] = useState("");
  const [userUid, setUserUid] = useState(null);
  let unsubscribe = useRef();

  useEffect(() => {
    unsubscribe.current = dispatch(getRealtimeUsers(auth.uid))
      .then((unsubscribe) => {
        return unsubscribe;
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    return () => {
      unsubscribe.current.then((f) => f()).catch((error) => console.log(error));
    };
  }, []);

  const initChat = (user) => {
    setChatStarted(true);
    setChatUser(`${user.firstName} ${user.lastName}`);
    setUserUid(user.uid);

    dispatch(getRealtimeConversations({ uid_1: auth.uid, uid_2: user.uid }));

    console.log(user);
  };

  const submitMessage = (e) => {
    const msgObj = {
      user_uid_1: auth.uid,
      user_uid_2: userUid,
      message,
    };

    if (message !== "") {
      dispatch(updateMessage(msgObj)).then(() => {
        setMessage("");
      });
    }
    console.log(msgObj);
  };

  return (
    <div>
      <Link to="/board">
        <h1>게시판</h1>
      </Link>
      <Link to="/chatlist">
        <h1>채팅목록</h1>
      </Link>
      <Link to="/profile">
        <h1>프로필</h1>
      </Link>
    </div>
  );
};

export default HomePage;
