export const getAllPosts = () => {
    return fetch("http://localhost:8088/posts?_expand=topic&_embed=postLikes").then(res => res.json())
}