import React from 'react';
import './App.css';
import Map from './components/Map';
import * as db from './firebase';
import { UserData } from "./providers/UserData";
import schooner from "./assets/ships/two-masted-schooner.jpg";
import { State } from './providers/GameState';

interface AppProps {
  userData: UserData;
}

interface AppState {
}

class App extends React.Component<State, AppState> {
  constructor(props: State) {
    super(props);
    this.state = {};
  }

  onTileClicked(row: number, col: number) {}

  render() {
    const user = this.props.user;
    return (
      <div className="app">
        <header className="header">
          <h1>Bermuda</h1>
          <div className="user-info">Welcome {user.user.displayName}, captain of {user.ship_name} </div>
          <button onClick={db.SignOut}> Log Out </button>
        </header>
        <div className="content">
          <Map map={this.props.map} tiles={this.props.tiles} onClick={this.onTileClicked}/>
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
}

export default App;
