const express = require("express");
const router = express.Router();
const logger = require("../../logs/logger");
const {
  scheduleVisit,
  getVisit,
  editVisit,
  deleteVisits,
  deleteVisit,
  deletePatients,
  deletePatient,
} = require("../controllers/AppointmentController");

router.get("/test-log", (req, res) => {
  logger.info("Test route hit");
  logger.warn("Test warning");
  logger.error("Test error");
  res.status(200).json({ success: true, message: "Logs tested" });
});
router.route("/patient").delete(deletePatients);

router.route("/visit").get(getVisit).post(scheduleVisit).delete(deleteVisits);
// router.route("/visit").put(editVisit).delete(deleteVisit);
router.get("/testing", deletePatient);
module.exports = router;
