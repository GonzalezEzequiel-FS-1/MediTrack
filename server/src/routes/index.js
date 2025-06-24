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
  getPatient,
} = require("../controllers/AppointmentController");
const { bulkUpload } = require("../controllers/bulkUpload");

router.get("/test-log", (req, res) => {
  logger.info("Test route hit");
  logger.warn("Test warning");
  logger.error("Test error");
  res.status(200).json({ success: true, message: "Logs tested" });
});

router
  .route("/visit")
  .get(getVisit)
  .post(scheduleVisit)
  .delete(deleteVisit)
  .patch(editVisit);
router.route("/visit/all").get(getVisits).delete(deleteAllVisits);
router
  .route("/patient")
  .patch(editPatient)
  .delete(deletePatient)
  .get(getPatient);
router.route("/patient/all").delete(deleteAllPatients).post(bulkUpload);

module.exports = router;
