import React, { useState } from "react";
import CommentBox from "./CommentBox";

function Post({ data }) {
  const [showComments, setShowComments] = useState(false);

  const [comments, setComments] = useState([
    { authorId: "123", authorName: "mani", text: "this is a comment" },
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
          <p>{data.text}</p>
        </div>
      </div>

      {comments.length > 0 && (
        <div>
          <div className="px-2">
            <button
              className="btn btn-sm btn-info mb-2"
              onClick={toggleComments}
            >
              Comments: {comments.length}
            </button>
          </div>

          {showComments &&
            comments.map((comment) => (
              <div>
                <small className="font-weight-bold mr-2">
                  {comment.authorName}
                </small>
                <span>{comment.text}</span>
              </div>
            ))}
        </div>
      )}

      <CommentBox />
    </div>
  );
}

export default Post;
