import { useState } from "react"
import styles from './FindAWorkout.module.css';
import { Exercise, Difficulty } from "../types/exercise";
import dumbellIcon  from "../assets/dumbellFindWorkoutPage.svg"
import { SingleExercise } from "../components/SingleExercise";
import { SearchBar } from "../components/SearchBar";

// Exercises are hard coded until database is integrated; remove once database integrated
const ex1: Exercise[] = [
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

const NoWorkoutRender = () => {
    return (
        <>
            <h1 className={styles.noWorkoutHeader}>No workouts yet</h1>  
            <p className = {styles.noWorkoutText}>You don’t have any workouts yet. Generate a new workout now!</p>
            <img className = {styles.dumbellIcon} src={dumbellIcon} alt = "dumbellIcon"/> 
        </>   
    );
}

export const FindAWorkout = () => {
    const [recentWorkoutClicked, setRecentWorkoutClicked] = useState<boolean>(true);

    const [savedWorkouts, setSavedWorkouts] =  useState<Exercise[]>(ex1)
    const [recentWorkouts, setRecentWorkouts] =  useState<Exercise[]>(ex1)

    const handleRecentWorkoutClick = () => {
        setRecentWorkoutClicked(true);
        resetSearch();
    }

    const handleSavedWorkoutClick = () => {
        setRecentWorkoutClicked(false);
        resetSearch();
    }

    const [filteredRecentExercises, setFilteredRecentExercises] = useState<Exercise[]>(recentWorkouts);
    const [filteredSavedExercises, setFilteredSavedExercises] = useState<Exercise[]>(savedWorkouts);

    const handleRecentSearchResults = (results: Exercise[]) => {
        setFilteredRecentExercises(results);
    };

    const handleSavedSearchResults = (results: Exercise[]) => {
        setFilteredSavedExercises(results);
    };

    const resetSearch = () => {
        setFilteredRecentExercises(recentWorkouts);  
        setFilteredSavedExercises(savedWorkouts);
    };

    return (
        <>
            <h1 className = {styles.header} >Find A Workout</h1>
            <div className = {styles.buttonRow}>
                <button 
                    className={ recentWorkoutClicked 
                            ? styles.buttonClicked 
                            : styles.buttonNotClicked }
                    onClick={handleRecentWorkoutClick} >
                    Recent Workouts
                </button>

                <button 
                    className ={!recentWorkoutClicked 
                            ? styles.buttonClicked 
                            : styles.buttonNotClicked}
                    onClick={handleSavedWorkoutClick} >
                    Saved Workouts
                </button>
            </div>
             
            <div>
                { recentWorkoutClicked
                    ? recentWorkouts?.length === 0 
                        ? <NoWorkoutRender/> 
                        : <>
                            <SearchBar
                                items={recentWorkouts}
                                onResults={handleRecentSearchResults}
                                searchKey="name" 
                                resetCondition={setRecentWorkoutClicked}
                            />
                            <div>
                                {filteredRecentExercises.map((currExercise) => (
                                    <SingleExercise exercise={currExercise} />
                                ))}
                            </div>
                        </>
                    : savedWorkouts?.length ===0 
                        ? <NoWorkoutRender/>
                        : <>
                            <SearchBar
                                items={savedWorkouts}
                                onResults={handleSavedSearchResults}
                                searchKey="name" 
                                resetCondition={setRecentWorkoutClicked}
                            />
                            <div>
                                {filteredSavedExercises.map((currExercise) => (
                                    <SingleExercise exercise={currExercise} />
                                ))}
                            </div>
                        </>
                }
            </div>

            <button className= {styles.generateButton}> Generate new workout</button>

        </>
    );
}