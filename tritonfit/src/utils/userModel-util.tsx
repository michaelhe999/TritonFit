import { API_BASE_URL } from "../constants/apiBase";
import { User } from "../types/user";


export const addUser = async (user: User): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/user/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  
    if (!response.ok) {
    	throw new Error("Failed to add workouts");
	}
  
    return response.json(); // Return the newly created user object
  };