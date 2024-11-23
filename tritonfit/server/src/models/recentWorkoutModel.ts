import mongoose, { Document, Schema } from "mongoose";
import { Difficulty, Exercise, Workout } from "../types";

// Exercise schema
const ExerciseSchema: Schema = new Schema<Exercise>({
  name: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: String, required: true },
});

// Workout schema
const WorkoutSchema: Schema = new Schema<Workout>({
  workoutName: { type: String, required: true },
  workoutDescription: { type: String, required: true },
  workoutDuration: { type: Number, required: true },
  workoutDifficulty: {
    type: String,
    enum: Object.values(Difficulty),
    required: true,
  },
  exercises: [ExerciseSchema], 
});

// Main Workout schema which links to the user
interface IWorkout extends Document {
  workoutData: Workout[]; 
  user: mongoose.Types.ObjectId;  // Foreign key reference to User model
}

const MainWorkoutSchema: Schema = new Schema<IWorkout>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Foreign key to User model
  workoutData: [WorkoutSchema], 
});

const RecentWorkouts = mongoose.model<IWorkout>("Workout", MainWorkoutSchema);

export default RecentWorkouts;
