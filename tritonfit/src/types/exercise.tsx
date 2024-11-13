export enum Difficulty {
    BEGINNER = "Beginner",
    INTERMEDIATE = "Intermediate",
    ADVANCED = "Advanced"

}

export interface Exercise {
    id: number;
    name: string;
    duration: number;
    difficulty: Difficulty;
} 