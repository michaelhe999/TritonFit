import styles from './components.module.css';
import rightArrow from "../../assets/rightArrow.svg"
import { Workout, Difficulty, WorkoutList } from "../../types/workout";
import { Exercise } from '../../types/exercise';
import { useNavigate } from "react-router-dom";

interface SingleWorkoutProps {
    workout: Workout,
    exercises: Exercise[],
    workoutList?: WorkoutList
}

export const SingleWorkout = ({ workout, exercises, workoutList}: SingleWorkoutProps) => {
    const navigate = useNavigate();
    
    //Determine color of difficulty for CSS purposes
    const getDifficultyClass = (difficulty: Difficulty) => {
        switch (difficulty) {
            case Difficulty.BEGINNER:
                return '#0BBC47';
            case Difficulty.INTERMEDIATE:
                return '#FFAF7E';
            case Difficulty.ADVANCED:
                return '#CA3227';
            default:
                return "";
        }
    };

    const handleOnClick = () => {
        navigate("/exercises", { state: { exercises, workout, workoutList } });
    };

    return (
        <ul className={styles.workoutItem}>
            <div className={styles.workoutLeftSection}>
                <div style={{fontSize:'16px', fontWeight:'600'}}>{workout.workoutName}</div> 
                <div style={{fontSize:'14px', color:'#686868'}}>{workout.workoutDuration} min</div>
            </div>
            <div className={styles.workoutRightSection}>
                <div style={{fontSize:'14px', color: getDifficultyClass(workout.workoutDifficulty) }}>{workout.workoutDifficulty}</div> 
                <div>
                    <button style={{border:'none', paddingTop: '15px'}} onClick={handleOnClick}><img src={rightArrow} alt="rightArrow" /></button>
                </div>
            </div>
        </ul>
    );
};