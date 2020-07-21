import React from 'react';
import * as db from "../firebase";
import { Console } from 'console';

export function TilePicker(props: {tileName: string, map: db.MapRepr, tiles: db.TileDict, selectedRow?: number, selectedCol?: number, gameId: string}) {
  const tileList = ["Create Tile", ...Object.keys(props.tiles)]
  const tiles = tileList.map( (tileName) =>
    <option key={tileName}>{tileName}</option>
  )

  function changeTile(tileName: string) {
    if (!tileList.includes(tileName)) {
      return null
    } else if (tileName === "Create Tile") {
      createTile()
    } else {
    const row = props.selectedRow;
    const col = props.selectedCol;
    if (row != undefined && col != undefined) {
      props.map[row][col] = tileName
      const map = props.map.flat();
      db.UpdateGridForGame(props.gameId, map)
    }}
  }

  function createTile() {
    console.log("New Tile!")
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