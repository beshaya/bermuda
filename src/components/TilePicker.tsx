import React from 'react';
import * as db from "../firebase";

export function TilePicker(props: {tileName: string, tiles: db.TileDict}) {
  const tileList = Object.keys(props.tiles)
  const tiles = tileList.map( (tileName) =>
    <option key={tileName}>{tileName}</option>
  )

  return (
    <div>
      <h2>Tile: {props.tileName}</h2>
      <select defaultValue={props.tileName} >
        {tiles}
      </select>
    </div>
  );
}

export default TilePicker;