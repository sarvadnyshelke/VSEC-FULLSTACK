import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/patients', label: 'Patients' },
  { to: '/doctors', label: 'Doctors' },
  { to: '/appointments', label: 'Appointments' },
];

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="app">
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="brand">
          <span className="brand-mark">+</span> MediCare
        </div>
        <nav>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="main">
        <header className="topbar">
          <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            ☰
          </button>
          <h1>Hospital Management System</h1>
        </header>
        <main className="content">{children}</main>
      </div>
    </div>
  );
}
