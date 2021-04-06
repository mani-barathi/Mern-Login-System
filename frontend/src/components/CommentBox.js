import react, { useState } from "react";
import { useStateValue } from "../contexts/StateContext";

export default function CommentBox({ postId }) {
  const [{ user }] = useStateValue();
  const [comment, setComment] = useState("");

  const handleCommentChange = (e) => setComment(e.target.value);

  const handleCommentSubmit = async () => {
    const response = await fetch();
    const data = await response.json();
  };

  return (
    <form
      onSubmit={handleCommentSubmit}
      autoComplete="off"
      className="col px-0 px-2 py-2 border shadow-sm"
      style={{ maxWidth: "600px" }}
    >
      <div className="d-flex align-items-center justify-content-between">
        <input
          type="text"
          name="commet"
          className="form-control form-control-sm"
          required
          placeholder={`Hey ${user.name}, share your thoughts on this Post`}
          value={comment}
          onChange={handleCommentChange}
        />
        <button className="btn btn-primary btn-sm ml-2">POST</button>
      </div>
    </form>
  );
}
