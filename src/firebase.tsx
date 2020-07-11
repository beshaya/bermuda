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
    console.log(user);
});

const provider = new firebase.auth.GoogleAuthProvider();

export const SignInWithGoogle = () => {
    auth.signInWithPopup(provider);
};

export const SignOut = () => {
    auth.signOut();
}

export function Login() {
    console.log(user);
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