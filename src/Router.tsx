import React from 'react';
import {
  BrowserRouter,
  Route
} from "react-router-dom";
import App from './App';
import Login from './components/login';
import { UserData } from './providers/UserData';
import { auth, GetShipAndGameForUser, ShipAndGame } from "./firebase";

export class Router extends React.Component<{}, {user: null | UserData}> {
  constructor() {
    super({});
    this.state = {user: null};
  }

  componentDidMount = () => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (!userAuth) {
        this.setState({ user: null });
        return;
      }
      const ship_and_game: ShipAndGame = await GetShipAndGameForUser(userAuth);
      const user_data = {user: userAuth, ...ship_and_game}
      this.setState({ user: user_data });
    });
  };

  render() {
    if (!this.state.user) {
      return (<Login></Login>)
    }
    return (
      <BrowserRouter>
        <Route path="/"><App userData={this.state.user} /></Route>
      </BrowserRouter>
    )
  }
}

export default Router;
