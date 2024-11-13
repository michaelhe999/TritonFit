import { Exercise, Difficulty } from "../types/exercise"
import styles from './components.module.css';
import rightArrow from "../assets/rightArrow.svg"

export const SingleWorkout = ({ exercise }: { exercise: Exercise }) => {
    
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
        <ul className={styles.exerciseItem}>
            <div className={styles.exerciseLeftSection}>
                <div style={{fontSize:'16px', fontWeight:'600'}}>{exercise.name}</div> 
                <div style={{fontSize:'14px', color:'#686868'}}>{exercise.duration} min</div>
            </div>
            <div className={styles.exerciseRightSection}>
                <div style={{fontSize:'14px', color: getDifficultyClass(exercise.difficulty) }}>{exercise.difficulty}</div> 
                <div>
                    <button style={{border:'none', paddingTop: '15px'}}><img src={rightArrow} alt="rightArrow" /></button>
                </div>
            </div>
        </ul>
    );
};