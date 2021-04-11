import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { PlayerData, NewDbUser, DbUser } from './providers/UserData';

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
};

export async function GetDbUser(user: firebase.User): Promise<DbUser> {
  if (!user.email) {
    return Promise.reject('User has no associated email');
  }

  const db_user = NewDbUser(user.email);
  const userDoc = await firestore.collection('users').doc(user.email).get();
  if (userDoc.exists) {
    const userDocData = userDoc.data();
    if (userDocData) {
      db_user.admin = (userDocData['admin'] === true);
      db_user.last_game = userDocData['last_game'] as string;
      db_user.gm = !!userDocData['gm'];
    }

    if (db_user.admin && ! db_user.last_game) {
      // Admins need to know which game to load. Pick the first game as the default.
      // TODO(Ben): They don't really. Just go to a blank admin page.
      db_user.last_game = (await firestore.collection('games').get()).docs[0].id;
    }
  }
  return db_user;
}

export async function GetPlayerData(email: string): Promise<PlayerData> {
  try {
    const querySnapshot = await firestore.collection('ships').where("users", "array-contains", email).get();
    if (querySnapshot.empty) {
      console.warn('User is not assigned to any ships');
      return Promise.reject('User is not assigned to any ships');
    }
    if (querySnapshot.size > 1) {
      console.warn('User is assigned to multiple ships. This is not currently supported; using the first ship.');
    }
    const ship_id = querySnapshot.docs[0].id;
    const ship_info = querySnapshot.docs[0].data();
    const game_id = ship_info['game_id'] as string;
    const ship_name = ship_info['display_name'] as string;
    const user_data: PlayerData = {ship_id, game_id, ship_name};

    return user_data;
  } catch(error) {
    return Promise.reject(error);
  }
}

export type MapRepr = Array<Array<string>>

// Returns a 2d Array representing the entire map. Each element in the array is a string which can be looked up in
// the Tiles dictionary.
export function SubscribeToMap(game_id: string, onNewMap: (map: MapRepr, error?: Error) => void): VoidFunction {
  return firestore.collection('maps').where('game_id', '==', game_id).onSnapshot((querySnapshot) => {
    if (querySnapshot.empty) {
      console.warn('No map found for game ' + game_id);
      onNewMap([], Error('No map found for game ' + game_id));
      return;
    }
    const map = querySnapshot.docs[0].data();
    const flat_grid = map['grid'] as Array<string>;
    const rows = map['rows'] as number;
    const cols = map['cols'] as number;
    if (rows * cols !== flat_grid.length) {
      console.error('DB error: Grid size does not match specified dimensions');
      onNewMap([]);
      return;
    }
    const folded_grid = [];
    while(flat_grid.length) folded_grid.push(flat_grid.splice(0,cols));
    onNewMap(folded_grid);
  });
}

export async function SaveGridForGame(game_id: string, newMap: MapRepr) {
  const querySnapshot = await firestore.collection('maps').where('game_id', '==', game_id).get();
  const map_id = querySnapshot.docs[0].id;
  const doc = firestore.collection('maps').doc(map_id);
  const flatMap = newMap.flat();
  await doc.update({
    rows: newMap.length,
    cols: newMap[0].length,
    grid: flatMap,
  });
}

// Information for rendering a single tile.
export interface TileInfo {
  bg_color: string;
  bg_image: string;
  description_text: string;
  hover_text: string;
  link: string;
  classified: boolean;
}

// Dictionary for looking up tiles by name.
export type TileDict = {[props: string]: TileInfo}

// Fetches the list of all tile types in the database.
export function SubscribeToTiles(onNewTiles: (newTiles: TileDict) => void ): VoidFunction {
  return firestore.collection('tiles').onSnapshot((querySnapshot) => {
    const result: TileDict = {};
    for (var i = 0; i < querySnapshot.size; ++i) {
      const doc = querySnapshot.docs[i];
      result[doc.id] = doc.data() as TileInfo;
    }
    onNewTiles(result);
  });
}

// Adds tile with specified properties
export async function AddTile(tileName: string, tileInfo: TileInfo) {
  await firestore.collection("tiles").doc(tileName).set(tileInfo);
}

// Updates tile properties
export async function UpdateTile(tileName: string, tileInfo: TileInfo) {
  const tile = firestore.collection("tiles").doc(tileName);
  try {
    await tile.update(tileInfo);
  } catch {
    console.error("Update failed");
  }
}

export async function GetGamesList(): Promise<Array<string>> {
  const games = await firestore.collection('games').get();
  return games.docs.map((doc) => doc.id);
}

export async function SetGameForAdmin(game: string) {
  if (!auth.currentUser || !auth.currentUser.email) {
    console.warn('Attempted to update user without a user logged in?!');
    return;
  }
  await firestore.collection('users').doc(auth.currentUser.email)
    .update({last_game: game});
}
