import ResourcePage from '../components/ResourcePage';
import { patientsApi } from '../services/api';

const phone = { pattern: /^[0-9+\-\s]{7,15}$/, patternMessage: 'Enter a valid phone number (7-15 digits)' };

const fields = [
  { name: 'name', label: 'Name', required: true },
  { name: 'age', label: 'Age', type: 'number', min: 0, max: 120, required: true },
  { name: 'gender', label: 'Gender', type: 'select', required: true, options: ['Male', 'Female', 'Other'].map((g) => ({ value: g, label: g })) },
  { name: 'phone', label: 'Phone', required: true, ...phone },
  { name: 'address', label: 'Address', type: 'textarea', required: true },
  { name: 'medicalCondition', label: 'Medical Condition', required: true },
];

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age' },
  { key: 'gender', label: 'Gender' },
  { key: 'phone', label: 'Phone' },
  { key: 'address', label: 'Address' },
  { key: 'medicalCondition', label: 'Condition' },
];

export default function Patients() {
  return <ResourcePage title="Patients" singular="Patient" service={patientsApi} fields={fields} columns={columns} />;
}
