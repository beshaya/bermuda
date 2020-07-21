import React from 'react';
import Tile from './Tile';
import * as db from "../firebase";

export function TilePicker(props: {tileName: string, map: db.MapRepr, tiles: db.TileDict, selectedRow?: number, selectedCol?: number, gameId: string}) {
  const tileList = ["Create Tile", ...Object.keys(props.tiles)]
  const tiles = tileList.map( (tileName) =>
    <option key={tileName}>{tileName}</option>
  )

  function changeTile(tileName: string) {
    const row = props.selectedRow;
    const col = props.selectedCol;
    if (row != undefined && col != undefined) {
      props.map[row][col] = tileName
      const map = props.map.flat();
      db.UpdateGridForGame(props.gameId, map)
    }
  }

  return (
    <div>
      <h2>Tile: {props.tileName}</h2>
      <select
        defaultValue={props.tileName} 
        onChange={e => changeTile(e.currentTarget.value)}
      >
        {tiles}
      </select>
    </div>
  );
}

export default TilePicker;