import { useState } from 'react';

// A reusable form built from a list of field settings
export default function ResourceForm({ fields, options, item, onSave, onCancel }) {
  const start = {};
  fields.forEach((f) => {
    const old = item[f.name];
    start[f.name] = old === undefined ? f.default || '' : f.type === 'date' ? String(old).slice(0, 10) : old;
  });
  const [values, setValues] = useState(start);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    fields.forEach((f) => {
      const v = String(values[f.name]).trim();
      if (f.required && !v) e[f.name] = `${f.label} is required`;
      else if (v && f.type === 'number' && (isNaN(v) || v < f.min || v > f.max))
        e[f.name] = `${f.label} must be between ${f.min} and ${f.max}`;
      else if (v && f.name === 'phone' && !/^\d{10}$/.test(v)) e[f.name] = 'Phone must be 10 digits';
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (validate()) onSave(values);
  };

  const change = (e) => setValues({ ...values, [e.target.name]: e.target.value });

  return (
    <form className="card form" onSubmit={submit} noValidate>
      <h3>{item._id ? 'Edit' : 'Add'} Record</h3>
      <div className="form-grid">
        {fields.map((f) => {
          const list = f.options || options[f.name] || [];
          return (
            <div className="field" key={f.name}>
              <label>{f.label}</label>
              {f.options || f.optionsFrom ? (
                <select name={f.name} value={values[f.name]} onChange={change}>
                  <option value="">Select</option>
                  {list.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : (
                <input name={f.name} type={f.type || 'text'} value={values[f.name]} onChange={change} />
              )}
              {f.optionsFrom && list.length === 0 && <small>Please add a {f.optionsFrom.slice(0, -1)} first.</small>}
              {errors[f.name] && <small className="error-text">{errors[f.name]}</small>}
            </div>
          );
        })}
      </div>
      <div className="actions">
        <button type="submit" className="btn">Save</button>
        <button type="button" className="btn btn-light" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
