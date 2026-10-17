import { useEffect, useState } from 'react';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';
import StatusBadge from '../components/StatusBadge';
import { getDashboard, errorMessage } from '../services/api';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getDashboard().then(setData).catch((e) => setError(errorMessage(e)));
  }, []);

  if (error) return <Alert type="error">{error}</Alert>;
  if (!data) return <Spinner />;

  const stats = [
    { label: 'Total Patients', value: data.patients },
    { label: 'Total Doctors', value: data.doctors },
    { label: 'Total Appointments', value: data.appointments },
  ];

  return (
    <>
      <div className="page-head"><h2>Dashboard</h2></div>
      <div className="stats">
        {stats.map((s) => (
          <div className="card stat" key={s.label}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
      <h3 className="section-title">Recent Appointments</h3>
      <div className="card">
        {data.recent.length === 0 ? (
          <div className="empty">No appointments yet.</div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Patient</th><th>Doctor</th><th>Date</th><th>Time</th><th>Status</th></tr></thead>
              <tbody>
                {data.recent.map((a) => (
                  <tr key={a._id}>
                    <td>{a.patient?.name || '—'}</td>
                    <td>{a.doctor?.name || '—'}</td>
                    <td>{new Date(a.date).toLocaleDateString()}</td>
                    <td>{a.time}</td>
                    <td><StatusBadge value={a.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
