const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true },
    specialization: { type: String, required: [true, 'Specialization is required'], trim: true },
    phone: { type: String, required: [true, 'Phone is required'], match: [/^\d{10}$/, 'Phone must be 10 digits'] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Doctor', doctorSchema);
