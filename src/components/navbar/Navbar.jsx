import "Navbar.css"

export const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-left">
                <a>All Posts</a>
                <a>Most Posts</a>
                <a>Favorites</a>
                <a>New Post</a>
            </div>
            <div className="nav-right">
                <a>Profile</a>
                <a>Logout</a>
            </div>
        </nav>
    )
}