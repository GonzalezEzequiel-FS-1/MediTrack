const express = require("express");
const router = express.Router();
const logger = require("../../logs/logger");

const {
  createVisit,
  getVisit,
  newPatient,
  editPatient,
  editVisit,
  deleteVisit,
  deletePatient,
} = require("../controllers/appointments");

router.get("/test-log", (req, res) => {
  logger.info("Test route hit");
  logger.warn("Test warning");
  logger.error("Test error");
  res.status(200).json({ success: true, message: "Logs tested" });
});

router
  .route("/appointment")
  .post(createVisit)
  .get(getVisit)
  .patch(editVisit)
  .delete(deleteVisit);
router
  .route("/patient")
  .post(newPatient)
  .patch(editPatient)
  .delete(deletePatient);

module.exports = router;
