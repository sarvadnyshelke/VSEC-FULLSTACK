import ResourcePage from '../components/ResourcePage';

const fields = [
  { name: 'name', label: 'Name', required: true },
  { name: 'age', label: 'Age', type: 'number', min: 0, max: 120, required: true },
  { name: 'gender', label: 'Gender', options: ['Male', 'Female', 'Other'], required: true },
  { name: 'phone', label: 'Phone', required: true },
  { name: 'address', label: 'Address', required: true },
  { name: 'condition', label: 'Medical Condition', required: true },
];

export default function Patients() {
  return <ResourcePage title="Patients" resource="patients" fields={fields} />;
}
