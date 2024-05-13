const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    email: { type: String, required: true },
    name: {type: String, required: true},
    password: {type: String, required: true},
    memberRole: { type: String, enum: ['admin', 'developer'], default: 'developer' },
    createdBy:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Member', memberSchema);