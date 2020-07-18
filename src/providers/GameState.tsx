import { UserData } from './UserData';
import { MapRepr, TileDict } from '../firebase';

export interface State {
  user: UserData;
  map: MapRepr;
  tiles: TileDict;
}
