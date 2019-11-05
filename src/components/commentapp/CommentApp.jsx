import React, { useState, useEffect, useContext, useCallback } from "react";
import CommentInput from "./CommentInput";
import Comment from "./Comment";
import "../../commentApp.scss";
import { AuthContext } from "./Auth";
import firebase from "../../firebase";
import { Link } from "react-router-dom";

function CommentApp() {
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true)

  const { currentUser } = useContext(AuthContext);
  const fetchData = useCallback(() => {
    const fetchingData = () => {
      firebase
        .firestore()
        .collection("comments")
        .onSnapshot(snapshot => {
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setComments(data);
          setLoading(false)
          console.log("fetchData");
        });
    };
    fetchingData();
  }, [currentUser]);
  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.email);
    }
    fetchData();
  }, [fetchData]);

  function handleNameChange(e) {
    setUsername(e.target.value);
  }
  function handleCommentChange(e) {
    setContent(e.target.value);
  }
  function handleSubmit(e) {
    if (username && content) {
      firebase
        .firestore()
        .collection("comments")
        .add({ username, content, createdTime: +new Date() });
      setContent("");
    }
  }

  if(loading){
    return <h1>Loading...</h1>
  }
  return (
    <div className="commentapp">
      {currentUser ? (
        <li className="link" onClick={() => {firebase.auth().signOut();setUsername("")}}><Link>登出</Link></li>
      ) : (
        <>
        <li className="link">
            <Link to="./CommentApp/SignUp">註冊</Link>
          </li>
          <li className="link">
            <Link to="./CommentApp/Login">登入</Link>
          </li>
        </>
      )}
      <CommentInput
        onNameChange={handleNameChange}
        onCommentChange={handleCommentChange}
        onSubmit={handleSubmit}
        username={username}
        content={content}
      />
      {comments.map(comment => (
        <Comment
          comment={comment}
          key={comment.id}
        />
      ))}
    </div>
  );
}

export default CommentApp;
