import React from 'react'
import useAuth from "../hooks/useAuth"

function Navbar() {
    const { logout } = useAuth()

    return (
        <nav className="navbar sticky-top navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Mern App</a>

            <button onClick={logout}
                className="btn btn-outline-primary my-2 my-sm-0">
                Logout
            </button>
        </nav>
    )
}

export default Navbar
