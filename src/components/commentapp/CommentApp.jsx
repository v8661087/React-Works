import React, { useState, useEffect } from "react";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import "../../commentApp.scss";
function CommentApp() {
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("username")) {
      setUsername(localStorage.getItem("username"));
    }
    if (localStorage.getItem("comments")) {
      setComments(JSON.parse(localStorage.getItem("comments")));
    }
  }, []);

  function handleNameChange(e) {
    setUsername(e.target.value);
  }
  function handleCommentChange(e) {
    setContent(e.target.value);
  }
  function handleSubmit() {
    if (username && content) {
      const obj = { username, content, createdTime: +new Date() };
      comments.push(obj);
      setComments(comments);
      setContent("");
      _saveComments();
    }
  }
  function _saveUsername(e) {
    localStorage.setItem("username", e.target.value);
  }
  function _saveComments() {
    localStorage.setItem("comments", JSON.stringify(comments));
  }

  function handleDelete(comment) {
    const index = comments.indexOf(comment);
    comments.splice(index, 1);
    setComments(comments.map(comment=>comment));
    _saveComments();
  }
  return (
    <div className="commentapp">
      <CommentInput
        onNameChange={handleNameChange}
        onCommentChange={handleCommentChange}
        onSubmit={handleSubmit}
        onBlur={_saveUsername}
        username={username}
        content={content}
      />
      <CommentList comments={comments} onDelete={handleDelete} />
    </div>
  );
}

export default CommentApp;
