const { messageQueue, deliveryReceiptQueue } = require('../config/redis');
const Campaign = require('../models/Campaign');
const Customer = require('../models/Customer');
const CommunicationsLog = require('../models/CommunicationsLog');

messageQueue.process(async (job, done) => {
    try {
        const { type, data } = job.data;

        switch (type) {
            case 'CREATE_CUSTOMER':
                console.log('Processing CREATE_CUSTOMER:', data);
                break;

            case 'SEND_CAMPAIGN_MESSAGES':
                const { campaignId } = data;
                const campaign = await Campaign.findById(campaignId);
                if (!campaign) {
                    throw new Error('Campaign not found');
                }

                const query = buildQuery(campaign.audienceCriteria);
                const audience = await Customer.find(query);

                console.log(`Audience Size for Campaign "${campaign.name}":`, audience.length);

                const communicationLogs = audience.map(customer => ({
                    campaignId: campaign._id,
                    customerId: customer._id,
                    message: `Hi ${customer.name}, here’s 10% off on your next order!`,
                    status: 'PENDING',
                }));

                await CommunicationsLog.insertMany(communicationLogs);

                communicationLogs.forEach(log => {
                    messageQueue.add({
                        type: 'SEND_MESSAGE',
                        data: { logId: log._id },
                    });
                });

                done();
                break;

            case 'SEND_MESSAGE':
                const { logId } = data;
                const log = await CommunicationsLog.findById(logId).populate('customerId');
                if (!log) {
                    throw new Error('CommunicationsLog not found');
                }

                const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';

                await deliveryReceiptQueue.add({
                    logId: log._id,
                    status,
                });

                done();
                break;

            default:
                console.log('Unknown job type:', type);
                done();
        }
    } catch (err) {
        console.error('Error processing job:', err);
        done(err);
    }
});

const buildQuery = (criteria) => {
    const query = {};

    if (criteria.totalSpending) {
        if (criteria.totalSpending.gt) {
            query.totalSpending = { ...query.totalSpending, $gt: criteria.totalSpending.gt };
        }
        if (criteria.totalSpending.lt) {
            query.totalSpending = { ...query.totalSpending, $lt: criteria.totalSpending.lt };
        }
    }

    if (criteria.visits) {
        if (criteria.visits.lte) {
            query.visits = { ...query.visits, $lte: criteria.visits.lte };
        }
        if (criteria.visits.gte) {
            query.visits = { ...query.visits, $gte: criteria.visits.gte };
        }
    }

    if (criteria.lastVisitDate) {
        if (criteria.lastVisitDate.before) {
            query.lastVisitDate = { ...query.lastVisitDate, $lt: new Date(criteria.lastVisitDate.before) };
        }
        if (criteria.lastVisitDate.after) {
            query.lastVisitDate = { ...query.lastVisitDate, $gt: new Date(criteria.lastVisitDate.after) };
        }
    }


    return query;
};


deliveryReceiptQueue.process(async (job, done) => {
    try {
        const { logId, status } = job.data;
        const log = await CommunicationsLog.findById(logId);
        if (!log) {
            throw new Error('CommunicationsLog not found');
        }
        log.status = status;
        await log.save();
        done();
    } catch (err) {
        console.error('Error processing delivery receipt:', err);
        done(err);
    }
});

console.log('Message Consumer is running...');
