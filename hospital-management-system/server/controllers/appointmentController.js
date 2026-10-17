const Appointment = require('../models/Appointment');
const crud = require('./crudFactory');

module.exports = crud(Appointment, { label: 'Appointment', populate: 'patient doctor' });
