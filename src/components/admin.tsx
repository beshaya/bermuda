import React from 'react';
import { Redirect } from 'react-router-dom';
import * as db from '../firebase';
import '../App.css';
import { DbUser } from '../providers/UserData';
import { Map } from './Map';
import { Resizer } from './Resizer';
import { TilePicker } from './TilePicker';
import { TileEditor } from './TileEditor';

interface AdminProps {
  tiles: db.TileDict;
  user: DbUser;
  gameId: string;
}
interface AdminState {
  selectedRow: number | undefined;
  selectedCol: number | undefined;
  map: db.MapRepr;
  error: Error | undefined;
}

class Admin extends React.Component<AdminProps, AdminState> {
  unsubscribeMap = ()=>{};

  constructor(props: AdminProps) {
    super(props);
    this.state = {
      selectedRow: undefined,
      selectedCol: undefined,
      map: [],
      error: undefined,
    };
  }

  componentDidMount() {
    this.unsubscribeMap = db.SubscribeToMap(this.props.gameId, (map: db.MapRepr, error?: Error) => {
      if (error) {
        this.setState({error});
        return;
      }
      this.setState({ map });
    });
  }

  componentWillUnmount() {
    this.unsubscribeMap();
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
    if (this.state.error) {
      return (<Redirect to='/'></Redirect>);
    }
    if (this.state.selectedRow === undefined || this.state.selectedCol === undefined) {
      return (<div />);
    }
    const tileName: string = this.state.map[this.state.selectedRow][this.state.selectedCol];
    const tileInfo = this.props.tiles[tileName];
    return (
      <div className="tile-info">
        <TilePicker
          tileName={tileName}
          tileInfo={tileInfo}
          map={this.state.map}
          tiles={this.props.tiles}
          selectedRow={this.state.selectedRow}
          selectedCol={this.state.selectedCol}
          gameId={this.props.gameId} />
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
          <div className="user-info">Bermunda GM - Logged In as: {this.props.user.email}</div>
          <button onClick={db.SignOut}> Log Out </button>
        </header>
        <div className="content">
          {this.state.map.length > 0 ? (
            <div className="mapArea" onClick={this.delesectOnClickOutside.bind(this)}>
              <Map map={this.state.map}
                tiles={this.props.tiles}
                selectedRow={this.state.selectedRow}
                selectedCol={this.state.selectedCol}
                onClick={this.onTileClicked.bind(this)} />
              <Resizer map={this.state.map} gameId={this.props.gameId} />
            </div>
          ) : (
            <div />
          )}
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
