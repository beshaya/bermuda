export interface PlayerData {
  game_id: string;
  ship_id: string;
  ship_name: string;
}

export interface DbUser {
  admin: boolean;
  last_game: string;
  email: string;
}

export function NewDbUser(email: string): DbUser {
  return {admin: false, last_game: '', email};
}
