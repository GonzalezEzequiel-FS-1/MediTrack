const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    dateTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled", "Rescheduled"],
      default: "Scheduled",
    },
    location: String,
    notes: String,
  },
  { _id: false }
);
const visitSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    typeOfPhysical: {
      type: String,
      required: true,
      enum: ["Fit For Duty", "Post Hire Questionnaire", "DOT", "Custom"],
    },
    service: {
      type: String,
      required: true,
      enum: [
        "General Fit For Duty",
        "Horticulture Medical",
        "Paint Medical",
        "Pest Control Medical",
        "Respirator Medical",
        "Welder Medical",
        "Hazmat Medical",
        "Custom",
      ],
    },
    testToPerform: {
      type: [String],
      enum: [
        "Ear Irrigation",
        "Audiogram",
        "Comprehensive Metabolic Panel",
        "CBC w/ differential and platelets",
        "Chest X-Ray",
        "ECG",
        "Pulmonary Function Test",
        "Hepatitis B Titer",
        "Liver Function Blood Test",
        "Respirator Questionnaire",
        "Respirator Fit Test",
        "STS Evaluation",
        "Titmus Vision Test",
        "Ishihara Test",
        "Urinalysis",
        "Vision Test",
      ],
      default: [],
    },
    status: {
      type: String,
      enum: ["Scheduled", "Pending", "Rescheduled", "No Show"],
    },
    appointments: [appointmentSchema],
    version: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

visitSchema.index({ patient: 1 });
visitSchema.index({ status: 1 });
visitSchema.index({ "appointments.dateTime": 1 });

module.exports = mongoose.model("Visit", visitSchema);
