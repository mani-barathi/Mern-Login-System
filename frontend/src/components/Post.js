import React from 'react'

function Post({ data }) {
    return (
        <div className="row justify-content-center" style={{ margin: "0.5rem 0.1rem" }}>
            <div className="col px-0 px-2 border-bottom">
                <div className="d-flex mb-2 align-items-center">
                    <img className="rounded-circle" src={`https://ui-avatars.com/api/?name=${data.authorName}&size=40`} alt="" />
                    <h5 className="mt-0 ml-2">{data.authorName}</h5>
                </div>
                {data.imageUrl && <img src={data.imageUrl} className="img-fluid" />}
                <p>{data.text}</p>
            </div>
        </div>
    )
}

export default Post
