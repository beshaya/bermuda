import React from 'react';
import * as db from '../firebase';
import '../App.css';
import { State } from '../providers/GameState';
import { Map } from './Map';
import { TileEditor } from './TileEditor';
import { Resizer } from './Resizer';

interface AdminState {
  selectedRow: number | undefined;
  selectedCol: number | undefined;
  selectedTile: db.TileInfo;
  tileName: string;
}

class Admin extends React.Component<State, AdminState> {
  constructor(props: State) {
    super(props);
    this.state = {
      selectedRow: 0,
      selectedCol: 0,
      tileName: this.props.map[0][0],
      selectedTile: this.props.tiles[this.props.map[0][0]],
    };
  }

  onTileClicked(row: number, col: number) {
    const tileName: string = this.props.map[row][col];
    const tileData = this.props.tiles[tileName];
    this.setState({
      selectedRow: row,
      selectedCol: col,
      selectedTile: tileData,
      tileName: tileName,
    });
  }

  delesectOnClickOutside(event: any) {
    this.setState({
      selectedRow: undefined,
      selectedCol: undefined,
    });
  }

  render() {
    return (
      <div className="app">
        <header className="header">
          <h1>Bermuda</h1>
          <div className="user-info">Bermunda GM - Logged In as: {this.props.user.user.displayName}</div>
          <button onClick={db.SignOut}> Log Out </button>
        </header>
        <div className="content">
          <div className="mapArea" onClick={this.delesectOnClickOutside.bind(this)}>
            <Map map={this.props.map}
              tiles={this.props.tiles}
              selectedRow={this.state.selectedRow}
              selectedCol={this.state.selectedCol}
              onClick={this.onTileClicked.bind(this)} />
            <Resizer map={this.props.map} gameId={this.props.user.game_id} />
          </div>
          <div className="sidebar">
            <div className="turn-info">
              <p>Turn Number: 1</p>
              <p>Waiting for GM...</p>
            </div>
            <div id="tile-info" className="tile-info">
              <TileEditor tileName={this.state.tileName} tileInfo={this.state.selectedTile}></TileEditor>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
