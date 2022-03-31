import { Leaderboard, LeaderboardWithPosition } from "./Leaderboard";
import { Transaction } from "./Transaction";

export interface BasicUser {
  id: string;
  uuid: string;
  name: string;
  amount: number;
  departmentId: string;
  leaderboard: Leaderboard[];
  transactions: Transaction[];
}

export interface User extends BasicUser {
  leaderboard: LeaderboardWithPosition[];
}
