# 📖 Recipe Book Application

A full-stack recipe browsing and viewing application built with React on the client side and Node.js on the server side.

---

## 📌 Features

✅ Browse recipes by **ingredient, country, or category**  
✅ View detailed **recipe information** including ingredients and instructions  
✅ Filter recipes dynamically based on user preferences  
✅ **Pagination** for better user experience  
✅ Responsive design for **desktop and mobile**  
✅ Toast notifications for error handling  
✅ API caching for optimized performance

---

## 🚀 Tech Stack

### 🖥️ Frontend:

- React
- TypeScript
- React Router
- Ant Design (UI Components)
- Axios (HTTP Requests)

### 🔧 Backend:

- Node.js
- Express.js
- Axios (for external API requests)
- Cache implementation for API responses

### 🔗 External API:

- [TheMealDB](https://www.themealdb.com/) (Used to fetch recipes)

---

## 📌 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

---

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository

```sh
https://github.com/Lihitsky/developstoday-junior-js-test-assessment.git
```

2️⃣ Install Dependencies

Client (React App)

```sh
cd client
npm install
```

Server (Node.js API)

```sh
cd ../server
npm install
npx tsc
```

---

## 🚀 Running the Application

### 📡 Start the Server

Navigate to the server directory:

```sh
cd server
```

Create a .env file in the server directory and set the PORT variable (optional, default is 3001):

```sh
PORT=3001
```

Start the server:

```sh
npm start
```

The server will be running on:
🔗 http://localhost:3001

### 🌐 Start the Client

Navigate to the client directory:

```sh
cd client
```

Start the client:

```sh
npm start
```

The client will be running on:
🔗 http://localhost:3000

---

## 📌 Usage

- 1️⃣ Open your browser and go to http://localhost:3000
- 2️⃣ Use the search filters to find recipes by ingredient, country, or category
- 3️⃣ Click on a recipe to view its detailed information
- 4️⃣ Navigate back to the recipe list or try different filters

---
