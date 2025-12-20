# Real-Time Transaction & Audit Log System  
**LenDenClub – GET 2026 Full Stack Assignment (Assignment 2)**

---

## 📌 Project Overview

This project implements a **Real-Time Transaction & Audit Log System**, simulating a simplified fintech-style peer-to-peer fund transfer system.

The core focus of this project is to demonstrate:
- Atomic database transactions
- Immutable audit logging
- Real-time frontend updates
- Clean backend and frontend architecture
- Thoughtful use of AI-assisted development tools

The system ensures that every fund transfer is executed safely and consistently, similar to real-world financial systems.

---

## 🧠 Key Concepts Demonstrated

- **Atomicity**: Debit and credit operations are wrapped in a database transaction to ensure all-or-nothing execution.
- **Audit Logging**: Every successful transfer is recorded in an immutable audit log for traceability.
- **Real-Time UI Sync**: Frontend updates balances and transaction history immediately after a transfer.
- **Error Safety**: Invalid users or insufficient balance do not corrupt system state.

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- Sequelize ORM
- SQLite Database

### Frontend
- React (Vite)
- Axios
- Custom CSS 

### AI Tools Used
- ChatGPT

---

## 🏗 System Architecture

<img width="369" height="515" alt="image" src="https://github.com/user-attachments/assets/3bce1fc8-04d6-4827-b481-8ea03acce974" />


---

## 🔐 Backend Features

### 1. Transaction API
**Endpoint**

**Description**
- Deducts amount from sender
- Credits amount to receiver
- Wrapped inside a database transaction
- Automatically rolls back if any step fails

---

### 2. Audit Log
- Every successful transfer is recorded in a dedicated `Transactions` table
- Fields logged:
  - Sender ID
  - Receiver ID
  - Amount
  - Timestamp
  - Status
- Audit records are immutable

---

### 3. Transaction History API
**Endpoint**

**Description**
- Fetches all transactions where the user is sender or receiver
- Sorted by most recent first

---

### 4. Users API (For Balance Display)
**Endpoint**

**Purpose**
- Fetch current user balances
- Used for frontend balance display and verification

---

## 🎨 Frontend Features

### Transfer Interface
- Input sender ID, receiver ID, and amount
- Displays success or failure messages
- Handles insufficient balance scenarios gracefully

### Real-Time Updates
- User balances refresh immediately after transfer
- Transaction history updates without page reload

### Transaction History Table
- Displays audit logs in a clear table
- Supports:
  - Sorting (date, amount)
  - Filtering (sent, received, all)

### UI Enhancements
- Fintech-style theme
- Reusable React components (`Card`, `InfoCard`)
- Subtle animations for better UX
- “How This System Works” explanatory section

---

## 🤖 AI Tool Usage & Documentation (Mandatory)

### AI-Assisted Tasks

AI-based tools (ChatGPT) were strategically used during development for productivity and code quality improvement:

1. Generated Sequelize database transaction boilerplate for the `POST /transfer` API.
2. Assisted in structuring atomic debit/credit logic and rollback handling.
3. Helped design the React transaction history table with sorting and filtering.
4. Suggested UI improvements and CSS refinements for a clean fintech dashboard.
5. Assisted in refining error-handling logic for insufficient balance and invalid users.
6. Reviewed code structure and improved readability and separation of concerns.

---

### Effectiveness Score

**Score: 4 / 5**

AI tools significantly reduced development time by generating boilerplate code and assisting with UI and logic structuring. Manual validation and debugging were still required to ensure transactional integrity and correct state synchronization, preventing over-reliance on AI.

---

## 🧪 Error Handling & Safety

- Transfers fail gracefully when:
  - Sender has insufficient balance
  - Sender or receiver does not exist
- Failed transfers do not modify balances or create audit logs
- Frontend clearly communicates errors to the user

---

## ▶️ Setup & Run Instructions

### Backend
```bash
cd backend
npm install
npm run dev
```
### Backend runs at:
```bash
http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
### Frontend runs at:
```bash
http://localhost:5173
```

---

## 📊 Demo Flow

- View initial user balances
- Perform a valid transfer
- Observe real-time balance update
- Observe audit log entry in transaction history
- Attempt invalid transfer to demonstrate rollback and safety

---

## 🔮 Future Improvements

- JWT-based authentication and authorization
- Role-based access control
- Pagination for transaction history
- Production-grade database (PostgreSQL)
- Deployment using Docker

---

## 📌 Conclusion

This project demonstrates a real-world approach to building a secure, consistent, and user-friendly transaction system, emphasizing correctness, traceability, and clean architecture—key requirements in fintech applications.

---

## 👤 Author

### Atharva Phanse
LenDenClub GET 2026 Assignment Submission



