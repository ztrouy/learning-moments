export const getAllPosts = () => {
    return fetch("http://localhost:8088/posts?_expand=topic&_embed=postLikes").then(res => res.json())
}

export const getPostById = (postId) => {
    return fetch(`http://localhost:8088/posts/${postId}?_expand=topic&_expand=user&_embed=postLikes`).then(res => res.json())
}

export const likePost = (likeObject) => {
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(likeObject)
    }

    return fetch("http://localhost:8088/postLikes", postOptions)
}