import React from 'react';
import './App.css';
import Map from './components/Map';
import * as db from './firebase';
import { DbUser, PlayerData } from "./providers/UserData";
import schooner from "./assets/ships/two-masted-schooner.jpg";

interface AppProps {
  tiles: db.TileDict;
  user: DbUser;
}

interface AppState {
  playerData: PlayerData | null;
  map: db.MapRepr;
}

class App extends React.Component<AppProps, AppState> {
  unsubscribeMap = ()=>{};

  constructor(props: AppProps) {
    super(props);
    this.state = {playerData: null, map: []};
  }

  async componentDidMount() {
    const playerData = await db.GetPlayerData(this.props.user.email);
    this.setState({playerData});

    this.unsubscribeMap = db.SubscribeToMap(playerData.game_id, (map: db.MapRepr) => {
      this.setState({ map: map });
    });

  }

  componentWillUnmount() {
    this.unsubscribeMap();
  }

  onTileClicked(row: number, col: number) {}

  render() {
    const player = this.state.playerData;
    if (!player || this.state.map.length === 0) {
      return (<div>Loading...</div>);
    }
    return (
      <div className="app">
        <header className="header">
          <h1>Bermuda</h1>
          <div className="user-info">Welcome {this.props.user.email}, captain of {player.ship_name} </div>
          <button onClick={db.SignOut}> Log Out </button>
        </header>
        <div className="content">
          <Map map={this.state.map} tiles={this.props.tiles} onClick={this.onTileClicked}/>
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
