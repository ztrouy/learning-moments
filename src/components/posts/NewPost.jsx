import { Box, Button, FormControl, Grid, MenuItem, Paper, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { getAllTopics } from "../../services/topicService.jsx"
import { createPost } from "../../services/postService.jsx"
import { useNavigate } from "react-router"

export const NewPost = ({ currentUser }) => {
    const [title, setTitle] = useState("")
    const [topic, setTopic] = useState(0)
    const [body, setBody] = useState("")
    const [allTopics, setAllTopics] = useState([])
    
    useEffect(() => {
        getAllTopics().then(topicsArray => {
            setAllTopics(topicsArray)
        })
    },[])

    const createNewPost = (postObj) => {
        createPost(postObj).then(() => {
            navigate("/posts/my")
        })
    }
    
    const navigate = useNavigate()
    
    const handleSubmit = () => {
        const postObj = {
            userId: currentUser.id,
            topicId: topic,
            title: title,
            body: body,
            date: new Date().toDateString()
        }

        if (title != "" && topic != 0 && body != "") {
            createNewPost(postObj)
        } else {
            window.alert("Please fill out all fields") // TODO | Navigate user to my posts view
        }
    }
    
    return (
        <Box display={"flex"} justifyContent={"center"}>
            <Paper elevation={3} sx={{
                width: 1,
                maxWidth: 800,
                padding: 4,
                paddingLeft: 10,
                paddingRight: 10,
                margin: 2,
                boxSizing: "border-box"
            }}>
                <Typography variant="h5">New Post</Typography>
                <TextField 
                    // variant="filled" 
                    label="Title" 
                    size="small" 
                    fullWidth
                    sx={{marginTop: 2}}
                    value={title}
                    onChange={event => {setTitle(event.target.value)}}
                ></TextField>
                <FormControl fullWidth size="small" sx={{maxWidth: 400, marginTop: 3}}>
                    <Select value={topic} onChange={event => setTopic(event.target.value)}>
                        <MenuItem disabled value={0} key={0}>Select a Topic</MenuItem>
                        {allTopics.map(topicObj => {return <MenuItem value={topicObj.id} key={topicObj.id}>{topicObj.name}</MenuItem>})}
                    </Select>
                </FormControl>
                <TextField 
                    // variant="filled" 
                    label="Body" 
                    size="small" 
                    fullWidth
                    sx={{marginTop: 3}}
                    value={body}
                    onChange={event => {setBody(event.target.value)}}
                ></TextField>
                <Grid display={"flex"} flexDirection={"row-reverse"} marginTop={3}>
                    <Button variant="contained" onClick={handleSubmit}>Submit</Button>
                </Grid>
            </Paper>
        </Box>
    )
}