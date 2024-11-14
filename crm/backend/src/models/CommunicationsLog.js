const mongoose = require('mongoose');

const CommunicationsLogSchema = new mongoose.Schema({
    campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['PENDING', 'SENT', 'FAILED'], default: 'PENDING' },
    sentAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('CommunicationsLog', CommunicationsLogSchema);
