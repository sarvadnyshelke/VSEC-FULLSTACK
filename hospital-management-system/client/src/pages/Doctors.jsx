import ResourcePage from '../components/ResourcePage';
import StatusBadge from '../components/StatusBadge';
import { doctorsApi } from '../services/api';

const fields = [
  { name: 'name', label: 'Name', required: true },
  { name: 'specialization', label: 'Specialization', required: true },
  { name: 'phone', label: 'Phone', required: true, pattern: /^[0-9+\-\s]{7,15}$/, patternMessage: 'Enter a valid phone number (7-15 digits)' },
  { name: 'availability', label: 'Availability', type: 'select', required: true, default: 'Available', options: ['Available', 'Not Available'].map((a) => ({ value: a, label: a })) },
];

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'specialization', label: 'Specialization' },
  { key: 'phone', label: 'Phone' },
  { label: 'Availability', render: (d) => <StatusBadge value={d.availability} /> },
];

export default function Doctors() {
  return <ResourcePage title="Doctors" singular="Doctor" service={doctorsApi} fields={fields} columns={columns} />;
}
