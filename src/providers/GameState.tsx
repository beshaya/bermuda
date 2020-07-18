import { UserData } from './UserData';
import { MapRepr, TileDict } from '../firebase';

export interface RouterState {
  user: null | UserData;
  map: MapRepr;
  tiles: TileDict;
}

export interface State {
  user: UserData;
  map: MapRepr;
  tiles: TileDict;
}
