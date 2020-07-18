export interface UserData {
  user: firebase.User;
  game_id: string;
  ship_id: string;
  ship_name: string;
  db_user: DbUser;
}

export interface DbUser {
  admin: boolean;
}

export function NewDbUser(): DbUser {
  return {admin: false};
}
