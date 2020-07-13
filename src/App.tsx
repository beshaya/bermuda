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
    <div className="app">
      <header className="header">
        <h1>Bermuda</h1>
        <div className="user-info">Welcome {user.displayName}</div>
        <button onClick={SignOut}> Log Out </button>
      </header>
      <div className="content">
        <Map />
      </div>
    </div>
  );
}

export default App;
