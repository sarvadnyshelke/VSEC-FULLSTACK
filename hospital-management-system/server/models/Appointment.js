const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: [true, 'Patient name is required'], trim: true },
    doctorName: { type: String, required: [true, 'Doctor name is required'], trim: true },
    date: { type: Date, required: [true, 'Date is required'] },
    time: { type: String, required: [true, 'Time is required'] },
    status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'], default: 'Scheduled' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
