require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel');
const Expense = require('./models/expenseModel');

const seedDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/expense_tracker');
        console.log('MongoDB Connected for Seeding');

        // Clear existing data
        await User.deleteMany({});
        await Expense.deleteMany({});
        console.log('Cleared existing data.');

        const salt = await bcrypt.genSalt(10);
        const hashedAdminPass = await bcrypt.hash('admin123', salt);
        const hashedUserPass = await bcrypt.hash('user123', salt);

        // Create Admin
        const adminUser = await User.create({
            name: 'Admin Boss',
            email: 'admin@tracker.com',
            password: hashedAdminPass,
            role: 'admin'
        });

        // Create Normal User
        const testUser = await User.create({
            name: 'John Doe',
            email: 'john@tracker.com',
            password: hashedUserPass,
            role: 'user'
        });
        
        console.log('Test Users Seeding Completed.');
        
        // Feed test data
        await Expense.create([
             { user: testUser._id, title: 'Salary', amount: 5000, category: 'salary', date: new Date(), description: 'Monthly wage', type: 'income' },
             { user: testUser._id, title: 'Groceries', amount: 150, category: 'groceries', date: new Date(), description: 'Food', type: 'expense' },
             { user: testUser._id, title: 'Freelance', amount: 800, category: 'freelance', date: new Date(), description: 'App project', type: 'income' },
             { user: adminUser._id, title: 'Server Hosting', amount: 300, category: 'subscriptions', date: new Date(), description: 'AWS Bill', type: 'expense' }
        ]);

        console.log('Test Transaction Seeding Completed.');
        process.exit();

    } catch (err) {
        console.error('Seeding Error:', err);
        process.exit(1);
    }
};

seedDB();
