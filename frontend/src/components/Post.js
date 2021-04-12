import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import CommentBox from "./CommentBox";

function Post({ data }) {
  const [noOfComments, setNoOfComments] = useState(data.noOfComments);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [newComment, setNewComment] = useState(null);

  // this gets Triggered when the user creates a new comment
  useEffect(() => {
    if (!newComment) return;

    setNoOfComments((prev) => prev + 1);
    if (fetched) {
      return setComments((prev) => [...prev, newComment]);
    }
  }, [newComment]);

  const toggleComments = async () => {
    setShowComments((prev) => !prev);
    if (fetched) return;

    const response = await fetch(
      "http://localhost:5000/api/comment/getcomments?" +
        new URLSearchParams({
          postId: data._id,
        }),
      {
        credentials: "include",
      }
    );
    const resData = await response.json();
    if (resData.report) {
      console.log(resData.comments);
      setComments((prev) => [...prev, ...resData.comments]);
    }
    setFetched(true);
  };

  return (
    <div className="mb-5 border-bottmom shadow rounded">
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
          Comments: {noOfComments}
        </button>
      </div>

      <div>
        {" "}
        {comments.length > 0 &&
          showComments &&
          comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
      </div>

      <CommentBox postId={data._id} setNewComment={setNewComment} />
    </div>
  );
}

export default Post;
