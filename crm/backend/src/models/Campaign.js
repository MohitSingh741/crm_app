const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
    name: { type: String, required: true },
    audienceCriteria: { type: Object, required: true }, 
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Campaign', CampaignSchema);
