import { Leaderboard, LeaderboardWithPosition } from "./Leaderboard";
import { Transaction } from "./Transaction";

export interface NakedUser {
  id: string;
  uuid: string;
  name: string;
  amount: number;
  departmentId: string;
  leaderboard: Leaderboard[];
  transactions: Transaction[];
}

export interface User extends NakedUser {
  leaderboard: LeaderboardWithPosition[];
}
