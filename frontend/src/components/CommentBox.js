import react, { useState } from "react";
import { useStateValue } from "../contexts/StateContext";

export default function CommentBox({ postId }) {
  const [{ user }] = useStateValue();
  const [comment, setComment] = useState("");

  const handleCommentChange = (e) => setComment(e.target.value);

  const handleCommentSubmit = async (event) => {
        event.preventDefault()
        const newComment = {
            authorId: user._id,
            authorName: user.name,
            text: comment,
            postId
        }
        console.log(newComment)

        try {
            const response = await fetch('http://localhost:5000/api/comment/addcomment', {
                credentials: "include",
                method: 'POST',
                body: JSON.stringify(newComment),
                headers: { "Content-Type": 'application/json' },
            })
            const data = await response.json()
            if (data.report) {
                setComment('')
                console.log(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

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
