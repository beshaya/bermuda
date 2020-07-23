import React from 'react';
import { MapRepr, SaveGridForGame } from '../firebase';

interface ResizerProps {
  map: MapRepr;
  gameId: string;
}

interface ResizerState {
  rows: string;
  cols: string;
}

/**
 * A form that allows an admin to change the size of the map.
 */
export class Resizer extends React.Component<ResizerProps, ResizerState> {
  constructor(props: ResizerProps) {
    super(props);
    this.state = {
      rows: this.props.map.length.toString(),
      cols: this.props.map[0].length.toString(),
    };
  }

  rowsChanged(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({rows: event.target.value});
  }

  colsChanged(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({cols: event.target.value});
  }

  handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    var rows = parseInt(this.state.rows, 10);
    if (isNaN(rows)) {
      this.setState({rows: this.props.map.length.toString()});
      return;
    }

    var cols = parseInt(this.state.cols, 10);
    if (isNaN(cols)) {
      this.setState({cols: this.props.map[0].length.toString()});
      return;
    }

    if (rows < this.props.map.length || cols < this.props.map[0].length) {
      if (!window.confirm('Warning, the new map size is smaller than the old size. Continuing will drop tiles.')) {
        return;
      }
    }

    // Creates a new 1D representation of the resized map, filling in new tiles with ocean.
    // Building the map in 1D here is easer than building it in 2d, just to have it be flattened in the db.
    const newMap: MapRepr = [];
    for (var r = 0; r < rows; ++r) {
      newMap.push([]);
      for (var c = 0; c < cols; ++c) {
        if (r < this.props.map.length && c < this.props.map[r].length) {
          newMap[r].push(this.props.map[r][c]);
        } else {
          newMap[r].push('ocean');
        }
      }
    }

    SaveGridForGame(this.props.gameId, newMap);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label> Rows: <input type='text' value={this.state.rows} onChange={this.rowsChanged.bind(this)} /> </label>
        <label> Cols: <input type='text' value={this.state.cols} onChange={this.colsChanged.bind(this)} /> </label>
        <input type="submit" value="Resize" />
      </form>
    );
  }
}

export default Resizer;
