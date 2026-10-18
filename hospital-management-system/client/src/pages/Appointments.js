import ResourcePage from '../components/ResourcePage';

const fields = [
  { name: 'patientName', label: 'Patient Name', optionsFrom: 'patients', required: true },
  { name: 'doctorName', label: 'Doctor Name', optionsFrom: 'doctors', required: true },
  { name: 'date', label: 'Date', type: 'date', required: true },
  { name: 'time', label: 'Time', type: 'time', required: true },
  { name: 'status', label: 'Status', options: ['Scheduled', 'Completed', 'Cancelled'], default: 'Scheduled', required: true },
];

export default function Appointments() {
  return <ResourcePage title="Appointments" resource="appointments" fields={fields} />;
}
