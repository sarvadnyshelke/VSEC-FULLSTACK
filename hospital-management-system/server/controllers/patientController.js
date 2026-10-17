const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const crud = require('./crudFactory');

module.exports = crud(Patient, {
  label: 'Patient',
  afterDelete: (p) => Appointment.deleteMany({ patient: p._id }), // remove orphaned appointments
});
