const express = require("express");
const router = express.Router();
//const { createVisit } = require("../controllers/appointments");
const {
  createVisit,
  getVisit,
  editVisit,
  deleteVisit,
} = require("../controllers/visitRoutes");

const {
  newPatient,
  editPatient,
  deletePatient,
} = require("../controllers/patientRoutes");
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
