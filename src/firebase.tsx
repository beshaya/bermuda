import React from 'react';
import { Redirect } from 'react-router-dom'
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDqAp9356bLfSL-IhTX2NMTcerekmCTYgk",
    authDomain: "bermuda-6e374.firebaseapp.com",
    databaseURL: "https://bermuda-6e374.firebaseio.com",
    projectId: "bermuda-6e374",
    storageBucket: "bermuda-6e374.appspot.com",
    messagingSenderId: "1093935326369",
    appId: "1:1093935326369:web:d1660d17eb45f22a8efce0",
    measurementId: "G-LFVJCPWDCY"
};
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export var user: firebase.User | null = null;

auth.onAuthStateChanged(userAuth => {
  user = userAuth;
});

const provider = new firebase.auth.GoogleAuthProvider();

export const SignInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const SignOut = () => {
  auth.signOut();
}

export function Login() {
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

export interface ShipAndGame {
  game_id: string;
  ship_id: string;
  ship_name: string;
}

export async function GetShipAndGameForUser(user: firebase.User): Promise<ShipAndGame> {
  try {
    const querySnapshot: firebase.firestore.QuerySnapshot = await firestore.collection('ships').where("users", "array-contains", user.email).get();
    if (querySnapshot.empty) {
      console.warn('User is not assigned to any ships');
      return Promise.reject('User is not assigned to any ships');
    }
    if (querySnapshot.size > 1) {
      console.warn('User is assigned to multiploe ships. This is not currently supported, using the first ship.');
    }
    const ship_id = querySnapshot.docs[0].id;
    const ship_info = querySnapshot.docs[0].data();
    const game_id = ship_info['game_id'] as string;
    const ship_name = ship_info['display_name'] as string;
    const ship_and_game = {ship_id, game_id, ship_name}
    return Promise.resolve(ship_and_game);
  } catch(error) {
    return Promise.reject(error)
  }
}

export default Login;