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
import { DbUser } from './providers/UserData';
import * as db from "./firebase";
import firebase from 'firebase/app';

export interface RouterState {
  userAuth: null | firebase.User;
  db_user: null | DbUser;
  tiles: db.TileDict;
}

export class Router extends React.Component<{}, RouterState> {
  unsubscribeTiles = ()=>{};

  constructor(props: {}) {
    super(props);
    this.state = {userAuth: null, db_user: null, tiles: {}};
  }

  componentDidMount = () => {
    db.auth.onAuthStateChanged(async (userAuth) => {
      if (!userAuth) {
        this.setState({ userAuth: null, db_user: null });
        return;
      }

      this.unsubscribeTiles = db.SubscribeToTiles((tiles: db.TileDict) => {
        this.setState({ tiles: tiles });
      });

      const db_user = await db.GetDbUser(userAuth);

      this.setState({ userAuth, db_user });
    });
  };

  componentWillUnmount() {
    this.unsubscribeTiles();
  }

  redirectOnLogin() {
    if (this.state.db_user && this.state.db_user.admin) {
      return (<Redirect to={'/admin/' + this.state.db_user.last_game} />);
    } else {
      return (<Redirect to='/game' />);
    }
  }

  render() {
    if (!this.state.userAuth || !this.state.db_user) {
      return (<Login></Login>);
    }
    if (Object.keys(this.state.tiles).length === 0) {
      // Don't try to render the map until we load it!
      return (<div>Loading...</div>);
    }
    return (
      <BrowserRouter>
        <Switch>
          <AdminRoute db_user={this.state.db_user} path='/admin/:game_id' tiles={this.state.tiles}></AdminRoute>
          <Route path='/game'><App user={this.state.db_user} tiles={this.state.tiles} /></Route>
          <Route path='/'>{this.redirectOnLogin()}</Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

type AuthRouteProps = {
  db_user: DbUser;
  path: string;
  tiles: db.TileDict
}

const AdminRoute: FunctionComponent<AuthRouteProps> = ({db_user, path, tiles}) => {
  return (
    <Route
      path={path}
      render={(props) =>
        db_user.admin ? (
          <Admin user={db_user} tiles={tiles} gameId={props.match.params.game_id}></Admin>
        ) : (
          <Redirect
            to={{
              pathname: '/game',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default Router;
