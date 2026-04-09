# ExpanseTracker 📈

Welcome to **ExpanseTracker**—a complete, highly polished, massive architectural Software-as-a-Service (SaaS) application engineered entirely utilizing the **MERN** *(MongoDB, Express.js, React, Node.js)* stack.

ExpanseTracker is a robust financial command center designed to allow users to intuitively oversee their wealth, execute budget goals, review graphical patterns, securely authenticate, and export their isolated data securely anywhere globally.

---

## 🌟 Core Features
- **Enterprise Security (RBAC)**: Secure user routing and session states natively injected with JSON Web Tokens (JWT) protecting API architectures and isolated database slices based on strict User Roles (Admins vs Standard).
- **Dynamic Charting Engine**: Uses `Chart.js` & `react-chartjs-2` to dynamically weave beautiful line graphs dictating your account balance history, contrasted against nested pie charts for isolating exact category expenditure habits.
- **Budget Alerts**: Features an intelligent limit-checking interface—users will trigger Red Warning Banners natively into their global interfaces if their specific configured budget category eclipses their recorded expenditures.
- **Dynamic File Generation**: Want offline auditability? Built an API routing framework that leverages `json2csv` to package secure datasets into instantly downloadable Excel spreadsheet conversions natively inside the UI, and a `.docx` compiler formatting core specs.
- **Premium User Experience**: Designed utilizing deep dynamic glass-morphism aesthetic libraries, custom CSS custom properties driving a toggleable instantaneous UI logic routing **Dark Mode & Light Mode** without heavy frameworks, and embedded lightweight localized `lucide-react` scalability.

---

## 🛠️ Project Architecture 
This project is separated natively into two modular halves:

```bash
expense-tracker/
├── backend/            # The Node.js / Express API Server and REST Controllers
│   ├── controllers/    # API endpoints (auth, transactions, budget tracking)
│   ├── models/         # MongoDB Datastructures (Users, Incomes, Budgets)
│   └── routes/         # Network routing & HTTP Middleware Protection
├── docs/               # System Requirements Docs & Automated ER Diagram Mappings
├── frontend/           # The Vite / React.js Client Application
│   ├── src/pages/      # Viewable URL Routes (Landing, Dashboard, Login, Register)
│   └── src/context/    # Global React 'Redux-like' State Store tracking datasets
└── backups/            # Local directory mapping for MongoDB Data Archive
```

---

## 🚀 Getting Started

Follow these instructions to safely build and spin up the architecture locally on your machine!

### 1. Prerequisites 
- Ensure you have [Node.js](https://nodejs.org/en/) installed securely.
- Ensure you have **MongoDB Server** actively running locally on port `27017`. 
  - *(On Windows, you can automate this by running `winget install MongoDB.Server` inside PowerShell).*

### 2. Backend Initialization
The backend server requires `.env` environmental mapping and handles data transactions:

```bash
# 1. Enter the backend architecture
cd backend

# 2. Install native express dependencies
npm install

# 3. Secure a standard environment configuration `.env` file explicitly in the backend root
echo "PORT=5000" > .env
echo "MONGO_URL=mongodb://127.0.0.1:27017/expense_tracker" >> .env
echo "JWT_SECRET=superSecretCryptographicHash" >> .env

# 4. (Optional) Run the Data Injector—This artificially populates testing datasets for immediate charting
node seed.js

# 5. Bring the Server Online
node server.js
```
*The backend should safely log `Server listening on Port: 5000` and `MongoDB Connected`.*

### 3. Frontend Initialization
The frontend consumes the API payload and generates the Visual UX. (Open a separate terminal window alongside the backend):

```bash
# 1. Enter the Vite environment
cd frontend

# 2. Install React Component packages
npm install

# 3. Mount the frontend
npm run dev
```

The Web Interface should be instantly accessible securely via **http://localhost:5173**.

---

## 🔑 Test Credentials
If you executed `node seed.js`, the platform is already injected with pre-configured Sandbox entities. Test the Dashboard visualizations tracking by utilizing these active authentication bridges:

**Administrator Access**
- Email: `admin@tracker.com` 
- Pass: `admin123`

**Standard User Profile**
- Email: `john@tracker.com`
- Pass: `user123`

---

## ☁️ Deployment Configuration
This specific Frontend Repository has been hooked to deploy statically onto **GitHub Pages**.

To publish purely the User Interface changes visually to a global network:
1. Standardize codebase in `frontend/`
2. Run `npm run deploy` 
3. Observe live static HTML natively mapped right to your GitHub IO architecture. *(Note: Backend calls still point strictly via local mapping).*
