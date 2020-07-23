import * as React from 'react';
import { TileInfo } from '../firebase';

export function Tile(props: {tileInfo: TileInfo, selected: boolean, onClick: () => void}) {
  const borderColor = props.selected ? "yellow" : "transparent";
  const style: {[props: string]: string} = {
    backgroundColor: props.tileInfo.bg_color,
    borderStyle: "solid",
    borderColor: borderColor,
  };
  if (props.tileInfo.bg_image) {
    style['backgroundImage'] = `url(https://raw.githubusercontent.com/beshaya/bermuda/master/src/assets/tiles/${props.tileInfo.bg_image})`;
  }


  return (
    <td
      className={props.selected ? "tile selected" : "tile"}
      onClick={(event) => {
        event.stopPropagation();
        props.onClick();
      }}
      style={style}>
      <div className="hover"> {props.tileInfo.hover_text} </div>
    </td>
  );
}

export default Tile;
