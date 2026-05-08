# 🗓️ Calendar Tasks Tracking System

A full-stack task management and scheduling application built with the **MERN** stack (MongoDB, Express, React, Node.js). This system allows for real-time task tracking, employee assignment, and visual status management using an interactive calendar.

---

## 🚀 Features

* **Interactive Calendar**: Full-day and list views powered by `FullCalendar`.
* **Task Management**: Full CRUD (Create, Read, Update, Delete) functionality with dynamic modals.
* **Smart Query Engine**: Filter tasks by specific date ranges with automatic calendar navigation.
* **Visual Status Tracking**: 
    * Color-coded task states (Pending, In-Progress, Done).
    * Automatic **Late** vs **Ontime** logic based on task deadlines.
* **Live Dashboard**: Real-time clock and daily summaries of upcoming tasks.
* **Global State**: Centralized state management using `Zustand` for high performance.

---

## 🛠️ Tech Stack

**Client:**
* **Framework**: React 18 (Vite)
* **UI Components**: Ant Design (antd)
* **State Management**: Zustand
* **Styling**: Tailwind CSS
* **Calendar Engine**: FullCalendar
* **Date Utils**: Moment.js

**Server:**
* **Environment**: Node.js
* **Framework**: Express
* **Database**: MongoDB
* **API Client**: Axios

---

## 📂 Project Structure

```text
├── client/                 # React Frontend
│   ├── src/
│   │   ├── api/            # API Service definitions
│   │   ├── components/     # UI Components (Calendar, Sidebar, Header)
│   │   ├── store/          # Zustand Global State
│   │   └── App.jsx         # Main Entry Point
├── server/                 # Node.js Backend
│   ├── models/             # Database Schemas
│   ├── routes/             # API Endpoints
│   └── index.js            # Server Configuration
