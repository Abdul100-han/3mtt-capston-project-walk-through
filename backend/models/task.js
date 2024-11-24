const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: String,
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
    deadline: Date,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', TaskSchema);
