import { useEffect, useState } from "react";
import { api } from "../services/api";
import TransactionModal from "../components/TransactionModal";

interface Transaction {
  id: string;
  amount: number;
  date: string;
  category: string;
  status: "pending" | "completed";
}

function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransactionId, setEditingTransactionId] = useState<string | null>(null);
  const [initialFormData, setInitialFormData] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [transactions, categoryFilter, statusFilter]);

  const fetchTransactions = async () => {
    try {
      const response = await api.get<Transaction[]>("/transactions");
      setTransactions(response.data);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    }
  };

  const applyFilters = () => {
    let filtered = [...transactions];

    if (categoryFilter) {
      filtered = filtered.filter(tx => tx.category === categoryFilter);
    }
    if (statusFilter) {
      filtered = filtered.filter(tx => tx.status === statusFilter);
    }

    setFilteredTransactions(filtered);
  };

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };
  
  const handleDeleteTransaction = async (id: string) => {
    try {
      await api.delete(`/transactions/${id}`);
      fetchTransactions(); // refresh after deleting
    } catch (error) {
      console.error("Failed to delete transaction", error);
    }
  };

  const openModalForAdd = () => {
    setEditingTransactionId(null);
    setInitialFormData(null);
    setIsModalOpen(true);
  };
  
  const openModalForEdit = (transaction: Transaction) => {
    setEditingTransactionId(transaction.id);
    setInitialFormData(transaction);
    setIsModalOpen(true);
  };
  
  const handleSaveTransaction = async (data: { amount: number; date: string; category: string; status: "pending" | "completed" }) => {
    try {
      if (editingTransactionId) {
        await api.put(`/transactions/${editingTransactionId}`, data);
      } else {
        await api.post("/transactions", data);
      }
      setIsModalOpen(false);
      fetchTransactions();
    } catch (error) {
      console.error("Failed to save transaction", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTransaction}
        initialData={initialFormData}
      />
      <h1>Transactions</h1>

      <button onClick={() => openModalForAdd()} style={{ marginBottom: "20px" }}>
        Add New Transaction
      </button>

      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px"
        }}
      >
        <div style={{ flex: "1 1 150px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Category:</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="">All</option>
            <option value="Food">Food</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div style={{ flex: "1 1 150px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", minWidth: "600px" }} border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.map((tx) => (
              <tr key={tx.id}>
                <td>{tx.id}</td>
                <td>{tx.amount}</td>
                <td>{tx.date}</td>
                <td>{tx.category}</td>
                <td>{tx.status}</td>
                <td>
                  <button onClick={() => openModalForEdit(tx)}>Edit</button>
                  <button onClick={() => handleDeleteTransaction(tx.id)} style={{ marginLeft: "10px" }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index + 1)}
              disabled={currentPage === index + 1}
              style={{
                padding: "8px 12px",
                backgroundColor: currentPage === index + 1 ? "#333" : "#fff",
                color: currentPage === index + 1 ? "#fff" : "#333",
                border: "1px solid #333",
                cursor: "pointer"
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TransactionsPage;