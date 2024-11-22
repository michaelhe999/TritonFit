import { Exercise } from "../types/exercise"
import greenCheckMark from '../assets/greenCheckMark.svg'
import blackCheckMark from '../assets/blackCheckMark.svg'
import { useState } from "react"
import styles from './components.module.css'
interface SingleExerciseProps {
    exercise: Exercise;
}

export const SingleExercise = ({ exercise }: SingleExerciseProps) => {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
    }

    return (
        <button 
            onClick={handleClick}
            style={{
                display: 'flex', 
                gap: '40px', 
                border: '1px, solid, #686868',
                borderRadius: '20px',
                backgroundColor: clicked ? 'rgba(103, 254, 154, 0.37)' : 'white', 
                padding: '10px', 
                cursor: 'pointer',
                width: '366px',
                marginLeft: '13px'
            }} >
            {clicked 
                ? <img className = {styles.exercisePageCheckIcon} src = {greenCheckMark} alt = 'greenCheckMark'/>  
                : <img className = {styles.exercisePageCheckIcon} src = {blackCheckMark} alt = 'blackCheckMark'/>}
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft:'10px' }}>
                <p style={{
                        fontSize:'16px',
                        fontWeight:'bold',
                        fontFamily:'Manrope',
                        marginBottom:'5px',
                        marginTop:'0px',
                        marginLeft:'0px'
                    }}>
                        {exercise.name}
                </p>
                <p style={{
                        fontSize:'16px',
                        fontFamily:'Manrope',
                        color:'#686868',
                        margin:'0'
                    }}>
                        {`${exercise.sets} sets of ${exercise.reps} reps`}
                </p>
            </div>
        </button>
    );
}