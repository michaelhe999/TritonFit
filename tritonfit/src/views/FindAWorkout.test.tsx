import React from 'react';
import { render, screen } from '@testing-library/react';
import { FindAWorkout } from './FindAWorkout';

test('renders learn react link', () => {
    render(<FindAWorkout />);
    const header = screen.getByText('Find A Workout');
    expect(header).toBeInTheDocument();

    const searchBar = screen.getByTestId('searchLabel');
    expect(searchBar).toBeInTheDocument();

    const recentWorkoutButton = screen.getByTestId('recentWorkoutButton')
    expect(recentWorkoutButton).toBeInTheDocument();

    const savedWorkoutButton = screen.getByTestId('savedWorkoutButton')
    expect(savedWorkoutButton).toBeInTheDocument();

    const generateWorkoutButton = screen.getByTestId('generateWorkoutButton');
    expect(generateWorkoutButton).toBeInTheDocument();

});