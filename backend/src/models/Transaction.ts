export interface Transaction {
  id: string;
  amount: number;
  date: string; // ISO format "YYYY-MM-DD"
  category: string;
  status: "pending" | "completed";
}