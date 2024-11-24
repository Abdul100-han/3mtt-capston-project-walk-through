const express = require('express');
const Task = require('../models/userModel'); // Ensure the Task model exists
const authenticate = require('../middleware/protectRoute'); // Ensure the path is correct

const router = express.Router();

// Create a new task (Protected route)
router.post('/', authenticate, async (req, res) => {
    const { title, description, priority, deadline } = req.body;
    try {
        const task = new Task({ 
            ...req.body, 
            userId: req.user.id // Ensure `authenticate` middleware sets `req.user`
        });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
