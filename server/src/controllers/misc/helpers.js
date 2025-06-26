const mongoose = require("mongoose");
const Patient = require("../../models/Patient");
const Visit = require("../../models/Visit");
const { testSelection } = require("../TestSelection/Tests");
let message;

// Check if Patient Exists
// Check if a Patient exists by flexible fields
const patientExists = async (query) => {
  if (!query || typeof query !== "object" || Object.keys(query).length === 0) {
    throw new Error("Invalid or empty query object provided to patientExists");
  }

  const ptInDB = await Patient.findOne({ ...query });

  console.log(
    `Result from checking the DB => ${ptInDB ? "Found" : "Not found"}`
  );
  console.log(query.id);
  return query.id; // returns true if found, false if not
};

// Create a new Patient
const createPatient = async (patient) => {
  if (!patient) {
    throw new Error("No patient data provided");
  }

  try {
    const newPatient = await Patient.create({ ...patient });
    return newPatient;
  } catch (error) {
    console.error("Error creating patient:", error.message);
    throw error;
  }
};

// Create a Visit for a Patient
const addVisit = async (patient, visit) => {
  // If data is not complete throw an error
  if (!patient || !visit) {
    throw new Error("Incomplete data sent");
  }

  try {
    // Get the Team Member ID to query the database and get the mongo _id
    const TMID = patient?.TMID;
    const patientOnDB = await Patient.findOne({ TMID });
    //patientOnDB ? patientOnDB = await createPatient(patient) : pa
    // Now that we have it let's put it in a variable and
    const patientID = patientOnDB._id;
    const selectedTests = await testSelection(visit.service);
    const createdVisit = await Visit.create({
      patient: patientID,
      dateTime: visit.dateTime,
      typeOfPhysical: visit.typeOfPhysical,
      service: visit.service,
      testsPerformed: selectedTests,
      status: visit.status,
      notes: visit.notes,
    });
    return createdVisit;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  patientExists,
  createPatient,
  addVisit,
};
