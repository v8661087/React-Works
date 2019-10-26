import React from "react";

function CommentInput(props) {
  return (
    <div className="commentapp-header">
      <div className="commentapp-field">
        <span className="commentapp-field-name">用戶名:</span>
        <div className="commentapp-field-input">
          <input type="text"
           onChange={props.onNameChange}
           onBlur={props.onBlur}
           value={props.username} />
        </div>
      </div>
      <div className="commentapp-field">
        <span className="commentapp-field-name">評論內容:</span>
        <div className="commentapp-field-input">
          <textarea
            onChange={props.onCommentChange}
            value={props.content}
            cols="30"
            rows="10"
            autoFocus
          ></textarea>
        </div>
      </div>
      <div className="commentapp-field-button">
        <button onClick={props.onSubmit}>發佈</button>
      </div>
    </div>
  );
}

export default CommentInput;
