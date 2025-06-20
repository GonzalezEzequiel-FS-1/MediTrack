const express = require('express');
const router = express.Router();
const logger = require('../../logs/logger');
const {
  createPatient
} = require("../controllers/patientController")

router.get('/test-log', (req, res) => {
  logger.info('Test route hit');
  logger.warn('Test warning');
  logger.error('Test error');
  res.status(200).json({ success: true, message: "Logs tested" });
});

router.post('/patient', createPatient)

module.exports = router;
