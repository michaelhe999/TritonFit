import { WorkoutFormResponses, WorkoutList, Workout, Difficulty } from "../types/workout";

const mapDifficulty = (difficulty: string): Difficulty => {
    switch (difficulty.toUpperCase()) {
        case "BEGINNER":
            return Difficulty.BEGINNER;
        case "INTERMEDIATE":
            return Difficulty.INTERMEDIATE;
        case "ADVANCED":
            return Difficulty.ADVANCED;
        default:
            return Difficulty.INTERMEDIATE;
    }
};

export const generateWorkout = async(formResponse: WorkoutFormResponses): Promise<WorkoutList> => {
    try {
        const rawResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
            "Authorization": ``,
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            "model": "meta-llama/llama-3.2-3b-instruct:free",
            "messages": [
                {
                "role": "user",
                "content": `give me 2-4 workouts with 7-12 each exercises for a ${formResponse.gender} ${formResponse.level} person who has a goal of ${formResponse.goal} wants to focus on ${formResponse.targetArea} for ${formResponse.duration} long in the form of a json schema raw data like this: {workouts: [workoutName: string, workoutDuration: number, workoutDescription:string, workoutDifficulty: (BEGINNER, INTERMEDIATE, or ADVANCED) exercises: [{name: string, sets: number, reps:string}]]} nothing except the json, make sure the json form is correct.`
                }
            ]
            })
        });

        if (!rawResponse.ok) {
            throw new Error('response not ok');
        }

        const apiResponse = await rawResponse.json();
        const content = apiResponse.choices[0].message.content;

        const cleanContent = content.replace(/```/g, "").trim();
        console.log(cleanContent);

        try {
            const workoutData: WorkoutList = JSON.parse(cleanContent);
            workoutData.workouts = workoutData.workouts.map((workout:Workout) => {
                return {
                    ...workout,  
                    workoutDifficulty: mapDifficulty(workout.workoutDifficulty), 
                }
            })
            return workoutData;
        } catch (error) {
            throw new Error("Invalid JSON format");
        }

    } catch (error) {
        console.log(error);
        throw new Error('failed to generate workout')
    }


      

};