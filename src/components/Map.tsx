import * as React from 'react';
import Tile from './Tile';
import { MapRepr, TileDict } from '../firebase';
import '../styles/Map.css';
  
export function Map(props: {map: MapRepr, tiles: TileDict}) {
  function renderTiles() {
    const map = [];

    for (let r = 0; r < props.map.length; r++) {
      const tiles = [];
      for (let c = 0; c < props.map[r].length; c++) {
        tiles.push(<Tile key={r+','+c} tileInfo={props.tiles[props.map[r][c]]} />);
      }
      map.push(<tr key={r}>{tiles}</tr>);
    }
    return <tbody>{map}</tbody>;
  }

  return (
    <table className="map">
      {renderTiles()}
    </table>
  );
}
  
export default Map;
