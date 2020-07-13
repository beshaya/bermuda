import React, { Component, createContext } from "react";
import { auth, GetShipAndGameForUser, ShipAndGame } from "../firebase";

interface UserData {
  user: firebase.User;
  game_id: string;
  ship_id: string;
  ship_name: string;
}

export const UserContext = createContext<null | UserData>(null);
class UserProvider extends Component<{}, {user: null | UserData}> {
  state = {
    user: null
  };

  componentDidMount = () => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (!userAuth) {
        this.setState({ user: null });
        return;
      }
      const ship_and_game = await GetShipAndGameForUser(userAuth);
      const user_data = {user: userAuth, ...ship_and_game}
      this.setState({ user: user_data });
    });
  };
  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export default UserProvider;