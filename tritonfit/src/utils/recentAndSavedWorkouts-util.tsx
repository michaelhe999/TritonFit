import { API_BASE_URL } from "../constants/apiBase";
import { Workout } from "../types/workout";

export const getRecentWorkouts  = async (id: string): Promise<Workout[]> => {
	const response = await fetch(`${API_BASE_URL}/recentWorkouts/get/${id}`, {
    	method: "GET",
    	headers: {
        	"Content-Type": "application/json",
    	}
	});
	if (!response.ok) {
    	throw new Error("Failed to fetch workouts");
	}

    const data = await response.json();
    const workoutList = data[0]?.workoutData || [];
    return workoutList;
};

export const addRecentWorkout  = async (id: string, workout:Workout): Promise<Workout> => {
	const response = await fetch(`${API_BASE_URL}/recentWorkouts/add/${id}`, {
    	method: "POST",
    	headers: {
        	"Content-Type": "application/json",
    	},
        body: JSON.stringify({workout}),
	});
	if (!response.ok) {
    	throw new Error("Failed to add workouts");
	}

    return response.json();
};


export const getSavedWorkouts  = async (id: string): Promise<Workout[]> => {
	const response = await fetch(`${API_BASE_URL}/savedWorkouts/get/${id}`, {
    	method: "GET",
    	headers: {
        	"Content-Type": "application/json",
    	}
	});
	if (!response.ok) {
    	throw new Error("Failed to fetch workouts");
	}

    const data = await response.json();
    const workoutList = data[0]?.workoutData || [];
    return workoutList;
};

export const addSavedWorkout  = async (id: string, workout:Workout): Promise<Workout> => {
	const response = await fetch(`${API_BASE_URL}/savedWorkouts/add/${id}`, {
    	method: "POST",
    	headers: {
        	"Content-Type": "application/json",
    	},
        body: JSON.stringify({workout}),
	});
	if (!response.ok) {
    	throw new Error("Failed to add workouts");
	}

    return response.json();
};

export const deleteSavedWorkouts  = async (id: string): Promise<void> => {
	const response = await fetch(`${API_BASE_URL}/savedWorkouts/delete/${id}`, {
    	method: "DELETE",
    	headers: {
        	"Content-Type": "application/json",
    	}
	});
	if (!response.ok) {
    	throw new Error("Failed to delete workouts");
	}
};