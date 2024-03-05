import { Outlet, Route, Routes } from "react-router-dom"
import { AllPosts } from "../components/AllPosts"
import { Navbar } from "../components/navbar/Navbar"

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <Navbar/>
                    <Outlet/>
                </>
            }>
                <Route index element={<AllPosts/>}/>
            </Route>
        </Routes>
    )
}