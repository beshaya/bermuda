import React from 'react';
import { SignInWithGoogle } from '../firebase';

export function Login() {
  return (
    <header className="App-header">
      <h1>Bermuda</h1>
      <button onClick={SignInWithGoogle}> Log In </button>
    </header>
  )
}

export default Login;
