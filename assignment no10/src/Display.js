function Display({ data, onBack }) {
  return (
    <div>
      <h2>Submitted Details</h2>
      <div className="details">
        <p><strong>Name:</strong> {data.name}</p>
        <p><strong>Email:</strong> {data.email}</p>
        <p><strong>Phone:</strong> {data.phone}</p>
        <p><strong>City:</strong> {data.city}</p>
      </div>
      <button onClick={onBack}>Back to Form</button>
    </div>
  );
}

export default Display;
