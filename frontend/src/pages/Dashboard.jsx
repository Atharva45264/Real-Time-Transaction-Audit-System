import React, { useEffect, useState} from "react";
import api from "../services/api";

/* ---------- Reusable UI Components ---------- */

const Card = ({ title, children }) => {
  return (
    <div className="card fade-in">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

const InfoCard = ({ icon, title, description }) => {
  return (
    <div className="info-card">
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

/* ---------- Main Dashboard ---------- */

const Dashboard = () => {
  const [senderId, setSenderId] = useState("1");
  const [receiverId, setReceiverId] = useState("2");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState("date-desc");
  const [filterType, setFilterType] = useState("all");

  /* ---------- API Calls ---------- */
  useEffect(() => {
  const loadData = async () => {
    try {
      const usersRes = await api.get("/users");
      setUsers(usersRes.data);

      const txRes = await api.get(`/transactions/${senderId}`);
      setTransactions(txRes.data);
    } catch (error) {
      console.error("Failed to load data", error);
    }
  };

  loadData();
}, [senderId]);



  /* ---------- Transfer ---------- */

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

    // Refresh data after transfer
    const usersRes = await api.get("/users");
    setUsers(usersRes.data);

    const txRes = await api.get(`/transactions/${senderId}`);
    setTransactions(txRes.data);
  } catch (error) {
    setMessage(error.response?.data?.error || "❌ Transfer failed");
  }
};


  /* ---------- Sorting & Filtering ---------- */

  const processedTransactions = transactions
    .filter((tx) => {
      if (filterType === "sent") return tx.senderId == senderId;
      if (filterType === "received") return tx.receiverId == senderId;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "date-desc")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "date-asc")
        return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "amount-desc") return b.amount - a.amount;
      if (sortBy === "amount-asc") return a.amount - b.amount;
      return 0;
    });

  /* ---------- UI ---------- */

  return (
    <div className="container">
      {/* Header */}
      <header className="header fade-in">
        <h1>Transaction & Audit Dashboard</h1>
        <p className="subtitle">
          Real-time system demonstrating atomic transfers & audit logging
        </p>
      </header>

      {/* User Balances */}
      <Card title="💰 User Balances">
        {users.map((user) => (
          <p key={user.id}>
            <strong>{user.name}</strong>: ₹{user.balance}
          </p>
        ))}
      </Card>

      {/* Transfer */}
      <Card title="💸 Transfer Funds">
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
      </Card>

      {/* Transaction History */}
      <Card title="📊 Transaction History">
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date-desc">Latest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Amount: High → Low</option>
            <option value="amount-asc">Amount: Low → High</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All</option>
            <option value="sent">Sent</option>
            <option value="received">Received</option>
          </select>
        </div>

        {processedTransactions.length === 0 ? (
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
              {processedTransactions.map((tx) => (
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
      </Card>

      {/* How It Works */}
      <Card title="ℹ️ How This System Works">
        <div className="info-grid">
          <InfoCard
            icon="🔐"
            title="Atomic Transactions"
            description="Debit and credit operations are wrapped inside a database transaction to ensure consistency."
          />
          <InfoCard
            icon="📜"
            title="Audit Log"
            description="Each successful transfer is recorded in an immutable audit table for traceability."
          />
          <InfoCard
            icon="⚡"
            title="Real-Time Updates"
            description="Balances and transaction history update instantly after each transfer."
          />
          <InfoCard
            icon="🛡️"
            title="Failure Safety"
            description="Invalid users or insufficient balance never corrupt system state."
          />
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
