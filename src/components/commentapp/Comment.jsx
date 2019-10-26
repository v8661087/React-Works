import React, { useState, useEffect } from "react";

function Comment(props) {
  const [timeString, setTimeString] = useState("");
  useEffect(() => {
    _updateTimeString();
    const _timer = setInterval(_updateTimeString, 5000);
    return () => clearInterval(_timer);
  });
  function _updateTimeString() {
    const duration = (+Date.now() - props.comment.createdTime) / 1000;
    setTimeString(
      duration > 60
        ? duration > 3600
          ? `${Math.round(duration / 60 / 60)}小時前`
          : `${Math.round(duration / 60)}分鐘前`
        : `${Math.round(Math.max(duration, 1))}秒前`
    );
  }
  function _getProcessedContent(content){
    return content.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
  }
  return (
    <div className="comment">
      <div className="comment-user">
        <span>{props.comment.username} </span>：
      </div>
      <p dangerouslySetInnerHTML={{__html:_getProcessedContent(props.comment.content)}} />
      <span className="comment-createdtime">{timeString}</span>
      <span
        className="comment-delete"
        onClick={() => props.onDelete(props.comment)}
      >
        删除
      </span>
    </div>
  );
}
export default Comment;
