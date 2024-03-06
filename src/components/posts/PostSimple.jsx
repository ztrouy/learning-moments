import { Button, Paper, Typography } from "@mui/material"
import { deletePost } from "../../services/postService"
import { Link } from "react-router-dom"

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
            <Typography variant="h3" fontWeight={"bold"}>
                <Link to={`/posts/${post.id}`} style={{textDecoration: "none", color: "black"}}>
                    {post.title}
                </Link>
            </Typography>
            <Button variant="contained" sx={{marginTop: 1}} onClick={handleDelete}>Delete</Button>
        </Paper>
    )
}