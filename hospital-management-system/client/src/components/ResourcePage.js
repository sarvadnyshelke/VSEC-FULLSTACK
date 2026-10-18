import { useEffect, useState } from 'react';
import { getAll, createItem, updateItem, deleteItem, errorText } from '../services/api';
import ResourceForm from './ResourceForm';
import Message from './Message';

// One page that handles list + add + edit + delete for any resource
export default function ResourcePage({ title, resource, fields }) {
  const [items, setItems] = useState([]);
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [editing, setEditing] = useState(null); // null = form hidden, {} = new, item = edit

  const load = async () => {
    try {
      setLoading(true);
      setItems(await getAll(resource));
      const opts = {};
      for (const f of fields) {
        if (f.optionsFrom) opts[f.name] = (await getAll(f.optionsFrom)).map((x) => x.name);
      }
      setOptions(opts);
    } catch (err) {
      setMessage({ type: 'error', text: errorText(err) });
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { load(); }, [resource]);

  const save = async (values) => {
    try {
      if (editing._id) await updateItem(resource, editing._id, values);
      else await createItem(resource, values);
      setMessage({ type: 'success', text: editing._id ? 'Record updated successfully' : 'Record added successfully' });
      setEditing(null);
      load();
    } catch (err) {
      setMessage({ type: 'error', text: errorText(err) });
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    try {
      await deleteItem(resource, id);
      setMessage({ type: 'success', text: 'Record deleted successfully' });
      load();
    } catch (err) {
      setMessage({ type: 'error', text: errorText(err) });
    }
  };

  const show = (f, v) => (f.type === 'date' ? String(v).slice(0, 10) : v);

  return (
    <div>
      <div className="page-head">
        <h1>{title}</h1>
        <button className="btn" onClick={() => { setMessage(null); setEditing({}); }}>+ Add New</button>
      </div>

      <Message message={message} />

      {editing && (
        <ResourceForm key={editing._id || 'new'} fields={fields} options={options} item={editing}
          onSave={save} onCancel={() => setEditing(null)} />
      )}

      <div className="card table-wrap">
        {loading ? (
          <p className="empty">Loading...</p>
        ) : items.length === 0 ? (
          <p className="empty">No records found. Click "Add New" to create one.</p>
        ) : (
          <table>
            <thead>
              <tr>
                {fields.map((f) => <th key={f.name}>{f.label}</th>)}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  {fields.map((f) => (
                    <td key={f.name}>
                      {f.name === 'status'
                        ? <span className={`badge ${item.status.toLowerCase()}`}>{item.status}</span>
                        : show(f, item[f.name])}
                    </td>
                  ))}
                  <td className="actions">
                    <button className="btn btn-small" onClick={() => { setMessage(null); setEditing(item); }}>Edit</button>
                    <button className="btn btn-small btn-light" onClick={() => remove(item._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
