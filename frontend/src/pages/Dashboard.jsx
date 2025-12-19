import React, { useState } from "react";
import api from "../services/api";

const Dashboard = () => {
  const [senderId, setSenderId] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleTransfer = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await api.post("/transfer", {
        senderId: Number(senderId),
        receiverId: Number(receiverId),
        amount: Number(amount),
      });

      setMessage("✅ Transfer successful");
      setAmount("");
    } catch (error) {
      setMessage(
        error.response?.data?.error || "❌ Transfer failed"
      );
    }
  };

  return (
    <div className="container">
      <h1>Transaction Dashboard</h1>

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
    </div>
  );
};

export default Dashboard;
