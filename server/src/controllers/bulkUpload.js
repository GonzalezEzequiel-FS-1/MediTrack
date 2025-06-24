const mongoose = require("mongoose");
const Patient = require("../models/Patient");
const Visit = require("../models/Visit");
const testSelection = require("../controllers/TestSelection/Tests"); // Your function to get tests

const bulkUpload = async (req, res) => {
  const payload = req.body;

  if (!Array.isArray(payload) || payload.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Expected an array of employee objects.",
    });
  }

  const session = await mongoose.startSession();
  const results = [];

  try {
    await session.withTransaction(async () => {
      for (const entry of payload) {
        const {
          firstName,
          lastName,
          TMID,
          jobTitle,
          DOB,
          typeOfPhysical,
          service,
          status,
          appointments,
          version,
        } = entry;

        // Basic validation
        if (
          !TMID ||
          !firstName ||
          !lastName ||
          !DOB ||
          !typeOfPhysical ||
          !service
        ) {
          results.push({
            TMID,
            success: false,
            message: "Missing required fields.",
          });
          continue;
        }

        try {
          // Find or create patient
          let patient = await Patient.findOne({ TMID }).session(session);

          if (!patient) {
            patient = new Patient({
              TMID,
              firstName,
              lastName,
              jobTitle,
              DOB,
            });

            await patient.save({ session });
          }

          const selectedTests = await testSelection(service);

          const visit = new Visit({
            patient: patient._id,
            typeOfPhysical,
            service,
            testToPerform: selectedTests,
            status: status || "Scheduled",
            appointments: appointments || [],
            version: version || 0,
          });

          const savedVisit = await visit.save({ session });

          results.push({
            TMID,
            success: true,
            visitId: savedVisit._id,
          });
        } catch (err) {
          results.push({
            TMID,
            success: false,
            message: err.message,
          });
        }
      }
    });

    return res.status(207).json({
      success: true,
      message: "Bulk visit scheduling completed.",
      results,
    });
  } catch (err) {
    console.error("Bulk insert failed:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during bulk scheduling.",
    });
  } finally {
    session.endSession();
  }
};

module.exports = { bulkUpload };
