import { Transaction } from "../models/Transaction";
import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "transactions.json");

export const loadTransactions = (): Transaction[] => {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

export const saveTransactions = (transactions: Transaction[]) => {
  fs.writeFileSync(filePath, JSON.stringify(transactions, null, 2));
};