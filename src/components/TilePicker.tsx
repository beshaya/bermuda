import React from 'react';
import * as db from "../firebase";
import { useForm } from "react-hook-form";

export function TilePicker(props: {tileName: string, map: db.MapRepr, tiles: db.TileDict, selectedRow?: number, selectedCol?: number, gameId: string}) {
  const { register, handleSubmit } = useForm<{tileName: string}>();

  const tileList = [...Object.keys(props.tiles)]
  const tiles = tileList.map( (tileName) =>
    <option key={tileName}>{tileName}</option>
  )

  const onSubmit = handleSubmit(async ({tileName}) => {
    changeTile(tileName);
  });

  function changeTile(tileName: string) {
    if (!tileList.includes(tileName)) {
      createTile(tileName);
    } else {
      const row = props.selectedRow;
      const col = props.selectedCol;
      if (row !== undefined && col !== undefined) {
        props.map[row][col] = tileName;
        const map = props.map.flat();
        db.UpdateGridForGame(props.gameId, map);
      }}
  }

  function createTile(tileName: string) {
    console.log(tileName);
  }

  return (
    <form onSubmit={onSubmit}>
      <label> Tile:
        <input name="tileName" type="text" list="tiles" defaultValue={props.tileName} ref={register} />
        <datalist id="tiles">{tiles}</datalist>
      </label>
    </form>
  )
}

export default TilePicker;
