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

export const ex1: Exercise[] = [
    {
        id: 1,
        name: "Full Body HIIT",
        duration: 50,
        difficulty: Difficulty.INTERMEDIATE
    }, {
        id: 2,
        name: "Chest Strength",
        duration: 30,
        difficulty: Difficulty.ADVANCED
    }, {
        id: 3,
        name: "Shoulder Builder",
        duration: 45,
        difficulty: Difficulty.BEGINNER
    }
];