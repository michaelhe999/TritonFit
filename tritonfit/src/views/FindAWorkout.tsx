import { useState } from "react"
import styles from './FindAWorkout.module.css';
import { Exercise, ex1 } from "../types/exercise";
import dumbellIcon  from "../assets/dumbellFindWorkoutPage.svg"
import { SingleExercise } from "../components/SingleExercise";

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
    const [recentWorkouts, setRecentWorkouts] =  useState<Exercise[]>([])

    const handleRecentWorkoutClick = () => {
        setRecentWorkoutClicked(true);
    }

    const handleSavedWorkoutClick = () => {
        setRecentWorkoutClicked(false);
    }

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

            <div className ={styles.search}>
                <label> Search</label>
                <input type="text" className = {styles.searchBar} />
            </div>
             
            <div>
                { recentWorkoutClicked
                    ? recentWorkouts?.length === 0 
                        ? <NoWorkoutRender/> 
                        :recentWorkouts.map((currExercise) => <SingleExercise exercise = {currExercise}/>)
                    : savedWorkouts?.length ===0 
                        ? <NoWorkoutRender/>
                        :savedWorkouts.map((currExercise) => <SingleExercise exercise = {currExercise}/>)
                }
            </div>

            <button className= {styles.generateButton}> Generate new workout</button>

        </>
    );
}