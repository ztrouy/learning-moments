import { Outlet, Route, Routes } from "react-router-dom"
import { AllPosts } from "../components/AllPosts"
import { Navbar } from "../components/navbar/Navbar"
import { useEffect, useState } from "react"
import { PostDetails } from "../components/posts/PostDetails.jsx"
import { NewPost } from "../components/posts/NewPost.jsx"
import { MyPosts } from "../components/posts/MyPosts.jsx"

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})

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
                    <Route path="new" element={<NewPost currentUser={currentUser}/>}/>
                    <Route path="my" element={<MyPosts currentUser={currentUser}/>} />
                </Route>
            </Route>
        </Routes>
    )
}