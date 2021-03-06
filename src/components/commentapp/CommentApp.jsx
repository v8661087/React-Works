import React, { useState, useEffect, useContext, useCallback } from "react";
import CommentInput from "./CommentInput";
import Comment from "./Comment";
import { AuthContext } from "./Auth";
import firebase from "../../firebase";
import { Link } from "react-router-dom";

function CommentApp() {
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const { currentUser } = useContext(AuthContext);

  const fetchData = useCallback(() => {
    const fetchingData = () => {
      firebase
        .firestore()
        .collection("comments")
        .orderBy("createdTime", "desc")
        .onSnapshot(snapshot => {
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setComments(data);
          setLoading(false);
          console.log("fetchData");
        });
    };
    fetchingData();
  }, [currentUser]);
  
  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.email);
    } else {
      if (localStorage.getItem("username")) {
        const username = localStorage.getItem("username");
        setUsername(username);
      }
    }
    fetchData();
  }, [fetchData]);

  function handleNameChange(e) {
    setUsername(e.target.value);
  }
  function handleCommentChange(e) {
    setContent(e.target.value);
  }
  function handleSubmit() {
    if (username && content) {
      firebase
        .firestore()
        .collection("comments")
        .add({ username, content, createdTime: new Date() });
      setContent("");
    } else if (!username) {
      document.querySelector("input").focus();
    } else if (!content) {
      document.querySelector("textarea").focus();
    }
  }

  function handleBlur() {
    localStorage.setItem("username", username);
  }

  if (loading) {
    return <div className="loading"></div>;
  }
  return (
    <div className="commentapp">
      {currentUser ? (
        <li
          className="link"
          onClick={() => {
            firebase.auth().signOut();
            setUsername("");
          }}
        >
          登出
        </li>
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
        onBlur={handleBlur}
        username={username}
        content={content}
      />
      {comments.map(comment => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </div>
  );
}

export default CommentApp;
