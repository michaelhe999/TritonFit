import express from 'express';
import { getRecentWorkouts, addRecentWorkout } from '../utils/recentWorkoutsUtils';
const RecentWorkoutRouter = express.Router();

// Get all workouts for a user
RecentWorkoutRouter.get('/get/:id', async (req, res) => {
    const id = req.params.id;
    getRecentWorkouts(req, res, id)
});

// Create a new workout
RecentWorkoutRouter.post('/add/:id', async (req, res) => {
    const id = req.params.id;
    addRecentWorkout(req, res, id);
});

export default RecentWorkoutRouter;