# 💰 Expense Management System

A full-stack Expense Management System built using the **MERN** stack (MongoDB, Express, React, Node.js). The application allows users to track their income and expenses, view insights, and manage transactions efficiently.

## 🚀 Features

- User Authentication (Login & Signup)
- Add, view, update, and delete income and expenses
- Real-time dashboard overview
- Visual charts for income and expense trends
- Recent transactions list
- Secure API with JWT authentication
- Mobile-responsive UI

## 🛠️ Tech Stack

### Frontend:
- React.js
- Tailwind CSS
- Axios
- React Router DOM

### Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## 📁 Folder Structure

client/ --> React frontend └── src/ ├── Components/ ├── pages/ ├── utils/ └── main.jsx

server/ --> Node.js + Express backend ├── models/ ├── routes/ ├── controllers/ ├── middleware/ └── server.js

public/ --> Static assets (favicon, images)


## 🧑‍💻 Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/expense-management-system.git
cd expense-management-system

2. Install dependencies
Backend
bash
Copy
Edit
cd server
npm install
Frontend
bash
Copy
Edit
cd ../client
npm install
3. Setup Environment Variables
Create a .env file in the server folder with the following variables:

ini
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
4. Run the project
Backend
bash
Copy
Edit
cd server
npm run dev
Frontend
bash
Copy
Edit
cd ../client
npm run dev
The app will run at http://localhost:5173 (frontend) and http://localhost:5000 (backend).

🧪 API Endpoints
Base URL: http://localhost:5000/api


Method	Endpoint	    Description
POST	/auth/signup	  Register new user
POST	/auth/login	    Login and get token
GET	/dashboard	      Get dashboard data
POST	/income	        Add income
DELETE	/income/:id	  Delete income
POST	/expense	      Add expense
DELETE /expense/:id 	Delete expense
