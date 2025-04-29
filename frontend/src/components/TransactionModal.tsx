import { useState, useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: { amount: number; date: string; category: string; status: "pending" | "completed"; }) => void;
  initialData?: {
    amount: number;
    date: string;
    category: string;
    status: "pending" | "completed";
  };
}

function TransactionModal({ isOpen, onClose, onSave, initialData }: Props) {
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [status, setStatus] = useState<"pending" | "completed">("pending");

  useEffect(() => {
    if (initialData) {
      setAmount(initialData.amount);
      setDate(initialData.date);
      setCategory(initialData.category);
      setStatus(initialData.status);
    } else {
      setAmount(0);
      setDate(new Date().toISOString().split('T')[0]);
      setCategory("");
      setStatus("pending");
    }
  }, [initialData]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", minWidth: "300px" }}>
        <h2>{initialData ? "Edit Transaction" : "Add Transaction"}</h2>

        <div style={{ marginBottom: "10px", marginRight: "20px" }}>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px", marginRight: "20px" }}>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px", marginRight: "20px" }}>
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: "100%", padding: "8px"}}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "pending" | "completed")}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ marginRight: "10px" }}>Cancel</button>
          <button onClick={() => onSave({ amount, date, category, status })}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default TransactionModal;