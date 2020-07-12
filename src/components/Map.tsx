import * as React from 'react';
import Tile from './Tile';
import '../styles/Map.css';
  
export const Map:React.FunctionComponent<{}> = () => {
  const [rows] = React.useState(9);
  const [columns] = React.useState(9);

  function renderTiles() {
    let map = []

    for (let r = 0; r < rows; r++) {
      let tiles = []
      for (let c = 0; c < columns; c++) {
        tiles.push(<Tile key={r+','+c} />)
      }
      map.push(<tr key={r}>{tiles}</tr>)
    }
    return <tbody>{map}</tbody>;
  }

    return (
      <table className="Map">
        {renderTiles()}
      </table>
    );
  }
  
  export default Map;
