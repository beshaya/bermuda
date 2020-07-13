import * as React from 'react';
import { TileInfo } from '../firebase';

export function Tile(props: {tileInfo: TileInfo}) {
  return (
    <td className="tile" style={{backgroundColor: props.tileInfo.bg_color}}>
      <div className="hover"> {props.tileInfo.hover_text} </div>
    </td>
  );
}
  
export default Tile;
