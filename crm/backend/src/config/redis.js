const Bull = require('bull');
const dotenv = require('dotenv');

dotenv.config();

const messageQueue = new Bull('messageQueue', {
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
});

const deliveryReceiptQueue = new Bull('deliveryReceiptQueue', {
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
});

module.exports = { messageQueue, deliveryReceiptQueue };
