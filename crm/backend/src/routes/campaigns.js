
const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');
const authMiddleware = require('../middlewares/authMiddleware');


router.use(authMiddleware);

router.post('/', campaignController.createCampaign);
router.get('/', campaignController.getAllCampaigns);
router.get('/:id', campaignController.getCampaignById);


router.get('/:id/history', campaignController.getCampaignHistory);
router.get('/:id/stats', campaignController.getCampaignStats);


router.post('/calculate-audience', campaignController.calculateAudience);

module.exports = router;
