# System Architecture 

## Overview
The application is built entirely using JavaScript/TypeScript across the entire stack, capitalizing on the MERN methodology.

### 1. Presentation Layer (Frontend)
- **Framework**: React.js 18+ (scaffolded via Vite for rapid HMR and optimized builds)
- **Styling**: Vanilla CSS utilizing CSS Variables for global theming (specifically Dark Mode), ensuring a high-performance, dynamic UI without heavy third-party CSS library overhead.
- **State Management**: React Context API and Hooks (useState, useReducer, useEffect) for managing global financial states.
- **HTTP Client**: Axios for Promise-based REST calls.
- **Charts**: Recharts / Chart.js for data visualization.

### 2. Application Layer (Backend API)
- **Environment**: Node.js
- **Framework**: Express.js
- **Architecture**: MVC (Model-View-Controller) structure adapted for REST.
  - `routes/`: Defines HTTP endpoints.
  - `controllers/`: Contains business logic (calculations, validations).
  - `models/`: Mongoose schemas.
- **Cross-Origin Resource Sharing (CORS)**: Enabled to allow frontend (e.g., port 5173) to securely communicate with the backend API (e.g., port 5000).

### 3. Data Layer (Database)
- **Database Engine**: MongoDB
- **ODM**: Mongoose 
- **Collections**:
  - `transactions`: Stores all financial records. Differentiated by `type`: 'income' or 'expense'.

## Project Map Structure
```text
Root/
├── docs/ (SRS, DFD, PPT)
├── backend/
│   ├── .env
│   ├── server.js (Entry Point)
│   ├── db/
│   │   └── db.js (MongoDB Connection)
│   ├── models/
│   │   └── expenseModel.js
│   ├── routes/
│   │   └── transactions.js
│   └── controllers/
│       └── expense.js
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── index.css (Global Styles & Design Tokens)
    │   ├── context/
    │   │   └── globalContext.jsx
    │   ├── components/
    │   │   ├── Dashboard/
    │   │   ├── Navigation/
    │   │   ├── Expenses/
    │   │   └── Incomes/
    │   ├── styles/
    │   └── utils/
    ├── index.html
    └── vite.config.js
```
