# 🚀 Calendar Tasks Tracking System - Server

This is the backend server for the Calendar Tasks Tracking System. It is built with **Node.js**, **Express**, and **MongoDB** to provide a RESTful API for managing tasks, employee data, and complex date-range queries.

---

## 🛠️ Tech Stack

* **Runtime Environment**: [Node.js](https://nodejs.org/)
* **Web Framework**: [Express.js](https://expressjs.com/)
* **Database**: [MongoDB](https://www.mongodb.com/)
* **ODM**: [Mongoose](https://mongoosejs.com/)
* **Utilities**: [Moment.js](https://momentjs.com/) (Date parsing)
* **Development**: [Nodemon](https://nodemon.io/) (Auto-reload)

---

## 📂 Project Structure

```text
server/
├── config/
│   └── db.js           # MongoDB connection logic
├── controllers/
│   └── controllers.js  # Business logic for all API routes
├── model/
│   ├── Events.js       # Mongoose Schema for tasks/events
│   └── Employees.js    # Mongoose Schema for employee data
├── routes/
│   └── routes.js       # Express route definitions
├── .env                # Environment variables (Port, Database URI)
└── index.js            # Entry point for the Express application