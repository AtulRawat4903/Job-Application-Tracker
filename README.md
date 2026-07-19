# 💼 Job Application Tracker

A full-stack web application that helps users organize and track their internship and job applications in one place. The application allows users to manage applications throughout the hiring process while securely storing all data in MongoDB Atlas through a Node.js and Express backend.

---

## ✨ Features

* ➕ Add new job or internship applications
* ✏️ Update application details and application status
* 🔍 Search applications by company or role
* 🗑️ Delete applications
* 💾 Persistent data storage using MongoDB Atlas
* 📱 Responsive and user-friendly interface

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript (ES6)

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

---

## 🚀 Demo

- **Live Application:** https://job-application-tracker-psi-lyart.vercel.app/
- **Backend API:** https://job-application-tracker-api-me4p.onrender.com

---

## 🏗️ Architecture

```text
+--------------------+
|      Frontend      |
|  HTML • CSS • JS   |
+---------+----------+
          |
          | HTTP Requests
          ▼
+--------------------+
|   Express Server   |
|      Node.js       |
+---------+----------+
          |
          | Mongoose ODM
          ▼
+--------------------+
|   MongoDB Atlas    |
|     Database       |
+--------------------+
```

---

## 📂 Project Structure

```text
job-application-tracker/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── index.html
│
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

* Node.js (v18+ recommended)
* npm
* MongoDB Atlas account

### Installation

Clone the repository:

```bash
git clone https://github.com/atulrawat4903/job-application-tracker.git
cd job-application-tracker
```

Install backend dependencies:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

Start the development server:

```bash
npm run dev
```

Open the frontend in your browser and ensure the backend server is running.

---

## 🔮 Future Improvements

* User authentication (JWT)
* Filter and sort applications
* Resume & cover letter uploads
* Dashboard analytics
* Follow-up reminders
* Pagination for large datasets

---

## 📄 License

This project is licensed under the MIT License.
