# 🗓️ Calendar Tasks Tracking System - Client

This is the frontend application for the Calendar Tasks Tracking System, built with **React**, **Vite**, and **Ant Design**. It provides an interactive interface for users to manage duties, visualize schedules on a calendar, and track task progress in real-time.

---

## 🎨 UI & Features

* **Interactive Calendar**: A full-featured calendar powered by `FullCalendar` with Month, Week, and List views.
* **Task Management**:
    * **Create**: Click/Select a date range on the calendar to open the creation modal.
    * **Update/Delete**: Click on any existing event to modify its status, assignee, or remove it entirely.
* **Dynamic Sidebar**:
    * Shows task status legends with custom color tags.
    * Lists all tasks for the current month with "Late" and "Ontime" indicators.
    * Advanced Date Range Query to filter specific tasks.
* **Real-time Header**: Displays a live clock and the current date.
* **Tooltips**: Hover over calendar events to see quick details like the Person In Charge (PIC) and current status.

---

## 🛠️ Technology Stack

* **Core**: [React 18](https://react.dev/) & [Vite](https://vitejs.dev/)
* **State Management**: [Zustand](https://docs.pmnd.rs/zustand/) (Global store for events, employees, and UI states)
* **UI Framework**: [Ant Design (antd)](https://ant.design/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Calendar**: [FullCalendar](https://fullcalendar.io/) (DayGrid, List, and Interaction plugins)
* **Date Handling**: [Moment.js](https://momentjs.com/)
* **HTTP Client**: [Axios](https://axios-http.com/)

---

## 📂 Project Structure

src/
├── api/
│   └── api.js          # Axios services for CRUD and Query operations
├── components/
│   ├── calendar/
│   │   └── Calendar.jsx # Calendar engine and Task Modals
│   ├── header/
│   │   └── Header.jsx   # Live clock and title component
│   └── sidebar/
│       └── Sidebar.jsx  # Status legends and Range Query form
├── store/
│   └── useDutyStore.js  # Zustand store for global data sync
├── App.jsx             # Main layout and data initialization
└── main.jsx            # Application entry point