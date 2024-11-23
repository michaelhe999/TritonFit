export enum Difficulty {
    BEGINNER = "Beginner",
    INTERMEDIATE = "Intermediate",
    ADVANCED = "Advanced"
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

export interface Exercise {
    name: string,
    sets: number,
    reps: string
} 