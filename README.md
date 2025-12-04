# Task Manager – MERN Stack (React + Node.js + MongoDB)

A modern, interactive Task Management Dashboard built using the **MERN Stack**, focusing on a clean UI, smooth UX, and real-time status updates.

This project demonstrates end-to-end development skills including:
✔ Authentication  
✔ CRUD operations  
✔ Component-based architecture  
✔ UI/UX design  
✔ API integration  
✔ State management  
✔ Dashboard analytics  

---

## 🚀 Features

### 🔐 Authentication
- User Login with JWT  
- Protected Routes  
- Admin role support (delete access)

### 📋 Task Management
- Add Task  
- Edit Task  
- Delete Task (admin only)  
- Search Tasks  
- Status Update: **Not Started → In Progress → Completed**

### 🖥️ Two View Modes
- **Table View**  
- **Card View**  
Toggle view instantly with UI buttons.

### 🎨 Modern UI & UX
- Material UI design system  
- Custom animations (pulse effect for in-progress tasks)  
- Snackbar notifications  
- Modal-based Add/Edit Form  
- Pagination  
- Empty state screen  
- Responsive grid card layout  
- Hover effects  
- Status color chips  
- Summary Metrics with **Circular Progress Overview**

### 📊 Dashboard Summary
- Total Tasks  
- In Progress  
- Completed  
- Circular completion % indicator  

---

## 🛠️ Tech Stack

### Frontend
- React.js  
- Material UI  
- Axios  
- Context API  
- React hooks  

### Backend
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT Authentication  

---

## 📂 Project Structure

```
frontend/
 ├── components/
 │    ├── TaskCardView.jsx
 │    ├── TaskTable.jsx
 │    ├── TaskFormModal.jsx
 │    ├── SearchBar.jsx
 │    ├── ViewToggle.jsx
 │    ├── SummaryPanel.jsx
 │    ├── SnackbarAlert.jsx
 ├── pages/
 │    ├── Dashboard.jsx
 ├── api/
 │    ├── axiosInstance.js
 ├── context/
 │    ├── AuthContext.js

backend/
 ├── models/
 │    ├── Task.js
 │    ├── User.js
 ├── routes/
 │    ├── authRoutes.js
 │    ├── taskRoutes.js
 ├── middleware/
 │    ├── authMiddleware.js
 ├── server.js
```

---

## ▶️ Running the Project

### 1. Clone the repository
```
git clone https://github.com/yourname/task-manager.git
cd task-manager
```

### 2. Install dependencies  
Frontend:
```
cd frontend
npm install
```

Backend:
```
cd backend
npm install
```

### 3. Start backend
```
npm run dev
```

### 4. Start frontend
```
npm run dev
```

---

## 🌐 Deployment
Frontend → **Vercel**  
Backend → **Render / Railway**  
Database → **MongoDB Atlas**

---

## 💡 Why This Project Is Impressive

This project is designed like a **real company dashboard**, showing:
- UI decisions  
- API integrations  
- Authentication flow  
- Real-time interactions  
- Dashboard summarization  
- Component architecture  

---

## 📜 License
MIT License  
