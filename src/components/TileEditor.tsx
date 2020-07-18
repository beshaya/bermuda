import React from 'react';
import { TileInfo } from '../firebase';

export function TileEditor(props: {tileInfo: TileInfo, tileName: string}) {
  return (
    <div>
      <h2>Tile: {props.tileName}</h2>
      <h3>Hover Text: {props.tileInfo.hover_text}</h3>
      <h3>Description: {props.tileInfo.description_text}</h3>
    </div>
  );
}

export default TileEditor;
