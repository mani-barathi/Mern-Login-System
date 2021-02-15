import React, { useEffect, useState } from 'react'
import Post from "./Post"
import { useStateValue } from "../contexts/StateContext"

function Feed() {
    const [posts, setPosts] = useState([])
    const [{ newPost }] = useStateValue()

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/post', {
                    credentials: "include"
                })
                const data = await response.json()
                if (data.report)
                    setPosts(data.posts)

            } catch (error) {
                console.log(error)
            }
        }
        makeRequest()
    }, [])

    useEffect(() => {
        console.log('Inside Feed Js:', newPost)
        if (!newPost) return
        setPosts([newPost, ...posts])

    }, [newPost])

    return (
        <div className="row justify-content-center" style={{ margin: "0.5rem 0.1rem" }}>
            <div className="col px-0 px-2 py-2 mb-5" style={{ maxWidth: "600px" }}>
                <h4>Feeds</h4>
                <hr />
                {
                    posts.map(post => <Post key={post._id} data={post} />)
                }
            </div>
        </div>
    )
}

export default Feed
