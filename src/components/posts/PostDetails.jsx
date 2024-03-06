import { Chip, Grid, Paper, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getPostById, likePost } from "../../services/postService.jsx"
import { Box } from "@mui/system"
import { Button } from "@mui/material"

export const PostDetails = ({ currentUser }) => {
    const { postId } = useParams()
    const [post, setPost] = useState({})
    const [hasLiked, setHasLiked] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    
    const refreshPost = () => {
        getPostById(postId).then(postObject => {
            setPost(postObject)
        })
    }

    const handleLike = () => {
        const likeObject = {
            userId: currentUser.id,
            postId: post.id,
            isLiked: true,
            date: new Date().toDateString()
        }

        likePost(likeObject).then(refreshPost)
    }

    const handleUnlike = () => {
        const currentLikeObject = post.postLikes.find(like => like.userId === currentUser.id)
        const editedLikeObject = {...currentLikeObject}

        editedLikeObject.isLiked = false
    }

    useEffect(() => {
        refreshPost()
    }, [])

    useEffect(() => {
        if (post.postLikes?.find(like => currentUser.id === like.userId)) {
            setHasLiked(true)
        }
    }, [post])

    useEffect(() => {
        if (hasLiked) {
            const likeObject = post.postLikes.find(like => currentUser.id === like.userId)

            if (likeObject.isLiked) {
                setIsLiked(true)
            } else {
                setIsLiked(false)
            }
        }
    }, [post, hasLiked])

    return (
        <Box display={"flex"} justifyContent={"center"}>
            <Paper
                elevation={3} sx={{
                    width: 1,
                    maxWidth: 800,
                    padding: 2, 
                    margin: 2,
                    boxSizing: "border-box"
                }}
            >
                <Typography fontWeight={"bold"} sx={{color: "#6F6F6F"}}>{post.user ? post.user.fullName : ""}</Typography>
                <Typography variant="h3" fontWeight={"bold"}>{post?.title}</Typography>
                <Chip label={post.topic ? post.topic.name : ""} sx={{
                    backgroundColor: "#FF5E00", 
                    color: "white", 
                    fontWeight: "bold",
                    marginTop: 0.5
                }}/>
                <Typography marginTop={2}>{post.body}</Typography>
                <Grid display={"flex"} direction={"row"} marginTop={1} justifyContent={"space-between"}>
                    <Grid display={"flex"} direction={"row"} alignItems={"center"}>
                        <Typography fontWeight={"bold"} sx={{color: "#6F6F6F", marginRight: 3}}>{post.date ? post.date : ""}</Typography>
                        <Typography textAlign={"right"} fontWeight={"bold"} sx={{color: "#6F6F6F"}}>{`${post.postLikes ? post.postLikes.length : ""} Likes`}</Typography>
                    </Grid>
                    {currentUser.id != post.userId ? (
                        hasLiked ? (
                            <Button variant="contained">Unlike Post</Button>
                        ) : (
                            <Button variant="contained" onClick={handleLike}>Like Post</Button>
                        )
                    ) : (
                        <Button variant="contained">Edit Post</Button>
                    )}
                    
                </Grid>
            </Paper>
        </Box>
    )
}