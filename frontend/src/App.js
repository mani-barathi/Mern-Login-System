import { useState } from 'react';
import './css/App.css';
import Login from "./components/Login"
import Navbar from "./components/Navbar"

function App() {
  const [user, setUser] = useState(null)

  return (
    <div className="app">
      {user ? (
        <>
          <Navbar setUser={setUser} />
          <div className="container">
            <h6>{`${user.name} has Logged In!`}</h6>
          </div>
        </>
      ) : (
          <Login setUser={setUser} />
        )}
    </div>
  );
}

export default App;
