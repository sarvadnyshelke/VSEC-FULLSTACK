import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const links = [
    { to: '/', label: 'Dashboard' },
    { to: '/patients', label: 'Patients' },
    { to: '/doctors', label: 'Doctors' },
    { to: '/appointments', label: 'Appointments' },
  ];

  return (
    <div className="app">
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <h2 className="logo">HMS</h2>
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} end onClick={() => setOpen(false)}>
            {l.label}
          </NavLink>
        ))}
      </aside>
      <div className="main">
        <header className="topbar">
          <button className="menu-btn" onClick={() => setOpen(!open)}>Menu</button>
          <span>Hospital Management System</span>
        </header>
        <main className="content">{children}</main>
      </div>
    </div>
  );
}
