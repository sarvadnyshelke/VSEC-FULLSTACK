import ResourcePage from '../components/ResourcePage';

const fields = [
  { name: 'name', label: 'Name', required: true },
  { name: 'specialization', label: 'Specialization', required: true },
  { name: 'phone', label: 'Phone', required: true },
];

export default function Doctors() {
  return <ResourcePage title="Doctors" resource="doctors" fields={fields} />;
}
