function Comment({ comment }) {
  return (
    <div className="ml-2 " style={{ fontSize: "0.93rem" }}>
      <span className="font-weight-bold mr-2">{comment.authorName}</span>
      <span className="d-inline">{comment.text}</span>
    </div>
  );
}

export default Comment;
