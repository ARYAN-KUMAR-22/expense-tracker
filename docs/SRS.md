# Software Requirements Specification (SRS) for Expense Tracker

## 1. Introduction

### 1.1 Purpose
The purpose of this document is to specify the software requirements for the "Expense Tracker" web application. This application provides users with an intuitive, seamless interface to track their finances, visualize their spending, and manage budgets efficiently. 

### 1.2 Scope
The Expense Tracker is a MERN stack single-page application (SPA). Its core features include adding, viewing, updating, and deleting financial transactions (incomes and expenses), calculating total balances, categorizing transactions, and visually digesting financial data using dynamic charts.

### 1.3 Definitions and Acronyms
- **SRS**: Software Requirements Specification
- **MERN**: MongoDB, Express.js, React.js, Node.js
- **API**: Application Programming Interface
- **SPA**: Single Page Application

## 2. Overall Description

### 2.1 Product Perspective
The product will act as a standalone web application operating over the internet / localhost. It follows a client-server architecture where the frontend (React) communicates with a RESTful backend API (Node.js/Express) which in turn accesses a NoSQL database (MongoDB).

### 2.2 Product Functions
- **Transaction Management**: Users can log both incomes and expenses.
- **Dashboard Overview**: A central hub showing current balance, total income, total expense, and transaction summaries.
- **Data Visualization**: Charts / Graphs showcasing spending habits by category over time.
- **Filtering & Search**: Ability to filter history by date, type, or category.

### 2.3 User Classes and Characteristics
- **Standard User**: Individuals looking for personal finance tracking. Needs a user-friendly, clean interface with no steep learning curve.

## 3. Specified Requirements

### 3.1 Functional Requirements

- **FR-1**: The system shall allow users to add an expense or income providing details such as title, amount, category, date, and description.
- **FR-2**: The system shall allow users to edit existing transactions.
- **FR-3**: The system shall allow users to delete transactions.
- **FR-4**: The system shall calculate and display the total balance dynamically.
- **FR-5**: The system shall classify the inputs under specific categories (e.g., Food, Transport, Salary, Freelance).
- **FR-6**: The system shall provide visual charts to display incomes vs. expenses over time.

### 3.2 Non-Functional Requirements

- **Performance**: API responses should resolve within 500ms under standard loads.
- **Usability**: The User Interface must be modern, responsive (accessible on mobile and desktop), utilizing dark mode aesthetics and micro-animations to feel dynamic.
- **Portability**: Accessible across modern browsers (Chrome, Firefox, Safari, Edge).
- **Reliability**: No loss of data; robust validation to prevent bad inputs.

### 3.3 System Requirements
- Database: MongoDB 
- Backend server: Node.js (v18+) with Express
- Frontend library: React (v18+) via Vite

## 4. System Models

*(Refer to the Data Flow Diagrams document: DFD.md for visual system modeling and context.)*
