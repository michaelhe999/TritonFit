import { Exercise } from "./exercise"

export enum Difficulty {
    BEGINNER = "Beginner",
    INTERMEDIATE = "Intermediate",
    ADVANCED = "Advanced"
}

export interface WorkoutFormResponses {
    gender: string,
    goal: string,
    targetArea: string,
    level: string,
    duration: string
}

export interface Workout {
    workoutName: string,
    workoutDescription: string,
    workoutDuration: number,
    workoutDifficulty: Difficulty,
    exercises: Exercise[]
}

export interface WorkoutList {
    workouts: Workout[];
}
