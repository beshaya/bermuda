import React, {useContext} from 'react';
import { Redirect } from 'react-router-dom'
import './App.css';
import {SignOut } from './firebase';
import { UserContext } from "./providers/userProvider";

function App() {
    const user = useContext(UserContext);
    if (!user) {
      return <Redirect to='/login' />
    }
    console.log(user);
    return (
      <div className="App">
        <button onClick={SignOut}> Log Out </button>
        <header className="App-header">
          <h1>Bermuda</h1>
          Welcome {user.displayName}
        </header>
     </div>
  );
}

export default App;
