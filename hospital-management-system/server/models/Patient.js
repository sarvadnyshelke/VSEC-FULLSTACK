const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true },
    age: { type: Number, required: [true, 'Age is required'], min: [0, 'Age cannot be negative'], max: [120, 'Age must be 120 or less'] },
    gender: { type: String, required: [true, 'Gender is required'], enum: ['Male', 'Female', 'Other'] },
    phone: { type: String, required: [true, 'Phone is required'], match: [/^\d{10}$/, 'Phone must be 10 digits'] },
    address: { type: String, required: [true, 'Address is required'], trim: true },
    condition: { type: String, required: [true, 'Medical condition is required'], trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Patient', patientSchema);
