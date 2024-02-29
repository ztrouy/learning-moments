import "./Posts.css"
import React from "react"
import Paper from '@mui/material/Paper'

export const Post = () => {
    return (
    <>
        <Paper sx={{width: 800}}>
            <h2 className="post-title">
                Title of the Post
            </h2>
            <h4 className="post-topic">
                Topic of the Post
            </h4>
            <div className="post-likes">
                3 Likes
            </div>
        </Paper>
        
        <div className="post">
            <h2 className="post-title">
                Title of the Post
            </h2>
            <h4 className="post-topic">
                Topic of the Post
            </h4>
            <div className="post-likes">
                3 Likes
            </div>
        </div>
    </>
    )
}