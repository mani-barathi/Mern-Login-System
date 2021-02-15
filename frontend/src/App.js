import './css/App.css'
import Login from "./components/Login"
import Navbar from "./components/Navbar"
import PostForm from "./components/PostForm"
import Feed from "./components/Feed"

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
            <Feed />
          </div>
        </>
      ) : (
          <Login />
        )}
    </div>
  );
}

export default App;
