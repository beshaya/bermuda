import React from 'react';
import * as db from "../firebase";

export function TilePicker(props: {
  tileName: string,
  tileInfo: db.TileInfo,
  map: db.MapRepr,
  tiles: db.TileDict,
  selectedRow: number,
  selectedCol: number,
  gameId: string,
  showClassified: boolean
}) {
  const tileList = [...Object.keys(props.tiles)];
  var reducedList = tileList;
  if (!props.showClassified) {
    reducedList = tileList.filter((tileName: string) => !props.tiles[tileName].classified);
  }
  const tiles = reducedList.map( (tileName) =>
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
    // Make a copy of the map so we don't modify props.
    const newMap = props.map.map((value: Array<string>) => [...value]);
    newMap[props.selectedRow][props.selectedCol] = tileName;
    db.SaveGridForGame(props.gameId, newMap);
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
