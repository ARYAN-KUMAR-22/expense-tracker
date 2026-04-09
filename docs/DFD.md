# Data Flow Diagrams (DFD) for Expense Tracker

This document provides visual representations of how data flows through the Expense Tracker system.
These diagrams use standard Mermaid.js syntax.

## Level 0 Context DFD
This diagram shows the entire system as a single process interacting with external entities (The User).

```mermaid
flowchart LR
    User([User]) -- "Transaction Data (Amount, Title, Category)" --> System[Expense Tracker System]
    User -- "View Requests, Filter Requests" --> System
    System -- "Visualizations, Total Balances, Transaction Lists" --> User
```

## Level 1 DFD
This details the main sub-processes within the system: Input Management, Dashboard Calculation, and the Database Storage.

```mermaid
flowchart TD
    User([User]) 

    ProcessAuth(1.0 Authentication & Role Check)
    Process1(2.0 Manage Transactions)
    Process2(3.0 Calculate Financial Metrics)
    Process3(4.0 Render Data Visualizations)

    DB[(MongoDB Database)]
    
    User -- "Login Credentials" --> ProcessAuth
    ProcessAuth -- "JWT & Role (Admin/User)" --> User

    User -- "Input Form Data (Add/Edit) + JWT" --> Process1
    User -- "Delete Request + JWT" --> Process1

    Process1 -- "Validated Transaction Data" --> DB
    DB -- "Transaction Records (Filtered by User ID via JWT)" --> Process1

    Process1 -- "Success / Error Confirmation" --> User

    DB -- "Batch Fetch Transactions" --> Process2
    Process2 -- "Computed Totals (Income/Expense/Balance)" --> User

    DB -- "Categorized Data" --> Process3
    Process3 -- "Chart / Graph UI" --> User
```

## Level 2 DFD (Process: 1.0 Manage Transactions)
 Breaking down Process 1.0 into smaller functional units focusing on validation and routing.

```mermaid
flowchart LR
    Input[Incoming User Request]
    
    Sub1(1.1 Validate Input Data)
    Sub2(1.2 Route to Database Operations)
    Sub3(1.3 Return Response Output)
    
    DB[(MongoDB)]
    
    Input -- "Raw Form Data JSON" --> Sub1
    Sub1 -- "Sanitized Data" --> Sub2
    Sub1 -- "Validation Error" --> Error[Error Handling / Alert]
    
    Sub2 -- "Mongoose Create/Update/Delete" --> DB
    DB -- "DB Success Status" --> Sub3
    
    Sub3 -- "HTTP 200/201 Object" --> Output[Update Application State]
```

## Entity Relationship Diagram (ERD) Overview
```mermaid
erDiagram
    USER {
        string _id PK
        string name
        string email
        string password
        string role "Admin or User"
        date createdAt
        date updatedAt
    }

    TRANSACTION {
        string _id PK
        string user FK "Ref USER"
        string title
        number amount
        string type "income or expense"
        string category
        date date
        string description
        date createdAt
        date updatedAt
    }
    
    USER ||--o{ TRANSACTION : "creates"
```
