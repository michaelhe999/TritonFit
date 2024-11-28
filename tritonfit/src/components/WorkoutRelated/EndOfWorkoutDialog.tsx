import React, { useState } from 'react';
import { Workout } from 'types/workout';
import { addSavedWorkout, addRecentWorkout } from 'utils/recentAndSavedWorkouts-util';
import styles from './components.module.css'
import dialogIcon from '../../assets/dialogIcon.svg'
import xIcon from '../../assets/x.svg'

interface EndOfWorkoutDialogProps {
    workout: Workout, 
    id: string
}

const EndOfWorkoutDialog = ({workout, id} : EndOfWorkoutDialogProps) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [saveWorkout, setSaveWorkout] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  const addWorkout = async () => {
    setSaveWorkout(true);
  }

  const dontAddWorkout = async () => {
    setSaveWorkout(false);
  }

  const submitInfo = async () => {
    if (saveWorkout) {
        try {
            await addSavedWorkout(id, workout);
        } catch (err: any) {
          console.log(err.message);
        }
    }
    try {
      await addRecentWorkout(id, workout);
      } catch (err: any) {
        console.log(err.message);
    }
    handleCloseDialog();    
  };

  return (
    <div>
      <button className = {styles.finishWorkoutButton} onClick={handleOpenDialog}>Finish Workout</button>

      {isDialogOpen && (
        <div className= {styles.overlay}>
          <div className={styles.dialog}>
            <div className = {styles.icons}>
              <img src = {dialogIcon} alt = 'dialogIcond'/>
              <button className = {styles.noStyleButton} onClick={handleCloseDialog}><img src = {xIcon} alt = 'closeDialog'/></button>
              
            </div>
            <p>Congratulations on completing the workout! Would you like to add this to your saved workouts?</p>
            <button className = {saveWorkout ? styles.clicked : styles.unclicked} onClick={addWorkout}>Yes</button>  
            <button className = {!saveWorkout ? styles.clicked : styles.unclicked} onClick={dontAddWorkout}>No</button>
            <p>How many hours was your workout?</p>
            <input type='text' placeholder='enter a number' className = {styles.input} onChange={(e) => setInputValue(e.target.value)}/>
            <button className = {styles.clicked} onClick={submitInfo}>Update my performance </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default EndOfWorkoutDialog;
