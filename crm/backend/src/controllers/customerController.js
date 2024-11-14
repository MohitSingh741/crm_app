const Customer = require('../models/Customer');
const { messageQueue } = require('../config/redis');

exports.createCustomer = async (req, res, next) => {
    try {
        const { name, email, totalSpending, visits, lastVisitDate } = req.body;
        const customer = new Customer({ name, email, totalSpending, visits, lastVisitDate });
        await customer.save();

        await messageQueue.add({ type: 'CREATE_CUSTOMER', data: customer });

        res.status(201).json(customer);
    } catch (err) {
        next(err);
    }
};


exports.getAllCustomers = async (req, res, next) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (err) {
        next(err);
    }
};
