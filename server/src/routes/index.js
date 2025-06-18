const express = require('express');
const router = express.Router();
const logger = require('../../logs/logger');

router.get('/test-log', (req, res) => {
  logger.info('Test route hit');
  logger.warn('Test warning');
  logger.error('Test error');
  res.status(200).json({ success: true, message: "Logs tested" });
});

module.exports = router;
