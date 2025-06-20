const validateEmail = require('../modules/validateEmail')
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  dateTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["Scheduled", "Completed", "Cancelled", "Rescheduled"],
    default: "Scheduled"
  },
  location: String,
  notes: String
}, { _id: false });

const patientSchema = new mongoose.Schema({
  firstName:{
    type:String,
    trim:true,
    required:true,
    lowercase:true
  },
  lastName:{
    type:String,
    trim:true,
    required:true,
    lowercase:true
  },
  TMID: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{9}$/, 'Team Member ID must be exactly 9 digits']
  },
  jobTitle:{
    type:String,
    required:true,
    trim:true
  },
  reschedule:{
    type:Boolean,
    required:true,
    default:false
  },
  DOB:{
    type:Date,
    required:true,
    trim:true
  },
  email:{
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
  },
  phone: {
    type: String,
    unique: [true, "Phone number is already in use."],
    default: "",
    required: false,
    match: [/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/, 'Please enter a valid phone number']
  },
  typeOfPhysical:{
    type:String,
    required:true,
    enum:[
      "Fit For Duty",
      "Post Hire Questionnaire",
      "DOT",
      "Custom"
    ]
  },
  service:{
    type:String,
    required:true,
    enum:[
        "General Fit For Duty",
        "Horticulture Medical",
        "Paint Medical",
        "Pest Control Medical",
        "Respirator Medical",
        "Welder Medical",
        "Hazmat Medical",
        "Custom"
      ]
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
      "Vision Test"
    ],
    default: []
  },
  status:{
    type:String,
    enum:[
      "Scheduled",
      "Pending",
      "Rescheduled",
      "No Show"
    ]
  },
  appointments: [appointmentSchema],
  version:{
    type:Number,
    required:true,
    default:0
  }
},{
    timestamps:true
  }
);

patientSchema.virtual('fullName').get(function () {
  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
  return `${capitalize(this.firstName)} ${capitalize(this.lastName)}`;
});


patientSchema.set('toJSON', { virtuals: true });
patientSchema.set('toObject', { virtuals: true });

// Adding indexing for Status, email and Team Member ID
patientSchema.index({ email: 1 });
patientSchema.index({ TMID: 1 });
patientSchema.index({ status: 1 });
patientSchema.index({ 'appointments.dateTime': 1 });


module.exports = mongoose.model('Patient', patientSchema)