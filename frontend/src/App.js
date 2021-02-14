import './css/App.css'
import Login from "./components/Login"
import Navbar from "./components/Navbar"

import { useStateValue } from "./contexts/StateContext"

function App() {
  const [{ user }] = useStateValue()

  return (
    <div className="app">
      {user ? (
        <>
          <Navbar />
          <div className="container">
            <h6>{`${user.name} has Logged In!`}</h6>
          </div>
        </>
      ) : (
          <Login />
        )}
    </div>
  );
}

export default App;
