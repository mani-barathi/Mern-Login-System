import React, { useEffect, useState, useCallback, useRef } from 'react'
import Post from "./Post"
import { useStateValue } from "../contexts/StateContext"

function Feed() {
    const [{ newPost }] = useStateValue()
    const [posts, setPosts] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [skip, setSkip] = useState(0)
    const [loading, setLoading] = useState(true)
    const observer = useRef(null)

    useEffect(() => {
        const makeRequest = async () => {
            setLoading(true)
            try {
                const response = await fetch('http://localhost:5000/api/post?' + new URLSearchParams({
                    skip: skip,
                }), {
                    credentials: "include"
                })
                const data = await response.json()
                if (data.report)
                    setPosts([...posts, ...data.posts])
                setHasMore(data.hasMore)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        makeRequest()
    }, [skip])

    useEffect(() => {
        if (newPost)
            setPosts([newPost, ...posts])
    }, [newPost])

    const lastPostRefCallback = useCallback(node => {
        if (loading) return
        if (observer.current)
            observer.current.disconnect()

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                console.log(node.textContent, 'is Intersecting', posts.length)
                setSkip(posts.length)
            }
        })
        if (node)
            observer.current.observe(node)
    }, [loading, posts.length, hasMore])

    return (
        <div className="row justify-content-center" style={{ margin: "0.5rem 0.1rem" }}>
            <div className="col px-0 px-2 py-2 mb-5" style={{ maxWidth: "600px" }}>
                <h4>Feeds</h4>
                <hr />
                {posts.map((post, i) => (
                    (i === posts.length - 1) ? (
                        <div ref={lastPostRefCallback} key={post._id}>
                            <Post key={post._id} data={post} />
                        </div>
                    ) : (
                            <Post key={post._id} data={post} />
                        )
                ))}

                {loading &&  // Loading Spinner
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

export default Feed
