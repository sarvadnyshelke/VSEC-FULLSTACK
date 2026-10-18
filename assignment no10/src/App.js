import { useState } from 'react';
import './App.css';
import Input from './Input';
import Display from './Display';

function App() {
  const [page, setPage] = useState('input'); // 'input' or 'display'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
  });

  const handleSubmit = (data) => {
    setFormData(data);
    setPage('display');
  };

  const handleBack = () => setPage('input');

  return (
    <div className="container">
      {page === 'input' ? (
        <Input initialData={formData} onSubmit={handleSubmit} />
      ) : (
        <Display data={formData} onBack={handleBack} />
      )}
    </div>
  );
}

export default App;
