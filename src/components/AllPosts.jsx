import { Post } from "./posts/Post.jsx"
import Box from '@mui/material/Box'

 export const AllPosts = () => {
    return (
        <Box 
            display={"flex"}
            alignItems={"center"}
        >
            <Post />
        </Box>
    )
 }