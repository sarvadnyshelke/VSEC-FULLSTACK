// Green = good state (Available / Completed); everything else is neutral.
const good = ['Available', 'Completed'];

export default function StatusBadge({ value }) {
  return <span className={`badge ${good.includes(value) ? 'badge-green' : 'badge-gray'}`}>{value}</span>;
}
