import { AppBar, Box, Button, Grid, Toolbar } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"

export const Navbar = () => {
    const navigate = useNavigate()
    
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Grid display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                    <Toolbar direction={"row"}>
                        <Button variant="text" component={Link} to={"/"} sx={{color: "white"}}>All Posts</Button>
                        <Button variant="text" component={Link} to={"/posts/my"} sx={{color: "white"}}>My Posts</Button>
                        <Button variant="text" component={Link} to={"/"} sx={{color: "white"}}>Favorites</Button>
                        <Button variant="text" component={Link} to={"/posts/new"} sx={{color: "white"}}>New Post</Button>
                    </Toolbar>
                    <Toolbar direction={"row"}>
                        <Button variant="text" component={Link} to={"/"} sx={{color: "white"}}>Profile</Button>
                        {localStorage.getItem("learning_user") ? (
                            <Button variant="text" component={Link} to={"/"} sx={{color: "white"}} onClick={() => {
                                localStorage.removeItem("learning_user")
                                navigate("/login", { replace : true })
                            }}>Logout</Button>

                        ) : (
                            ""
                        )}
                    </Toolbar>
                </Grid>
            </AppBar>
        </Box>
    )
}