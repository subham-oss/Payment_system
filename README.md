# 💳 Payment System (Backend)

A secure and scalable backend payment system built using modern web technologies. This project implements a **ledger-based account system** to handle user balances and fund transfers efficiently.

---

## 🚀 Tech Stack

- Node.js – Backend runtime  
- Express.js – Web framework  
- MongoDB – Database  
- Mongoose – ODM for MongoDB  
- Nodemailer – Email services  
- JWT Authentication  

---

## 📌 Features

- 🔐 User Authentication (Login / Logout)
- 🧾 Ledger-based Account Management
- 💰 Real-time Balance Tracking
- 🔄 Secure Fund Transfer Between Accounts
- 🚫 Token Blacklisting on Logout
- 📧 Email Notifications (via Nodemailer)

---

## 🧠 Core Concept: Ledger System

This project follows a **ledger-based accounting system**, where:
- Every transaction is recorded as a **debit/credit entry**
- User balances are derived from transaction history
- Ensures **data consistency and auditability**

---

## 📡 API Endpoints

### 🔑 Authentication

#### POST /login
Authenticate user and return JWT token  

#### POST /logout
Logout user and blacklist token  

---

### 👤 Account

#### POST /register
Create a new user account  

#### GET /balance
Fetch current account balance  

---

### 💸 Transactions

#### POST /transfer
Transfer funds between accounts  
- Validates balance  
- Updates ledger entries  

---

## 🔒 Security

- JWT-based authentication  
- Token blacklisting on logout  
- Input validation & error handling  
- Secure transaction flow  

---

## 📂 Project Structure

```
payment-system/
│── models/        
│── routes/        
│── controllers/   
│── middleware/    
│── services/      
│── config/       
│── server.js      
```

---

## ⚙️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/subham-oss/Payment_system

# Navigate to project
cd payment-system

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Run the server
npm start
```

---

## 🌱 Environment Variables

```
MONGO_URI=your_mongodb_connection
SECRET_KEY=your_secret_key
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
REFRESH_TOKEN=your_refresh_token
EMAIL_USER=your_email
```

---

## 🧪 Future Improvements

- 🏦 Add transaction history API  
- 📊 Admin dashboard  
- 🔔 Real-time notifications  
- 🧾 PDF invoice generation  
- 🛡️ Rate limiting & advanced security  

---

## 👨‍💻 Author

**Subham Chakraborty**  
- LinkedIn: https://www.linkedin.com/in/subham448/  
- GitHub: https://github.com/subham-oss  
