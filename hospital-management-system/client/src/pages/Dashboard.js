import { useEffect, useState } from 'react';
import { getDashboard, errorText } from '../services/api';
import Message from '../components/Message';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    getDashboard().then(setData).catch((err) => setMessage({ type: 'error', text: errorText(err) }));
  }, []);

  if (!data) return <div><h1>Dashboard</h1><Message message={message} />{!message && <p className="empty">Loading...</p>}</div>;

  const stats = [
    { label: 'Total Patients', value: data.patients },
    { label: 'Total Doctors', value: data.doctors },
    { label: 'Total Appointments', value: data.appointments },
  ];

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="stats">
        {stats.map((s) => (
          <div className="card stat" key={s.label}>
            <span>{s.label}</span>
            <strong>{s.value}</strong>
          </div>
        ))}
      </div>

      <h2>Recent Appointments</h2>
      <div className="card table-wrap">
        {data.recent.length === 0 ? (
          <p className="empty">No appointments yet.</p>
        ) : (
          <table>
            <thead><tr><th>Patient</th><th>Doctor</th><th>Date</th><th>Time</th><th>Status</th></tr></thead>
            <tbody>
              {data.recent.map((a) => (
                <tr key={a._id}>
                  <td>{a.patientName}</td>
                  <td>{a.doctorName}</td>
                  <td>{String(a.date).slice(0, 10)}</td>
                  <td>{a.time}</td>
                  <td><span className={`badge ${a.status.toLowerCase()}`}>{a.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
