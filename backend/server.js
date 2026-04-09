require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { readdirSync } = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Global connection state
const db = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/expense_tracker');
        console.log('MongoDB Connected successfully');
    } catch (error) {
        console.error('DB Connection Error:', error);
        process.exit(1);
    }
};

db();

// Routes definition mapping
try {
    app.use('/api/v1/auth', require('./routes/auth'));
    readdirSync('./routes').map((route) => {
        if(route !== 'auth.js') {
            app.use('/api/v1', require('./routes/' + route));
        }
    });
} catch (e) {
    console.log('No routes directory configured yet, skipping routes mapping.');
}

// Basic health check endpoint
app.get('/', (req, res) => {
    res.send('Expense Tracker Backend Service Running');
});

// Start the server
const server = () => {
    app.listen(PORT, () => {
        console.log(`Server listening on Port: ${PORT}`);
    });
};

server();
