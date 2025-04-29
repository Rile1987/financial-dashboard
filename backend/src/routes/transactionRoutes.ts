import { Router } from "express";
import { createTransaction, deleteTransaction, getTransactions, updateTransaction } from "../controllers/transactionController";

const router = Router();

router.get("/transactions", getTransactions);
router.post("/transactions", createTransaction);
router.put("/transactions/:id", updateTransaction);
router.delete("/transactions/:id", deleteTransaction);

export default router;