import { useState } from 'react';

function Input({ initialData, onSubmit }) {
  const [form, setForm] = useState(initialData);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.city) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Registration Form</h1>

      <label htmlFor="name">Name</label>
      <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Enter your name" />
      <br /><br />

      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="Enter your email" />
      <br /><br />

      <label htmlFor="phone">Phone</label>
      <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Enter your phone" />
      <br /><br />

      <label htmlFor="city">City</label>
      <input id="city" name="city" value={form.city} onChange={handleChange} placeholder="Enter your city" />
      <br /><br />

      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}

export default Input;
