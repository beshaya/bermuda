import * as React from 'react';
import { TileInfo } from '../firebase';

export function Tile(props: {tileInfo: TileInfo, selected: boolean, onClick: () => void}) {
  return (
    <td className={props.selected ? "tile selected" : "tile"} onClick={props.onClick} style={{backgroundColor: props.tileInfo.bg_color}}>
      <div className="hover"> {props.tileInfo.hover_text} </div>
    </td>
  );
}

export default Tile;
