import React from 'react'

function Navbar({ setUser }) {

    const logout = () => setUser(null)

    return (
        <nav className="navbar navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Mern App</a>

            <button onClick={logout}
                className="btn btn-outline-primary my-2 my-sm-0">
                Logout
            </button>
        </nav>
    )
}

export default Navbar
