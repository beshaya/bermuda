import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

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

export interface ShipAndGame {
  game_id: string;
  ship_id: string;
  ship_name: string;
}

export async function GetShipAndGameForUser(user: firebase.User): Promise<ShipAndGame> {
  try {
    const querySnapshot = await firestore.collection('ships').where("users", "array-contains", user.email).get();
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
    return ship_and_game;
  } catch(error) {
    return Promise.reject(error)
  }
}

// Returns a 2d Array representing the entire map. Each element in the array is a string which can be looked up in
// the Tiles dictionary.
export async function GetGridForGame(game_id: string): Promise<Array<Array<string>>> {
  try {
    const querySnapshot = await firestore.collection('maps').where('game_id', '==', game_id).get();
    if (querySnapshot.empty) {
      return Promise.reject('No map found');
    }
    const map = querySnapshot.docs[0].data();
    const flat_grid = map['grid'] as Array<string>;
    const x_size = map['x_size'] as number;
    const y_size = map['y_size'] as number;
    if (x_size * y_size !== flat_grid.length) {
      return Promise.reject('DB error: Grid size does not match specified dimensions');
    }
    const folded_grid = [];
    while(flat_grid.length) folded_grid.push(flat_grid.splice(0,y_size));
    return folded_grid;
  } catch (error) {
    return Promise.reject(error);
  }
}

// Information for rendering a single tile.
export interface Tile {
  bg_color: string;
  bg_image: string;
  description_text: string;
  hover_text: string;
  link: string;
}

// Dictionary for looking up tiles by name.
export type TileDict = {[props: string]: Tile}

// Fetches the list of all tile types in the database.
export async function GetTiles(): Promise<TileDict> {
  const querySnapshot = await firestore.collection('tiles').get();
  const result: TileDict = {};
  for (var i = 0; i < querySnapshot.size; ++i) {
    const doc = querySnapshot.docs[i];
    result[doc.id] = doc.data() as Tile;
  }
  return result;
}
