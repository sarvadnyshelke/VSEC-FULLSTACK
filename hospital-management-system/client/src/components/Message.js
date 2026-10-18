// Shows a success or error message. type = 'success' | 'error'
export default function Message({ message }) {
  if (!message) return null;
  return <div className={`message ${message.type}`}>{message.text}</div>;
}
