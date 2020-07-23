import React from 'react';
import * as db from "../firebase";

export function TilePicker(props: {
  tileName: string,
  tileInfo: db.TileInfo,
  map: db.MapRepr,
  tiles: db.TileDict,
  selectedRow: number,
  selectedCol: number,
  gameId: string
}) {
  const tileList = [...Object.keys(props.tiles)];
  const tiles = tileList.map( (tileName) =>
    <option value={tileName} key={tileName}>{tileName}</option>
  );
  tiles.push(<option value='Create New Tile' key='Create'>Create New Tile</option>);

  const onTileNameChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    var tileName = event.target.value;
    if (event.target.selectedIndex === tiles.length - 1) {
      // Detect the "Create" option by index rather than value in case someone creates a tile named "Create New Tile."
      const newTileName: string | null = window.prompt('New tile name:');
      if (!newTileName) {
        return;
      }
      if (tileList.includes(newTileName)) {
        window.alert('Cannot create a new tile; a tile named "' + newTileName + '" already exists.');
      } else {
        createTile(newTileName);
        tileName = newTileName;
      }
    }

    changeTile(tileName);
  };

  function changeTile(tileName: string) {
    if (!tileList.includes(tileName)) {
      createTile(tileName);
    } else {
      const row = props.selectedRow;
      const col = props.selectedCol;
      props.map[row][col] = tileName;
      const map = props.map.flat();
      db.UpdateGridForGame(props.gameId, map);
    }
  }

  function createTile(tileName: string) {
    db.AddTile(tileName, props.tileInfo);
  }

  return (
    <form className="tile-select-form">
      <label> Tile:
        <select onChange={onTileNameChanged} value={props.tileName}>
          {tiles}
        </select>
      </label>
    </form>
  );
}

export default TilePicker;
