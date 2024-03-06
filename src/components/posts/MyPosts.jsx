import { Box, FormControl, Grid, InputLabel, MenuItem, Paper, Select } from "@mui/material"
import { useEffect, useState } from "react"
import { getAllPosts } from "../../services/postService.jsx"
import { getAllTopics } from "../../services/topicService.jsx"

export const MyPosts = ({ currentUser }) => {
    const [myPosts, setMyPosts] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [allTopics, setAllTopics] = useState([])
    const [topicFilter, setTopicFilter] = useState(0)
    const [searchTerm, setSearchTerm] = useState("")

    const refreshPosts = () => {
        getAllPosts().then(postsArray => {
            setMyPosts(postsArray.filter(post => post.userId === currentUser.id))
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
    

    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
            <Grid container direction={"row"} justifyContent={"space-between"} width={0.7}>
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

                </Box>
            </Grid>
            <Paper elevation={3} sx={{
                width: 1,
                maxWidth: 800,
                padding: 4,
                margin: 2,
                boxSizing: "border-box"
            }}>
                Hello World!
            </Paper>
        </Box>
    )
}