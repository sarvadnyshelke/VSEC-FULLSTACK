import { render, screen } from '@testing-library/react';
import App from './App';

test('renders registration form', () => {
  render(<App />);
  expect(screen.getByText(/Registration Form/i)).toBeInTheDocument();
});
