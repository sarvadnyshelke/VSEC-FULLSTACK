import { useEffect, useState } from 'react';
import ResourcePage from '../components/ResourcePage';
import StatusBadge from '../components/StatusBadge';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';
import { appointmentsApi, patientsApi, doctorsApi, errorMessage } from '../services/api';

const columns = [
  { label: 'Patient', render: (a) => a.patient?.name || '—' },
  { label: 'Doctor', render: (a) => a.doctor?.name || '—' },
  { label: 'Date', render: (a) => new Date(a.date).toLocaleDateString() },
  { key: 'time', label: 'Time' },
  { label: 'Status', render: (a) => <StatusBadge value={a.status} /> },
];

export default function Appointments() {
  const [patients, setPatients] = useState(null);
  const [doctors, setDoctors] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([patientsApi.list(), doctorsApi.list()])
      .then(([p, d]) => { setPatients(p); setDoctors(d); })
      .catch((e) => setError(errorMessage(e)));
  }, []);

  if (error) return <Alert type="error">{error}</Alert>;
  if (!patients || !doctors) return <Spinner />;
  if (!patients.length || !doctors.length)
    return <Alert type="error">Add at least one patient and one doctor before booking an appointment.</Alert>;

  const fields = [
    { name: 'patient', label: 'Patient', type: 'select', required: true, options: patients.map((p) => ({ value: p._id, label: p.name })) },
    { name: 'doctor', label: 'Doctor', type: 'select', required: true, options: doctors.map((d) => ({ value: d._id, label: `${d.name} (${d.specialization})` })) },
    { name: 'date', label: 'Date', type: 'date', required: true },
    { name: 'time', label: 'Time', type: 'time', required: true },
    { name: 'status', label: 'Status', type: 'select', required: true, default: 'Scheduled', options: ['Scheduled', 'Completed', 'Cancelled'].map((s) => ({ value: s, label: s })) },
  ];

  return <ResourcePage title="Appointments" singular="Appointment" service={appointmentsApi} fields={fields} columns={columns} />;
}
