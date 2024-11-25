import mongoose, { Document, Schema } from "mongoose";
import { Workout } from "../types";

// Main Workout schema which links to the user
interface IWorkout extends Document {
  workoutData: Workout[]; 
  user: mongoose.Types.ObjectId;  // Foreign key reference to User model
}

const MainWorkoutSchema: Schema = new Schema<IWorkout>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Foreign key to User model
  workoutData: { type: [Object], default: [] }, 
});

const RecentWorkouts = mongoose.model<IWorkout>("saved_workouts", MainWorkoutSchema);

export default RecentWorkouts;