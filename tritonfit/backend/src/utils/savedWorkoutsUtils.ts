import { Response, Request } from 'express';
import SavedWorkouts from '../models/savedWorkoutModel';
import { Workout } from '../types';

export async function getSavedWorkouts(req: Request, res: Response, id: string) {
    try {
        const workouts = await SavedWorkouts.find({ user: id });
        res.status(200).json(workouts);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch workouts', error: err });
    }
}

export async function addSavedWorkout(req: Request, res: Response, id: string) {
    try {
        const { workout } = req.body as { workout: Workout };
 
        if (!workout) {
            return res.status(400).send({ error: "Missing required fields" });
        }

        const updatedWorkout = await SavedWorkouts.findOneAndUpdate(
            { user: id },
            {
                $push: { workoutData: workout }, 
            },
            { upsert: true, new: true}
        );
        
        // Ensure the field is initialized if the document was inserted
        if (!updatedWorkout.workoutData) {
            updatedWorkout.workoutData = [];
            await updatedWorkout.save();
        }
        
        res.status(201).send({message:'Successfully added workout'});
    } catch (err) {
        res.status(500).json({ message: 'Failed to add workout', error: err });
    }
}

export async function deleteSavedWorkouts(req: Request, res: Response, id: string) {
    try {
        await SavedWorkouts.findOneAndUpdate(
            { user: id },                 
            { $set: { workoutData: [] }}, // Clear the workout array                
        );
        res.status(201).send({message:'Successfully deleted workouts'});
    } catch(err) {
        res.status(500).json({ message: 'Failed to delete workouts', error: err})
    }
}