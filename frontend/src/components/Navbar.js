import React from 'react'
import { useStateValue } from "../contexts/StateContext"

function Navbar() {
    const [, dispatch] = useStateValue()

    const logout = async () => {
        try {
            const response = await fetch('http://localhost:5000/auth/logout', {
                credentials: "include",
                method: 'POST',
            })
            const data = await response.json()
            console.log(data)
            if (data.report)
                dispatch({ type: 'SET_USER', payload: null })
            else
                alert('Something went wrong on Server')
        }
        catch (error) {
            console.log("ERROR:", error)
        }
    }

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
