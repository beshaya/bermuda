import React, {FunctionComponent} from 'react';
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
  unsubscribeMap = ()=>{};
  unsubscribeTiles = ()=>{};

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

      this.unsubscribeMap = db.SubscribeToMap(user.game_id, (map: db.MapRepr) => {
        this.setState({ map: map });
      });

      this.unsubscribeTiles = db.SubscribeToTiles((tiles: db.TileDict) => {
        this.setState({ tiles: tiles });
      });

      this.setState({ user });
    });
  };

  componentWillUnmount() {
    this.unsubscribeTiles();
    this.unsubscribeMap();
  }

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
    if (this.state.map.length === 0 || Object.keys(this.state.tiles).length === 0) {
      // Don't try to render the map until we load it!
      return (<div>Loading...</div>);
    }
    // Reassign from RouterState to State to convert user from <User | null> to <User>
    const resolvedState: State = {user: this.state.user, map: this.state.map, tiles: this.state.tiles};
    return (
      <BrowserRouter>
        <Switch>
          <AdminRoute user={this.state.user} path='/admin'><Admin {...resolvedState} /></AdminRoute>
          <Route path='/game'><App {...resolvedState} /></Route>
          <Route path='/'>{this.redirectOnLogin()}</Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

type AuthRouteProps = {
  user: UserData;
  path: string;
}

const AdminRoute: FunctionComponent<AuthRouteProps> = ({children, user, path}) => {
  return (
    <Route
      path={path}
      render={({ location }) =>
        user.db_user.admin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/game',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default Router;
