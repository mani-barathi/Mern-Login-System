import React, { useState } from "react";
import Comment from "./Comment";
import CommentBox from "./CommentBox";

function Post({ data }) {
  const [showComments, setShowComments] = useState(false);

  const [comments, setComments] = useState([
    { id: 1, authorId: "123", authorName: "mani", text: "this is a comment" },
    { id: 2, authorId: "123", authorName: "mani", text: "this is a comment" },
    { id: 3, authorId: "123", authorName: "mani", text: "this is a comment" },
  ]);

  const toggleComments = () => setShowComments((prev) => !prev);

  return (
    <div className="mb-5 border-bottom shadow rounded">
      <div
        className="row justify-content-center"
        style={{ margin: "0.5rem 0.1rem" }}
      >
        <div className="col px-0 px-2 mt-3">
          <div className="d-flex mb-2 align-items-center">
            <img
              className="rounded-circle"
              src={`https://ui-avatars.com/api/?name=${data.authorName}&size=40`}
              alt=""
            />
            <h5 className="mt-0 ml-2">{data.authorName}</h5>
          </div>
          {data.imageUrl && <img src={data.imageUrl} className="img-fluid" />}
          <p style={{ fontSize: "1.1rem" }}>{data.text}</p>
        </div>
      </div>

      <div className="px-2">
        <button className="btn btn-sm btn-info mb-2" onClick={toggleComments}>
          Comments: {comments.length}
        </button>
      </div>

      <div>
        {comments.length > 0 &&
          showComments &&
          comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
      </div>

      <CommentBox />
    </div>
  );
}

export default Post;
