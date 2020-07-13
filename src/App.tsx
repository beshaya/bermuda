import React, {useContext} from 'react';
import { Redirect } from 'react-router-dom'
import './App.css';
import Map from './components/Map';
import {SignOut } from './firebase';
import { UserContext } from "./providers/userProvider";
import schooner from "./assets/ships/two-masted-schooner.jpg"

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
        <div className="sidebar">
          <div className="turn-info">
            <p>Turn Number: 1</p>
            <p>Waiting for GM...</p>
          </div>
          <div className="tile-info">
            <h2>Tile Info</h2>
            <p>Bilged on her anchor league gunwalls pink flogging measured fer yer chains hang the jib black jack bowsprit doubloon. Salmagundi wench pirate reef sails brig furl stern hang the jib broadside spike. Cackle fruit quarterdeck schooner case shot swing the lead measured fer yer chains Pieces of Eight draught red ensign pinnace. </p>
          </div>
          <div className="tile-img">
            <img src={schooner} alt="two masted schooner" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
