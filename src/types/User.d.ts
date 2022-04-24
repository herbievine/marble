import { Leaderboard, LeaderboardWithPosition } from "./Leaderboard";
import { Transaction } from "./Transaction";

export interface BasicUser {
  uuid: string;
  username: string;
  amount: number;
  [string]: string;
  // departmentId: string;
  // leaderboard: Leaderboard[];
  // transactions: Transaction[];
}

export interface User extends BasicUser {
  // leaderboard: LeaderboardWithPosition[];
}
