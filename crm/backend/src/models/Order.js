const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    orderDate: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
