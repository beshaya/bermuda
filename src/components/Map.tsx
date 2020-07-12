import * as React from 'react';
import Tile from './Tile';
import '../styles/Map.css';
  
export const Map:React.FunctionComponent<{}> = () => {
  const [rows] = React.useState(9);
  const [columns] = React.useState(9);
  const [tiles] = React.useState(9);

    return (
      <table className="Map">
        <tbody>
          rows = {rows}<br />
          columns = {columns}<br />
          tiles = {tiles}<br />
          <tr><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /></tr>
          <tr><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /></tr>
          <tr><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /></tr>
          <tr><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /></tr>
          <tr><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /></tr>
          <tr><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /></tr>
          <tr><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /></tr>
          <tr><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /></tr>
          <tr><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /><Tile /></tr>
        </tbody>
      </table>
    );
  }
  
  export default Map;