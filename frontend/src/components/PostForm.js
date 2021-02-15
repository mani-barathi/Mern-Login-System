import React, { useRef, useState } from 'react'
import { useStateValue } from "../contexts/StateContext"

function PostForm() {
    const [{ user }, dispatch] = useStateValue()
    const formRef = useRef()
    const [selectedImage, setSelectedImage] = useState(null)

    const handlePostSubmit = async (event) => {
        event.preventDefault()
        const post = {
            authorId: user._id,
            authorName: user.name,
            text: formRef.current.post.value,
        }

        if (selectedImage) {
            post.imageName = selectedImage.name
            post.imageData = selectedImage.data
        }

        try {
            const response = await fetch('http://localhost:5000/api/post', {
                credentials: "include",
                method: 'POST',
                body: JSON.stringify(post),
                headers: { "Content-Type": 'application/json' },
            })
            const data = await response.json()
            if (data.report) {
                dispatch({ type: 'SET_NEW_POST', payload: data.post })
                formRef.current.reset()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleImageSelect = (e) => {
        const file = e.target.files[0]
        if (!file)
            return setSelectedImage(null)

        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setSelectedImage({
                name: file.name,
                data: reader.result
            })
        }
    }

    return (
        <div className="row justify-content-center" style={{ margin: "0.5rem 0.1rem" }}>
            <form onSubmit={handlePostSubmit} ref={formRef} autoComplete="off"
                className="col px-0 px-2 py-2 border rounded shadow-sm" style={{ maxWidth: "600px" }}>
                <div className="form-group mb-2">
                    <input type="text" name="post" className="form-control"
                        required placeholder={`Hey ${user.name}, what's on your Mind?`} />
                </div>

                <div className="d-flex align-items-center justify-content-between">
                    <input type="file" name="image" accept="image/*" onChange={handleImageSelect}
                        placeholder="Paste an Image URL (Not Mandatory)" />
                    <button className="btn btn-primary btn-sm ml-2">POST</button>
                </div>
            </form>
        </div>
    )
}

export default PostForm
