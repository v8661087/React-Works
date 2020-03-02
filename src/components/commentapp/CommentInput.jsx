import React, { useContext } from "react";
import { AuthContext } from "./Auth";

function CommentInput({
  username,
  content,
  onNameChange,
  onCommentChange,
  onSubmit,
  onBlur
}) {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="commentapp-header">
      <div className="commentapp-field">
        <span className="commentapp-field-name">用戶名:</span>
        {currentUser ? (
          <b> {username}</b>
        ) : (
          <div className="commentapp-field-input">
            <input
              type="text"
              onChange={onNameChange}
              onBlur={onBlur}
              value={username}
            />
          </div>
        )}
      </div>
      <div className="commentapp-field">
        <span className="commentapp-field-name">評論內容:</span>
        <div className="commentapp-field-input">
          <textarea
            onChange={onCommentChange}
            value={content}
            cols="30"
            rows="10"
            autoFocus
          ></textarea>
        </div>
      </div>
      <div className="commentapp-field-button">
        <button onClick={onSubmit}>發佈</button>
      </div>
    </div>
  );
}

export default CommentInput;
