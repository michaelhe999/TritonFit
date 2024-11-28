import { useLocation, useNavigate } from 'react-router-dom';
import { Exercise } from '../../types/exercise';
import headerImgForWorkout from '../../assets/headerImgForWorkout.svg';
import alarmIcon from '../../assets/alarmIcon.svg';
import runningManIcon from '../..//assets/runningManIcon.svg';
import whiteLeftArrow from '../../assets/whiteLeftArrow.svg';
import styles from './components.module.css';
import { Workout } from '../../types/workout';
import { SingleExercise } from './SingleExercise';
import EndOfWorkoutDialog from 'components/WorkoutRelated/EndOfWorkoutDialog';

export const ExercisesPage = () => {
    const location = useLocation();
    const exercises:Exercise[] = location.state?.exercises || [];
    const workout:Workout= location.state.workout || null;
    const workoutList:Workout[]= location.state?.workoutList || null;
    const id: string = location.state?.id || '';

    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/recommendedWorkouts", { state: { workoutList } });
    };

    return (
        <div>
            <div style={{ position: 'relative', display: 'inline-block' }}>
                <img 
                    src={headerImgForWorkout} 
                    alt="headerPic" 
                />
                <button 
                    style={{
                    position: 'absolute',
                    top: '20%',
                    left: '5%', 
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer'
                    }}
                    onClick={handleBack}
                >
                    <img 
                        src={whiteLeftArrow} 
                        alt="back arrow" 
                        style={{ width: '14px', height: '24px' }}
                    />
                </button>
            </div>
            <h1 className={styles.exercisePageHeader}> {workout.workoutName}</h1>
            <p className={styles.exercisePageWorkoutDescription}> {workout.workoutDescription}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '50px', marginRight: '50px', marginBottom: '30px'}}>
                <div className={styles.exercisePageInnerDiv}>
                    <img src = {runningManIcon} alt = 'runningManIcon'/>
                    <p style={{fontSize:'24px', fontWeight:'bolder', fontFamily:'Manrope', margin:'0'}}> {workout.exercises.length} </p>
                    <p style={{fontSize:'16px', fontFamily:'Manrope', margin:'0'}}>workouts</p>
                </div>
                <div className={styles.exercisePageInnerDiv}>
                    <img src = {alarmIcon} alt = 'alarmIcon'/>
                    <p style={{fontSize:'24px', fontWeight:'bolder', fontFamily:'Manrope', margin:'0'}}> {workout.workoutDuration} </p>
                    <p style={{fontSize:'16px', fontFamily:'Manrope', margin:'0'}}>minutes</p>
                </div>
            </div>
            <div>
                {exercises.map((exercise) => (
                    <div style={{marginTop:'10px'}}>
                        <SingleExercise exercise = {exercise}/>
                    </div>
                ))}
            </div>
            <EndOfWorkoutDialog workout={workout} id = {id}></EndOfWorkoutDialog>
        </div>
    );
};