export interface PlayerData {
  game_id: string;
  ship_id: string;
  ship_name: string;
}

export interface DbUser {
  admin: boolean;
  last_game: string;
  email: string;
  gm: boolean;
}

export function NewDbUser(email: string): DbUser {
  return {admin: false, last_game: '', email, gm: false};
}
