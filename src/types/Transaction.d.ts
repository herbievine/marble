export enum TransactionType {
  COLLECT = "COLLECT",
  REDEEM = "REDEEEM",
}

export interface Transaction {
  uuid: string;
  timestamp: string;
  type: TransactionType;
  amount: number;
}
