import './css/App.css'
import Login from "./components/Login"
import Navbar from "./components/Navbar"
import PostForm from "./components/PostForm"

import { useStateValue } from "./contexts/StateContext"

function App() {
  const [{ user }] = useStateValue()

  return (
    <div className="app">
      {user ? (
        <>
          <Navbar />
          <div className="container">
            <PostForm />
          </div>
        </>
      ) : (
          <Login />
        )}
    </div>
  );
}

export default App;
