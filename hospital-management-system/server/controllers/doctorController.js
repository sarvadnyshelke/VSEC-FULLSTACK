const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const crud = require('./crudFactory');

module.exports = crud(Doctor, {
  label: 'Doctor',
  afterDelete: (d) => Appointment.deleteMany({ doctor: d._id }),
});
