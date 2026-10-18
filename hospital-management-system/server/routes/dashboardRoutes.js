const router = require('express').Router();
router.get('/', require('../controllers/dashboardController').getSummary);
module.exports = router;
