import React, {useContext} from 'react';
import { Redirect } from 'react-router-dom'
import './App.css';
import Map from './components/Map';
import {SignOut } from './firebase';
import { UserContext } from "./providers/userProvider";

function App() {
  const user = useContext(UserContext);
  if (!user) {
    return <Redirect to='/login' />
  }
  return (
    <div className="App">
      <button onClick={SignOut}> Log Out </button>
      <header className="App-header">
        <h1>Bermuda</h1>
        Welcome {user.displayName}
      </header>
      <Map />
    </div>
  );
}

export default App;
