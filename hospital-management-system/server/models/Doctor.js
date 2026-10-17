const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true },
    specialization: { type: String, required: [true, 'Specialization is required'], trim: true },
    phone: { type: String, required: [true, 'Phone is required'], match: [/^[0-9+\-\s]{7,15}$/, 'Invalid phone number'] },
    availability: { type: String, enum: { values: ['Available', 'Not Available'], message: 'Invalid availability' }, default: 'Available' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Doctor', doctorSchema);
