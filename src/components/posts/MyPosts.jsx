import { Box, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { getAllPostsByUser } from "../../services/postService.jsx"
import { getAllTopics } from "../../services/topicService.jsx"
import { PostSimple } from "./PostSimple.jsx"

export const MyPosts = ({ currentUser }) => {
    const [myPosts, setMyPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [allTopics, setAllTopics] = useState([])
    const [topicFilter, setTopicFilter] = useState(0)
    const [searchTerm, setSearchTerm] = useState("")

    const refreshPosts = () => {
        getAllPostsByUser(currentUser.id).then(postsArray => {
            setMyPosts(postsArray)
        })
    }

    const refreshTopics = () => {
        getAllTopics().then(topicsArray => {
            setAllTopics(topicsArray)
        })
    }


    useEffect(() => {
        refreshPosts()
        refreshTopics()
    }, [])

    useEffect(() => {
        if (topicFilter === 0) {
            setFilteredPosts(myPosts)
        } else {
            setFilteredPosts(myPosts.filter(post => post.topic.id === topicFilter))
        }
    }, [topicFilter, myPosts])

    useEffect(() => {
        const foundPosts = myPosts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
        setFilteredPosts(foundPosts)
    }, [searchTerm, myPosts])
    
    console.log("My Posts", myPosts)
    console.log("Filtered Posts:", filteredPosts)

    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
            <Grid container direction={"row"} justifyContent={"space-between"} width={0.7} maxWidth={800} marginTop={4}>
                <Box>
                    <FormControl sx={{width: 200}}>
                        <InputLabel>Filter by Topic</InputLabel>
                        <Select
                            value={topicFilter}
                            label="Filter by Topic"
                            onChange={(event) => {
                                setTopicFilter(event.target.value)
                            }}
                        >
                            <MenuItem value={0} key={0}>Select a Topic</MenuItem>
                            {allTopics.map(topic => {
                                return <MenuItem value={topic.id} key={topic.id}>{topic.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    <TextField
                        id="outlined-search"
                        label="Search for a Post"
                        type="search"
                        onChange={(event) => {
                            setSearchTerm(event.target.value)
                        }}
                    />
                </Box>
            </Grid>
            <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                width={0.7}
                marginTop={2}
            >
                {filteredPosts.map(post => {
                    return <PostSimple post={post} refreshPosts={refreshPosts} key={post.id}/>
                })}
            </Box>
        </Box>
    )
}