import React, { useEffect, useState } from "react";
import api from "../services/api";

const Dashboard = () => {
  const [senderId, setSenderId] = useState("1"); // default for demo
  const [receiverId, setReceiverId] = useState("2");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [transactions, setTransactions] = useState([]);

  // Fetch transaction history
  const fetchTransactions = async () => {
    try {
      const response = await api.get(`/transactions/${senderId}`);
      setTransactions(response.data);
    } catch (error) {
      console.error("Failed to fetch transactions");
    }
  };

  // Load history on page load
  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleTransfer = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post("/transfer", {
        senderId: Number(senderId),
        receiverId: Number(receiverId),
        amount: Number(amount),
      });

      setMessage("✅ Transfer successful");
      setAmount("");

      // Refresh history after transfer
      fetchTransactions();
    } catch (error) {
      setMessage(
        error.response?.data?.error || "❌ Transfer failed"
      );
    }
  };

  return (
    <div className="container">
      <h1>Transaction Dashboard</h1>

      {/* Transfer Card */}
      <div className="card">
        <h2>Transfer Funds</h2>

        <form onSubmit={handleTransfer}>
          <input
            type="number"
            placeholder="Sender ID"
            value={senderId}
            onChange={(e) => setSenderId(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Receiver ID"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <button type="submit">Transfer</button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>

      {/* History Card */}
      <div className="card" style={{ marginTop: "30px" }}>
        <h2>Transaction History</h2>

        {transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{tx.id}</td>
                  <td>{tx.senderId}</td>
                  <td>{tx.receiverId}</td>
                  <td>₹{tx.amount}</td>
                  <td>{new Date(tx.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
