export const getAllPosts = () => {
    return fetch("http://localhost:8088/posts?_expand=topic&_embed=postLikes").then(res => res.json())
}

export const getPostById = (postId) => {
    return fetch(`http://localhost:8088/posts/${postId}?_expand=topic&_expand=user&_embed=postLikes`).then(res => res.json())
}

export const getAllPostsByUser = (userId) => {
    return fetch(`http://localhost:8088/posts?userId=${userId}&_expand=topic&_embed=postLikes`).then(res => res.json())
}

export const createPost = (postObject) => {
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postObject)
    }

    return fetch("http://localhost:8088/posts", postOptions)
}

export const deletePost = (post) => {
    const deleteOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    }

    return fetch(`http://localhost:8088/posts/${post.id}`, deleteOptions)
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

export const modifyPostLike = (likeObject) => {
    const putOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(likeObject)
    }

    return fetch(`http://localhost:8088/postLikes/${likeObject.id}`, putOptions)
}