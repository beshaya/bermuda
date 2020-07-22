import React from 'react';
import * as db from '../firebase';
import '../App.css';
import { State } from '../providers/GameState';
import { Map } from './Map';
import { Resizer } from './Resizer';
import { TilePicker } from './TilePicker';
import { TileEditor } from './TileEditor';

interface AdminState {
  selectedRow: number | undefined;
  selectedCol: number | undefined;
}

class Admin extends React.Component<State, AdminState> {
  constructor(props: State) {
    super(props);
    this.state = {
      selectedRow: 0,
      selectedCol: 0,
    };
  }

  onTileClicked(row: number, col: number) {
    if (this.state.selectedCol === col && this.state.selectedRow === row) {
      this.setState({
        selectedRow: undefined,
        selectedCol: undefined,
      });
      return;
    }

    this.setState({
      selectedRow: row,
      selectedCol: col,
    });
  }

  delesectOnClickOutside(event: any) {
    this.setState({
      selectedRow: undefined,
      selectedCol: undefined,
    });
  }

  renderTileEditor() {
    if (this.state.selectedRow === undefined || this.state.selectedCol === undefined) {
      return (<div />);
    }
    const tileName: string = this.props.map[this.state.selectedRow][this.state.selectedCol];
    const tileInfo = this.props.tiles[tileName];
    return (
      <div className="tile-info">
        <TilePicker
          tileName={tileName}
          tileInfo={tileInfo}
          map={this.props.map}
          tiles={this.props.tiles}
          selectedRow={this.state.selectedRow}
          selectedCol={this.state.selectedCol}
          gameId={this.props.user.game_id} />
        <TileEditor tileName={tileName}
          tileInfo={tileInfo}
          tiles={this.props.tiles} />
      </div>
    );
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
            <Resizer
              map={this.props.map}
              gameId={this.props.user.game_id} />
          </div>
          <div className="sidebar">
            <div className="turn-info">
              <p>Turn Number: 1</p>
              <p>Waiting for GM...</p>
            </div>
            {this.renderTileEditor()}
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
