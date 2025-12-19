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
    <header className="header">
      <h1>Real-Time Transaction & Audit System</h1>
      <p className="subtitle">
        Secure, atomic transfers with immutable audit logs
      </p>
    </header>

    {/* Transfer Section */}
    <div className="card">
      <h2>💸 Transfer Funds</h2>

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

    {/* History Section */}
    <div className="card">
      <h2>📊 Transaction History</h2>

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

    {/* Explanation Section */}
    <div className="card info">
      <h2>ℹ️ How This System Works</h2>

      <ul>
        <li>
          <strong>Atomic Transactions:</strong> Each transfer is executed
          inside a database transaction. If any step fails, the entire
          operation is rolled back.
        </li>

        <li>
          <strong>Audit Log:</strong> Every successful transfer is recorded in
          an immutable audit table for traceability and compliance.
        </li>

        <li>
          <strong>Real-Time Updates:</strong> After a transfer, the frontend
          immediately refreshes the transaction history.
        </li>

        <li>
          <strong>Failure Handling:</strong> Scenarios like insufficient
          balance or invalid users are handled gracefully without corrupting
          data.
        </li>
      </ul>
    </div>
  </div>
);

};

export default Dashboard;
