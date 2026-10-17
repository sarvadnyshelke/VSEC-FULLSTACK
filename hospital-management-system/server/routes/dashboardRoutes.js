const router = require('express').Router();
router.get('/', require('../controllers/dashboardController').getStats);
module.exports = router;
