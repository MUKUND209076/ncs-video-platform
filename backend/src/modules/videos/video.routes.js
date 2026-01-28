const router = require('express').Router();
const controller = require('./video.controller');

router.get('/dashboard', controller.dashboard);
router.get('/video/:id/stream', controller.stream);

module.exports = router;
