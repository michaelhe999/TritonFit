import { FormEvent, useState } from "react"
import { useMultistepForm } from "../components/createWorkout/useMultistepForm"
import "./CreateWorkout.css"
import { StepOne } from "../components/createWorkout/workoutFormSteps/StepOne"
import { StepTwo } from "../components/createWorkout/workoutFormSteps/StepTwo"
import { StepThree } from "../components/createWorkout/workoutFormSteps/StepThree"
import { StepFour } from "../components/createWorkout/workoutFormSteps/StepFour"
import { StepFive } from "../components/createWorkout/workoutFormSteps/StepFive"
import leftArrow from "../assets/leftArrow.svg"
import { NavLink, useNavigate } from "react-router-dom"
import { WorkoutFormResponses } from "../types/workout"
import { RecommendedWorkouts } from "./RecommendedWorkouts"

const INITIAL_DATA: WorkoutFormResponses = {
    gender: "",
    goal: "",
    targetArea: "",
    level: "",
    duration: ""
}

export function CreateWorkout() {
    const [data, setData] = useState(INITIAL_DATA)
    const navigate = useNavigate();

    function updateFields(fields: Partial<WorkoutFormResponses>) {
        setData(prev => {
            return { ...prev, ...fields }
        })
    }

    const { steps, stepIndex, step, isFirstStep, isLastStep, back, next } = useMultistepForm([ 
    <StepOne {...data} updateFields={updateFields} />, 
    <StepTwo {...data} updateFields={updateFields} />, 
    <StepThree {...data} updateFields={updateFields} />,
    <StepFour {...data} updateFields={updateFields} />,
    <StepFive {...data} updateFields={updateFields} />
    ])

    function onSubmit(e: FormEvent) {
        e.preventDefault()
        if (!isLastStep) return next()
        navigate("/recommendedWorkouts", { state: { data } });
    }

    return (
        <div className="workoutForm">
            <form onSubmit={onSubmit}>
                <div>
                    <NavLink to="/findworkout"><img src={leftArrow} alt="leftArrow" /></NavLink>
                </div>
                <div className="stepTracker">
                    {stepIndex + 1} / {steps.length}
                </div>
                {step}
                <div className="buttonSpace">
                    {!isFirstStep && (
                        <button type="button" onClick={back} className="backwards">
                            Back
                        </button>)}
                    <button type="submit" className="onwards">
                        {isLastStep ? "Submit" : "Next"}
                    </button>
                </div>
            </form>
        </div>
    )
}