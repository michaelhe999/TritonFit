import { Response, Request } from 'express';
import RecentWorkouts from '../models/recentWorkoutModel';
import { Workout } from '../types';

export async function getRecentWorkouts(req: Request, res: Response, id: string) {
    try {
        const workouts = await RecentWorkouts.find({ user: id });
        res.status(200).json(workouts);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch workouts', error: err });
    }
}

export async function addRecentWorkout(req: Request, res: Response, id: string) {
    try {
        const { workout } = req.body as { workout: Workout };
 
        if (!workout) {
            return res.status(400).send({ error: "Missing required fields" });
        }

        const updatedWorkouts = await RecentWorkouts.findOneAndUpdate(
        { user: id },
        {
            $push: {
            workoutData: workout,
            },
            $setOnInsert: { workoutData: [] },  // Initialize if not present
        },
        { upsert: true }
        );

        // Limit number of workouts to 10
        if (updatedWorkouts && updatedWorkouts.workoutData.length > 10) {
            updatedWorkouts.workoutData.shift(); // Remove the oldest workout
            await updatedWorkouts.save();
        }
        res.status(201).send({message:'Successfully added workout'});
    } catch (err) {
        res.status(500).json({ message: 'Failed to add workout', error: err });
    }
}
