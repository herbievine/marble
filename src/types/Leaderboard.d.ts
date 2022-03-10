export interface Leaderboard {
  uuid: string;
  title: string;
  amount: number;
}

export interface LeaderboardWithPosition extends Leaderboard {
  position: number;
}
