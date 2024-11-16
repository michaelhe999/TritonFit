import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';

describe('Home Component', () => {
  it('renders the Home component correctly', () => {
    render(<Home />);
    expect(screen.getByText('This Week')).toBeInTheDocument();
    expect(screen.getByText('Hours')).toBeInTheDocument();
  });

  it('calls the alert when the notification icon is clicked', () => {
    window.alert = jest.fn();

    render(<Home />);
    const notificationIcon = screen.getByRole('button', { name: /notification/i });
    fireEvent.click(notificationIcon);

    expect(window.alert).toHaveBeenCalledWith('Notification icon clicked!');
  });
});
