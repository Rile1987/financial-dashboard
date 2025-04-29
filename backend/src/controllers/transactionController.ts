import { Request, Response } from "express";
import { loadTransactions, saveTransactions } from "../db/transactionStore";
import { Transaction } from "../models/Transaction";
import { RequestHandler } from "express";

export const getTransactions = (req: Request, res: Response) => {
  const transactions = loadTransactions();
  res.json(transactions);
};

export const createTransaction = (req: Request, res: Response) => {
  const transactions = loadTransactions();
  const { amount, date, category, status } = req.body;

  const newTransaction: Transaction = {
    id: Date.now().toString(),
    amount,
    date,
    category,
    status
  };

  transactions.push(newTransaction);
  saveTransactions(transactions);

  res.status(201).json(newTransaction);
};

export const updateTransaction: RequestHandler = (req, res) => {
  const transactions = loadTransactions();
  const { id } = req.params;
  const { amount, date, category, status } = req.body;

  const index = transactions.findIndex(t => t.id === id);

  if (index === -1) {
    res.status(404).json({ message: "Transaction not found" });
    return;
  }

  transactions[index] = { ...transactions[index], amount, date, category, status };
  saveTransactions(transactions);

  res.json(transactions[index]);
};

export const deleteTransaction: RequestHandler = (req, res) => {
  const transactions = loadTransactions();
  const { id } = req.params;

  const newTransactions = transactions.filter(t => t.id !== id);

  if (newTransactions.length === transactions.length) {
    res.status(404).json({ message: "Transaction not found" });
    return;
  }

  saveTransactions(newTransactions);

  res.status(204).send();
};