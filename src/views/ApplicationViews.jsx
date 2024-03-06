import { Outlet, Route, Routes } from "react-router-dom"
import { AllPosts } from "../components/AllPosts"
import { Navbar } from "../components/navbar/Navbar"
import { useEffect, useState } from "react"
import { PostDetails } from "../components/posts/PostDetails.jsx"

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState([])

    useEffect(() => {
        const localLearningUser = localStorage.getItem("learning_user")
        const learningUserObject = JSON.parse(localLearningUser)

        setCurrentUser(learningUserObject)
    }, [])
    
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <Navbar/>
                    <Outlet/>
                </>
            }>
                <Route index element={<AllPosts/>}/>
                <Route path="posts">
                    <Route path=":postId" element={<PostDetails currentUser={currentUser}/>}/>
                </Route>
            </Route>
        </Routes>
    )
}