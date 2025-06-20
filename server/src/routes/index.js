const express = require("express");
const router = express.Router();
const logger = require("../../logs/logger");
const {
  editPatient,
  scheduleVisit,
  getVisit,
  getVisits,
  editVisit,
  deleteAllVisits,
  deleteVisit,
  deletePatient,
  deleteAllPatients,
} = require("../controllers/AppointmentController");

router.get("/test-log", (req, res) => {
  logger.info("Test route hit");
  logger.warn("Test warning");
  logger.error("Test error");
  res.status(200).json({ success: true, message: "Logs tested" });
});

router.route("/visit").get(getVisit).post(scheduleVisit).delete(deleteVisit).patch(editVisit);
router.route("/visit/all").get(getVisits).delete(deleteAllVisits);
router.route("/patient").patch(editPatient).delete(deletePatient);
router.route("/patient/all").delete(deleteAllPatients);

module.exports = router;
