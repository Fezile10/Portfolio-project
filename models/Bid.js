const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
    projectName: { type: String, required: true },
    bidAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' } // New status field
});

module.exports = mongoose.model('Bid', bidSchema);