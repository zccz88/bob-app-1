import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { firestore } from "../../fbase";
import { Link } from "react-router-dom";
import { updatePost } from "../../actions/board.actions";

const BoardDetailPage = ({ history }) => {
  const { boardId } = useParams();
  const [ postData, setPostData] = useState({});
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const loadedCoords = localStorage.getItem("coords");
  const parsedCoords = JSON.parse(loadedCoords);
  const lat = parsedCoords.latitude;
  const long = parsedCoords.longitude;
  const [cityName, setCityName] = useState("");
  const [dongName, setDongName] = useState("");
 
  const getPostData = useCallback(async () => {
    const db = await firestore.collection("board").doc(boardId);

    db.get().then((doc) => {
        if (doc.exists) {
          setPostData(doc.data());
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

  const dispatch = useDispatch();

  const onSubmitWriteForm = (e) => {
    e.preventDefault();
    const contents = {
      title,
      content,
      lat,
      long,
      cityName,
      dongName,
    };
    dispatch(updatePost(contents, boardId));
    history.push('/board');
  };

  function remove(){
    firestore.collection("board").doc(boardId).delete();
  }
  
  const auth = useSelector((state) => state.auth);//정보확인
  //console.log("현재접속자 = "+auth.uid)
  //console.log("작성자 = "+postData.owner);
  
  const link = firestore.collection("board").doc(boardId).id;
  //console.log("보드 = "+link);

  return (
    <form onSubmit={onSubmitWriteForm}>
      <h1>{postData.title}</h1>
      <div>{postData.content}</div>
      <div>{postData.cityName} {postData.dongName}</div>
      <div>

      {
        auth.uid == postData.owner
        ?<Link key ={link} to={`/update/${link}`}><button>수정</button></Link>
        : null
      }
      {
        auth.uid ==postData.owner
        ?<Link to='/board' onClick={remove}><button>삭제</button></Link>
        :null
      }
      </div> 
    </form>
  );
};

export default BoardDetailPage;
//key = {link} to={`/update/${link}`}