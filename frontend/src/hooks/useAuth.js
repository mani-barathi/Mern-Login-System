import { useStateValue } from "../contexts/StateContext"

const BASE_URL = 'http://localhost:5000'

function useAuth() {
    const [, dispatch] = useStateValue()

    const signup = async (user) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/signup`, {
                credentials: "include",
                method: 'POST',
                body: JSON.stringify(user),
                headers: { "Content-Type": 'application/json' },
            })
            const data = await response.json()
            return data
        }
        catch (error) {
            console.log("ERROR:", error)
            return { message: "Someting went wrong! Try again", report: false }
        }
    }

    const login = async (user) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                credentials: "include",
                method: 'POST',
                body: JSON.stringify(user),
                headers: { "Content-Type": 'application/json' },
            })
            const data = await response.json()
            if (data.report) {
                dispatch({ type: 'SET_USER', payload: data.user })
            }
            return data
        }
        catch (error) {
            console.log("ERROR:", error)
        }
    }

    const checkLoggedIn = async () => {
        try {
            const response = await fetch(`${BASE_URL}/auth/islogged`, {
                credentials: "include",
                method: 'POST',
            })
            const data = await response.json()
            if (data.report) {
                dispatch({ type: 'SET_USER', payload: data.user })
                return true
            }
            return false
        }
        catch (error) {
            console.log("ERROR:", error)
            return false
        }
    }

    const logout = async () => {
        try {
            const response = await fetch(`${BASE_URL}/auth/logout`, {
                credentials: "include",
                method: 'POST',
            })
            const data = await response.json()
            if (data.report)
                dispatch({ type: 'SET_USER', payload: null })
            else
                alert('Something went wrong on Server')
        }
        catch (error) {
            console.log("ERROR:", error)
        }
    }

    return { signup, login, checkLoggedIn, logout }
}

export default useAuth
