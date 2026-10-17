import { useEffect, useState } from 'react';
import Alert from './Alert';
import Spinner from './Spinner';
import Modal from './Modal';
import { errorMessage } from '../services/api';

// Reusable list + add/edit form + delete page.
// props: title, singular, service, fields, columns
function validate(fields, values) {
  const errs = {};
  fields.forEach((f) => {
    const v = String(values[f.name] ?? '').trim();
    if (f.required && !v) return void (errs[f.name] = `${f.label} is required`);
    if (!v) return;
    if (f.type === 'number') {
      const n = Number(v);
      if (Number.isNaN(n) || n < f.min || n > f.max) errs[f.name] = `${f.label} must be between ${f.min} and ${f.max}`;
    }
    if (f.pattern && !f.pattern.test(v)) errs[f.name] = f.patternMessage;
  });
  return errs;
}

const initialValues = (fields) => Object.fromEntries(fields.map((f) => [f.name, f.default ?? '']));

export default function ResourcePage({ title, singular, service, fields, columns }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editing, setEditing] = useState(null); // null = closed, {} = new, {_id} = edit
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const load = async () => {
    try {
      setItems(await service.list());
      setError('');
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const openForm = (item) => {
    const v = initialValues(fields);
    if (item) {
      fields.forEach((f) => {
        let val = item[f.name];
        if (val && typeof val === 'object') val = val._id;
        if (f.type === 'date' && val) val = String(val).slice(0, 10);
        v[f.name] = val ?? '';
      });
    }
    setValues(v);
    setErrors({});
    setEditing(item || {});
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = validate(fields, values);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSaving(true);
    try {
      if (editing._id) await service.update(editing._id, values);
      else await service.create(values);
      setSuccess(`${singular} ${editing._id ? 'updated' : 'added'} successfully.`);
      setError('');
      setEditing(null);
      await load();
    } catch (err) {
      setErrors({ _form: errorMessage(err) });
    } finally {
      setSaving(false);
    }
  };

  const remove = async (item) => {
    if (!window.confirm(`Delete this ${singular.toLowerCase()}? This cannot be undone.`)) return;
    try {
      await service.remove(item._id);
      setSuccess(`${singular} deleted successfully.`);
      await load();
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  const change = (name, val) => setValues((v) => ({ ...v, [name]: val }));

  return (
    <>
      <div className="page-head">
        <h2>{title}</h2>
        <button className="btn btn-primary" onClick={() => openForm(null)}>+ Add {singular}</button>
      </div>
      <Alert type="success" onClose={() => setSuccess('')}>{success}</Alert>
      <Alert type="error" onClose={() => setError('')}>{error}</Alert>

      <div className="card">
        {loading ? (
          <Spinner />
        ) : items.length === 0 ? (
          <div className="empty">No {title.toLowerCase()} yet. Click “Add {singular}” to create the first one.</div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>{columns.map((c) => <th key={c.label}>{c.label}</th>)}<th>Actions</th></tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id}>
                    {columns.map((c) => <td key={c.label}>{c.render ? c.render(item) : item[c.key]}</td>)}
                    <td className="actions">
                      <button className="btn btn-outline btn-sm" onClick={() => openForm(item)}>Edit</button>
                      <button className="btn btn-outline btn-sm" onClick={() => remove(item)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editing && (
        <Modal title={`${editing._id ? 'Edit' : 'Add'} ${singular}`} onClose={() => setEditing(null)}>
          <form onSubmit={submit} noValidate>
            <Alert type="error">{errors._form}</Alert>
            {fields.map((f) => (
              <div className="field" key={f.name}>
                <label htmlFor={f.name}>{f.label}</label>
                {f.type === 'select' ? (
                  <select id={f.name} value={values[f.name]} onChange={(e) => change(f.name, e.target.value)}>
                    <option value="">Select {f.label.toLowerCase()}</option>
                    {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                ) : f.type === 'textarea' ? (
                  <textarea id={f.name} rows="2" value={values[f.name]} onChange={(e) => change(f.name, e.target.value)} />
                ) : (
                  <input id={f.name} type={f.type || 'text'} min={f.min} max={f.max} value={values[f.name]} onChange={(e) => change(f.name, e.target.value)} />
                )}
                {errors[f.name] && <small className="field-error">{errors[f.name]}</small>}
              </div>
            ))}
            <div className="modal-foot">
              <button type="button" className="btn btn-outline" onClick={() => setEditing(null)}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
