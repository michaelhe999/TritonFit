import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ThisWeek from './ThisWeek';

describe('ThisWeek Component', () => {
    const hoursData: { [day: string]: number } = {
        Sun: 4,
        Mon: 0,
        Tue: 2,
        Wed: 0,
        Thu: 2,
        Fri: 0,
        Sat: 2,
      };
    
      const completedDays = Object.keys(hoursData).filter(
        (day) => hoursData[day] > 0
      );

  it('renders the This Week component correctly', () => {
    render(<ThisWeek completedDays={completedDays}/>);
    completedDays.forEach((day) => {
      expect(screen.getByText(day)).toHaveClass('completed');
    });
  });

  it('shows the correct number of completed days', () => {
    render(<ThisWeek completedDays={completedDays}/>);
    expect(screen.getByText('4/7 Days')).toBeInTheDocument();
  });

});
