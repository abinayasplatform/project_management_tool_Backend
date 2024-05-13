const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName: { type: String, required: true },
    description: { type: String },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    createTime: { type: Date, default: Date.now }, 
    deadline: { type: Date, required: true },
    taskStatus: { type: String, enum: ['Pending', 'InProgress', 'Completed'], default: 'Pending' },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' } 
});

module.exports = mongoose.model('Task',taskSchema);