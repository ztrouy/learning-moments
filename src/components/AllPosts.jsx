import { Post } from "./posts/Post.jsx"
import Box from '@mui/material/Box'
import { getAllPosts } from "../services/postService.jsx"
import { getAllTopics } from "../services/topicService.jsx"
import React from "react"
import { FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material"

 export const AllPosts = () => {
    const [allPosts, setAllPosts] = React.useState([])
    const [filteredPosts, setFilteredPosts] = React.useState([])
    const [allTopics, setAllTopics] = React.useState([])
    const [topicFilter, setTopicFilter] = React.useState(0)
    const [searchTerm, setSearchTerm] = React.useState("")

    const refreshPosts = () => {
        getAllPosts().then(postsArray => {
            setAllPosts(postsArray)
        })
    }

    const refreshTopics = () => {
        getAllTopics().then(topicsArray => {
            setAllTopics(topicsArray)
        })
    }
    
    React.useEffect(() => {
        refreshPosts()
        refreshTopics()
    }, [])
    
    React.useEffect(() => {
        if (topicFilter === 0) {
            setFilteredPosts(allPosts)
        } else {
            setFilteredPosts(allPosts.filter(post => post.topic.id === topicFilter))
        }
    }, [topicFilter, allPosts])

    React.useEffect(() => {
        const foundPosts = allPosts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
        setFilteredPosts(foundPosts)
    }, [searchTerm, allPosts])

    return (
        <React.Fragment>
            <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
            >
                <Grid container direction={"row"} justifyContent={"space-between"} width={0.7} maxWidth={800} margin={2}>
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
                >
                    {filteredPosts.map(post => {
                        return <Post post={post} key={post.id}/>
                    })}
                </Box>
            </Box>
        </React.Fragment>
    )
 }