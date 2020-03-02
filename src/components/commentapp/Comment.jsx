import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./Auth";
import firebase from "../../firebase";

function Comment({ comment }) {
  const [timeString, setTimeString] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    _updateTimeString();
    const _timer = setInterval(_updateTimeString, 5000);
    return () => clearInterval(_timer);
  });
  function _updateTimeString() {
    const duration = (+Date.now() - (comment.createdTime.seconds*1000)) / 1000;
    const time = new Date(comment.createdTime.seconds *1000)
    const year = time.getFullYear()
    const month = time.getMonth()
    const date = time.getDate()
    setTimeString(
      duration > 60
        ? duration > 3600
          ? duration > 86400
            ? `${year}年${month+1}月${date}日`
            : `${Math.round(duration / 60 / 60)}小時前`
          : `${Math.round(duration / 60)}分鐘前`
        : `${Math.round(Math.max(duration, 1))}秒前`
    );
  }
  function handleDelete() {
    firebase
      .firestore()
      .collection("comments")
      .doc(comment.id)
      .delete();
    setModal(false);
  }
  return (
    <div className="comment">
      <div className="comment-user">
        <span>{comment.username}： </span>
      </div>
      <p>{comment.content}</p>
      {currentUser && (
        currentUser.email === "kuo1228@gmail.com" && (
          <span className="comment-delete" onClick={() => setModal(true)}>
            删除
          </span>
        )
      )}
      {modal && (
        <div className="modal">
          <div>
            <h1>確定要刪除嗎？</h1>
          </div>
          <div className="modal-button" onClick={() => setModal(false)}>
            取消
          </div>
          <div className="modal-button delete" onClick={handleDelete}>
            删除
          </div>
        </div>
      )}
      <span className="comment-createdtime">{timeString}</span>
    </div>
  );
}
export default Comment;
