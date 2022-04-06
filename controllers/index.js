const router = require('express').Router();
const homeRoutes = require('./homepageRoutes');
const apiRoutes = require('./api');
const dashboardRoutes = require('./dashboardRoutes');

router.use('/dashboard', dashboardRoutes);
router.use('/homepage', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;