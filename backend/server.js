const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('../backend/config/db');

dotenv.config();

console.log('MONGO_URI:', process.env.MONGO_URI); // Debug log

const app = express();


// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/register', require('./routes/register'));
app.use('/api/login', require('./routes/login'));
app.use('/api/tasks', require('./routes/tasks'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
