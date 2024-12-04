import React from 'react';
import { render, screen } from '@testing-library/react';
import { FindAWorkout } from './FindAWorkout';
import { MemoryRouter} from 'react-router-dom';

test('Find a workout page when no saved or recent workouts', () => {
    render(    
    <MemoryRouter>
        <FindAWorkout />
    </MemoryRouter>
    );
    const header = screen.getByText('Find A Workout');
    expect(header).toBeInTheDocument();

    const recentWorkoutButton = screen.getByTestId('recentWorkoutButton')
    expect(recentWorkoutButton).toBeInTheDocument();

    const savedWorkoutButton = screen.getByTestId('savedWorkoutButton')
    expect(savedWorkoutButton).toBeInTheDocument();

    const generateWorkoutButton = screen.getByTestId('generateWorkoutButton');
    expect(generateWorkoutButton).toBeInTheDocument();

});