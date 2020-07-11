import React, {useContext} from 'react';
import { Redirect } from 'react-router-dom';

import { UserContext } from "../providers/userProvider";
import { SignInWithGoogle } from '../firebase';

export function Login() {
    const user = useContext(UserContext);
    if (user) {
        return <Redirect to='/' />
    }
    return (
        <header className="App-header">
        <h1>Bermuda</h1>
        <button onClick={SignInWithGoogle}> Login </button>
        </header>
    )
}

export default Login;
