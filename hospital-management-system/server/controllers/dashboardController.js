const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

exports.getStats = async (req, res, next) => {
  try {
    const [patients, doctors, appointments, recent] = await Promise.all([
      Patient.countDocuments(),
      Doctor.countDocuments(),
      Appointment.countDocuments(),
      Appointment.find().sort({ createdAt: -1 }).limit(5).populate('patient doctor'),
    ]);
    res.json({ patients, doctors, appointments, recent });
  } catch (err) {
    next(err);
  }
};
