import express from 'express';
import { getSavedWorkouts, addSavedWorkout, deleteSavedWorkouts } from '../utils/savedWorkoutsUtils';
const SavedWorkoutRouter = express.Router();

// Get all workouts for a user
SavedWorkoutRouter.get('/get/:id', async (req, res) => {
    const id = req.params.id;
    getSavedWorkouts(req, res, id)
});

// Create a new workout
SavedWorkoutRouter.post('/add/:id', async (req, res) => {
    const id = req.params.id;
    addSavedWorkout(req, res, id);
});

// Delete all saved workouts
SavedWorkoutRouter.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    deleteSavedWorkouts(req, res, id);
});

export default SavedWorkoutRouter;