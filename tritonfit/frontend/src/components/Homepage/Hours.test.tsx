import React from 'react';
import { render, screen } from '@testing-library/react';
import Hours from './Hours';

describe('Hours Component', () => {
  const hoursData = {
    Sun: 5,
    Mon: 2,
    Tue: 3,
    Wed: 0,
    Thu: 4,
    Fri: 0,
    Sat: 0,
  };

  const totalHours = Object.values(hoursData).reduce(
    (sum, hours) => sum + hours,
    0
  );

  it('renders the Hours component with correct total hours', () => {
    render(<Hours hoursData={hoursData} totalHours={totalHours}/>);
    expect(screen.getByText('14 hours')).toBeInTheDocument();
  });

  it('renders bars with the correct height based on hours', () => {
    render(<Hours hoursData={hoursData} totalHours={totalHours}/>);
    const sunBar = screen.getByText('5hr').closest('.bar');
    expect(sunBar).toHaveStyle(`height: 100%`);

    const monBar = screen.getByText('2hr').closest('.bar');
    expect(monBar).toHaveStyle(`height: 40%`);

    const tueBar = screen.getByText('3hr').closest('.bar');
    expect(tueBar).toHaveStyle(`height: 60%`);
  });
});
