const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true },
    age: { type: Number, required: [true, 'Age is required'], min: [0, 'Age must be 0-120'], max: [120, 'Age must be 0-120'] },
    gender: { type: String, required: [true, 'Gender is required'], enum: { values: ['Male', 'Female', 'Other'], message: 'Invalid gender' } },
    phone: { type: String, required: [true, 'Phone is required'], match: [/^[0-9+\-\s]{7,15}$/, 'Invalid phone number'] },
    address: { type: String, required: [true, 'Address is required'], trim: true },
    medicalCondition: { type: String, required: [true, 'Medical condition is required'], trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Patient', patientSchema);
