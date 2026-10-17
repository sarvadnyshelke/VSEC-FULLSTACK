const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: [true, 'Patient is required'] },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: [true, 'Doctor is required'] },
    date: { type: Date, required: [true, 'Date is required'] },
    time: { type: String, required: [true, 'Time is required'], match: [/^([01]\d|2[0-3]):[0-5]\d$/, 'Time must be HH:MM'] },
    status: { type: String, enum: { values: ['Scheduled', 'Completed', 'Cancelled'], message: 'Invalid status' }, default: 'Scheduled' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
