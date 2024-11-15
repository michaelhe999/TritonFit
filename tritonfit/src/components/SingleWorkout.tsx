import styles from './components.module.css';
import rightArrow from "../assets/rightArrow.svg"
import { Workout, Difficulty } from "../types/workout";

export const SingleWorkout = ({ workout }: { workout: Workout }) => {
    
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

    return (
        <ul className={styles.workoutItem}>
            <div className={styles.workoutLeftSection}>
                <div style={{fontSize:'16px', fontWeight:'600'}}>{workout.workoutName}</div> 
                <div style={{fontSize:'14px', color:'#686868'}}>{workout.workoutDuration} min</div>
            </div>
            <div className={styles.workoutRightSection}>
                <div style={{fontSize:'14px', color: getDifficultyClass(workout.workoutDifficulty) }}>{workout.workoutDifficulty}</div> 
                <div>
                    <button style={{border:'none', paddingTop: '15px'}}><img src={rightArrow} alt="rightArrow" /></button>
                </div>
            </div>
        </ul>
    );
};