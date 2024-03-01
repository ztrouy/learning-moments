import React from "react"
import Paper from '@mui/material/Paper'
import { Chip, Typography } from "@mui/material"

export const Post = ({ post }) => {
    return (
        <Paper elevation={3} sx={{
            width: 1, 
            maxWidth: 800, 
            padding: 2,
            margin: 2,
            boxSizing: "border-box"
        }}>
            <Typography variant="h3" sx={{fontWeight: "bold"}}>
                {post.title}
            </Typography>
            <Chip label={post.topic.name} sx={{
                backgroundColor: "#FF5E00", 
                color: "white", 
                fontWeight: "bold"
            }}/>
            <Typography sx={{
                display: "flex",
                justifyContent: "right",
                fontWeight: "bold",
                color: "#6F6F6F"
            }}>
                {post.postLikes.length} Likes
            </Typography>
        </Paper>
    )
}