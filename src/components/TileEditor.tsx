import React from 'react';
import * as db from "../firebase";
import { TilePicker } from './TilePicker';
import { useForm } from "react-hook-form";

export function TileEditor(props: {
  tileName: string,
  tileInfo: db.TileInfo,
  map: db.MapRepr,
  tiles: db.TileDict,
  selectedRow?: number,
  selectedCol?: number,
  gameId: string
}) {
  const { register, handleSubmit } = useForm<db.TileInfo>();
  const onSubmit = handleSubmit(async (tileInfo: db.TileInfo) => {
    db.UpdateTile(props.tileName, tileInfo);
  });

  return (
    <div>
      <TilePicker
        tileName={props.tileName}
        tileInfo={props.tileInfo}
        map={props.map}
        tiles={props.tiles}
        selectedRow={props.selectedRow}
        selectedCol={props.selectedCol}
        gameId={props.gameId} />
      <form onSubmit={onSubmit}>
        <label>Color
          <input
            name="bg_color"
            type="text"
            key={`bg_color:${props.tileInfo.bg_color}`}
            defaultValue={props.tileInfo.bg_color}
            ref={register}
          />
        </label>
        <br />
        <label>Image
          <input
            name="bg_image"
            type="text"
            key={`bg_image:${props.tileInfo.bg_image}`}
            defaultValue={props.tileInfo.bg_image}
            ref={register}
          />
        </label>
        <br />
        <label>Hover Text
          <input
            name="hover_text"
            type="text"
            key={`hover_text:${props.tileInfo.hover_text}`}
            defaultValue={props.tileInfo.hover_text}
            ref={register}
          />
        </label>
        <label>Link
          <input
            name="link"
            type="text"
            key={`link:${props.tileInfo.link}`}
            defaultValue={props.tileInfo.link}
            ref={register} />
        </label>
        <br />
        <br />
        <label>Description Text
          <textarea
            name="description_text"
            key={`description_text:${props.tileInfo.description_text}`}
            defaultValue={props.tileInfo.description_text}
            ref={register}
          />
        </label>
        <br />
        <input type="submit" value="Update Tile" />
      </form>
    </div>
  );
};

export default TileEditor;
