import { Button, Paper, Typography } from "@mui/material"
import { deletePost } from "../../services/postService"

export const PostSimple = ({ post, refreshPosts }) => {
    const handleDelete = () => {
        deletePost(post).then(() => {
            refreshPosts()
        })
    }
    
    return (
        <Paper elevation={3} sx={{
            width: 1, 
            maxWidth: 800, 
            padding: 2,
            margin: 2,
            boxSizing: "border-box"
        }}>
            <Typography variant="h5">{post.title}</Typography>
            <Button variant="contained" sx={{marginTop: 1}} onClick={handleDelete}>Delete</Button>
        </Paper>
    )
}