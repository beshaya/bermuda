import * as React from 'react';
import { TileInfo } from '../firebase';

export function Tile(props: {tileInfo: TileInfo, selected: boolean, onClick: () => void}) {
  const borderColor = props.selected ? "yellow" : "transparent";

  return (
    <td
      className={props.selected ? "tile selected" : "tile"}
      onClick={props.onClick}
      style={{
        backgroundColor: props.tileInfo.bg_color, 
        backgroundImage: `url(https://raw.githubusercontent.com/beshaya/bermuda/master/src/assets/tiles/${props.tileInfo.bg_image})`,
        borderStyle: "solid",
        borderColor: borderColor, 
        }}>
      <div className="hover"> {props.tileInfo.hover_text} </div>
    </td>
  );
}

export default Tile;
