import * as React from 'react';
import Tile from './Tile';
import { MapRepr, TileDict } from '../firebase';
import '../styles/Map.css';

export function Map(props: {map: MapRepr, tiles: TileDict, selectedRow?: number, selectedCol?: number, onClick: (row: number, col: number) => void}) {
  function renderTiles() {
    const map = [];

    for (let r = 0; r < props.map.length; r++) {
      const tiles = [];
      for (let c = 0; c < props.map[r].length; c++) {
        const selected = (r === props.selectedRow && c === props.selectedCol);
        tiles.push(<Tile key={r+','+c} tileInfo={props.tiles[props.map[r][c]]} selected={selected} onClick={() => props.onClick(r, c)} />);
      }
      map.push(<tr key={r}>{tiles}</tr>);
    }

    return <tbody>{map}</tbody>;
  }

  return (
    <table id="map" className="map">
      {renderTiles()}
    </table>
  );
}

export default Map;
