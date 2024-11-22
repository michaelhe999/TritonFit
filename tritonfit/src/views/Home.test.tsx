import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';

describe('Home Component', () => {
  it('renders the Home component correctly', () => {
    render(<Home />);
    expect(screen.getByText('This Week')).toBeInTheDocument();
    expect(screen.getByText('Hours')).toBeInTheDocument();
  });
});
