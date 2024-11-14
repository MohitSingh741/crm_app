const Order = require('../models/Order');

exports.createOrder = async (req, res, next) => {
    try {
        const { customerId, orderDate, amount } = req.body;
        const order = new Order({ customerId, orderDate, amount });
        await order.save();
        res.status(201).json(order);
    } catch (err) {
        next(err);
    }
};

exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().populate('customerId');
        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
};
