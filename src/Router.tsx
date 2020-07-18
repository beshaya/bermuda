import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import App from './App';
import Login from './components/login';
import Admin from './components/admin';
import { State } from './providers/GameState';
import { UserData } from './providers/UserData';
import * as db from "./firebase";

export interface RouterState {
  user: null | UserData;
  map: db.MapRepr;
  tiles: db.TileDict;
}

export class Router extends React.Component<{}, RouterState> {
  constructor(props: {}) {
    super(props);
    this.state = {user: null, map: [], tiles: {}};
  }

  componentDidMount = () => {
    db.auth.onAuthStateChanged(async (userAuth) => {
      if (!userAuth) {
        this.setState({ user: null });
        return;
      }
      const user = await db.GetUserData(userAuth);
      const map = await db.GetGridForGame(user.game_id);
      const tiles = await db.GetTiles();

      this.setState({ user, map, tiles });
    });
  };

  redirectOnLogin() {
    if (this.state.user && this.state.user.db_user.admin) {
      return (<Redirect to='/admin' />);
    } else {
      return (<Redirect to='/game' />);
    }
  }
  render() {
    if (!this.state.user) {
      return (<Login></Login>);
    }
    // Reassign from RouterState to State to convert user from <User | null> to <User>
    const resolvedState: State = {user: this.state.user, map: this.state.map, tiles: this.state.tiles};
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/admin'><Admin {...resolvedState} /></Route>
          <Route path='/game'><App {...resolvedState} /></Route>
          <Route path='/'>{this.redirectOnLogin()}</Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
