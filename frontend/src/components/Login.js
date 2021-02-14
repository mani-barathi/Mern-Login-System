import React, { useState, useRef, useEffect } from 'react'

function Login({ setUser }) {
    const [isLogin, setIsLogin] = useState(true)
    const [feedback, setFeedback] = useState({ message: '' })
    const [isLoading, setIsLoading] = useState(true)
    const formRef = useRef()

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const response = await fetch('http://localhost:5000/auth/islogged', {
                    credentials: "include",
                    method: 'POST',
                })
                const data = await response.json()
                console.log(data)
                if (data.report)
                    setUser(data.user)
                setIsLoading(false)
            }
            catch (error) {
                console.log("ERROR:", error)
            }
        }
        makeRequest()
        return () => { }
    }, [])

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        const user = {
            email: formRef.current.email.value,
            password: formRef.current.password.value,
        }
        if (!isLogin) {  // Sign UP
            user.name = formRef.current.name.value
            if (user.password != formRef.current.confirmPassword.value)
                return alert('Passwords do not match')

            try {
                const response = await fetch('http://localhost:5000/auth/signup', {
                    credentials: "include",
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: { "Content-Type": 'application/json' },
                })
                const data = await response.json()
                console.log(data)
                if (data.report) {
                    setFeedback({ message: `${data.message}, Login to Continue`, type: 1 })
                    setIsLogin(true)
                } else {
                    setFeedback({ message: data.message, type: 0 })
                    formRef.current.password.value = ''
                    formRef.current.confirmPassword.value = ''
                }
            }
            catch (error) {
                console.log("ERROR:", error)
            }

        } else {   // Login
            try {
                const response = await fetch('http://localhost:5000/auth/login', {
                    credentials: "include",
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: { "Content-Type": 'application/json' },
                })
                const data = await response.json()
                console.log(data)
                if (data.report) {
                    setUser(data.user)
                } else {
                    setFeedback({ message: data.message, type: 0 })
                    formRef.current.password.value = ''
                }
            }
            catch (error) {
                console.log("ERROR:", error)
            }
        }
    }

    const clearFormFields = () => {
        formRef.current.email.value = ''
        formRef.current.password.value = ''
        if (!isLogin) {
            formRef.current.name.value = ''
            formRef.current.confirmPassword.value = ''
        }
    }

    // To clear Form Fields while user Switches between login and signup
    useEffect(() => {
        if (isLoading) return
        setFeedback({ message: '' })
        clearFormFields()
    }, [isLogin])

    return (
        <div className="container ">
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>

                {!isLoading ? (
                    <form ref={formRef} onSubmit={handleFormSubmit}
                        autoComplete="on" className="px-4 py-2 shadow-lg rounded border col-12" style={{ maxWidth: "500px" }} >

                        <h1 className="text-center mt-2 mb-2 font-weight-normal">
                            {isLogin ? 'Login' : 'Sign Up'}
                        </h1>

                        {!isLogin && /* User Name Field */
                            <div className="form-group">
                                <label >Name</label>
                                <input name="name" type="text" className="form-control" placeholder="Enter your Name" required />
                            </div>
                        }

                        <div className="form-group">
                            <label >Email</label>
                            <input name="email" type="email" className="form-control" placeholder="Enter your Email" required />
                        </div>

                        <div className="form-group">
                            <label >Password</label>
                            <input name="password" type="password" className="form-control" placeholder="Enter your Password" minLength="6" required />
                        </div>

                        {!isLogin &&  /* Confirm Password Field */
                            <div className="form-group">
                                <label >Confirm Password</label>
                                <input name="confirmPassword" type="password" className="form-control" placeholder="Re-Enter your password" minLength="6" required />
                            </div>
                        }

                        {feedback.message && /* Error or Success Message */
                            <div className="form-group">
                                <h6 className={`text-center ${feedback.type === 1 ? 'text-success' : 'text-danger'}`}>
                                    {feedback.message}
                                </h6>
                            </div>
                        }

                        <div className="form-group">
                            <button className="btn btn-primary btn-block">
                                {isLogin ? 'Login' : 'Sign Up'}
                            </button>
                        </div>

                        <div className="form-group">
                            <h6 className="text-center">
                                {isLogin ? (
                                    <>
                                        <span> New ? Create an Account</span>
                                        <span className="text-primary ml-1" style={{ cursor: "pointer" }}
                                            onClick={() => setIsLogin(false)}>
                                            Here</span>
                                    </>
                                ) : (
                                        <>
                                            <span>Already have an Account?</span>
                                            <span className="text-primary ml-1" style={{ cursor: "pointer" }}
                                                onClick={() => setIsLogin(true)}>
                                                Login</span>
                                        </>
                                    )}
                            </h6>
                        </div>

                    </form>
                ) : (
                        <div className="spinner-border text-primary" style={{ width: ' 5rem', height: '5rem' }} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    )}

            </div>
        </div >
    )
}

export default Login
