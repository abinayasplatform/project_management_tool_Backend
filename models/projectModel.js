const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true }, 
    deadline: { type: Date, required: true }, 
    teamLeader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    projStatus: { type: String, enum: ['Pending', 'InProgress', 'Completed'], default: 'Pending' }
});

module.exports = mongoose.model('Project', projectSchema);