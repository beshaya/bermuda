import * as React from 'react';
import '../styles/Tile.css';

export const Tile:React.FunctionComponent<{ initial?: string }> = ({ initial = "" }) => {
  const [notes] = React.useState(initial);

    return (
        <td className="Tile">
            {notes}
        </td>
    );
  }
  
export default Tile;
