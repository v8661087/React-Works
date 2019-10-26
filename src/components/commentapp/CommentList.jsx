import React from "react";
import Comment from "./Comment"
function CommentList(props) {
  return (
    <div>
      {props.comments.map((comment, index) => (
        <Comment  comment={comment} key={index} onDelete={()=>props.onDelete(comment)}/>
      ))}
    </div>
  );
}
export default CommentList;
