import { Leaderboard } from "./Leaderboard";
import { Transaction } from "./Transaction";

export interface User {
  id: string;
  uuid: string;
  name: string;
  amount: number;
  departmentId: string;
  leaderboard: Leaderboard[];
  transactions: Transaction[];
}
