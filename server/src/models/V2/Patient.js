const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    TMID: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{9}$/, "Team Member ID must be 9 digits"],
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    DOB: {
      type: Date,
      required: true,
    },
    jobTitle: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

patientSchema.virtual("fullName").get(function () {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  return `${capitalize(this.firstName)} ${capitalize(this.lastName)}`;
});


patientSchema.virtual("visits", {
  ref: "Visit",
  localField: "_id",
  foreignField: "patient",
});

module.exports = mongoose.model("Patient", patientSchema);
