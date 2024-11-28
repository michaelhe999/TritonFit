import { generateWorkout } from "../utils/workoutGenerator-utils"
import { useEffect, useState } from 'react';
import { WorkoutFormResponses, WorkoutList } from "../types/workout";
import styles from './RecommendedWorkouts.module.css'
import miniLogo from '../assets/miniLogo.svg'
import { SingleWorkout } from "../components/WorkoutRelated/SingleWorkout";
import blackLeftArrow from '../assets/blackLeftArrow.svg'
import { useLocation, useNavigate } from "react-router-dom";

const sampleResponse: WorkoutFormResponses = {
    gender: 'male',
    goal: 'muscle gain',
    targetArea: 'chest',
    level: 'intermediate',
    duration: '60'
}

async function getWorkouts(data:WorkoutFormResponses) {
    const response = await generateWorkout(data);
    return response;
}

export const RecommendedWorkouts = () => {
    const [workouts, setWorkouts] = useState<WorkoutList>();
    const location = useLocation();
    const workoutData:WorkoutFormResponses = location.state?.data || sampleResponse;
    const prevWorkoutList:WorkoutList = location.state?.workoutList || null;

    useEffect(() => {
        if (!prevWorkoutList) {
            getWorkouts(workoutData).then(response => {
                setWorkouts(response);
            });
        } else {
            setWorkouts(prevWorkoutList);
        }
    }, []);

    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/createWorkout");
    };

    return (
        <div>
            {workouts ? 
                <div>
                    <div style={{ display: 'inline-block' }}>
                        <button className = {styles.backButton} onClick={handleBack}>
                            <img 
                                src={blackLeftArrow} 
                                alt="back arrow" 
                            />
                        </button>
                        <img className = {styles.logo} src = {miniLogo} alt="miniLogo"></img>
                        
                    </div>
                    
                    <h1 className = {styles.header} >Recommended Workouts For You</h1>
                    {workouts.workouts.map((workout) => {
                        return <SingleWorkout workout={workout} exercises={workout.exercises} workoutList={workouts}/>
                    })}
                </div>

            : 'Loading...'}
            
            
        </div>
    );

}
