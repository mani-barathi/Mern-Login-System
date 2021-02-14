import React, { useState, useRef, useEffect } from 'react'

function Login() {
    const [isLogin, setIsLogin] = useState(true)
    const [error, setError] = useState(null)
    const formRef = useRef()

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const response = await fetch('http://localhost:5000/', {
                    credentials: "include",
                    headers: { "Content-Type": 'application/json' },
                })
                const data = await response.json()
                console.log(data)
            }
            catch (error) {
                console.log("ERROR:", error)
            }
        }
        makeRequest()
    }, [])

    const handleFormSubmit = (event) => {
        event.preventDefault()
        console.log('form submitted!!')
    }

    // To clear Form Fields while user Switches between login and signup
    useEffect(() => {
        formRef.current.email.value = ''
        formRef.current.password.value = ''
        if (!isLogin) {
            formRef.current.name.value = ''
            formRef.current.confirmPassword.value = ''
        }
    }, [isLogin])

    return (
        <div className="container ">
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>

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

                    {error && /* Error */
                        <div className="form-group">
                            <h6 className="text-center text-danger">
                                {error}
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

            </div>
        </div >
    )
}

export default Login
