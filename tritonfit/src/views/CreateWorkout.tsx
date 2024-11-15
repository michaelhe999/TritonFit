import { FormEvent, useState } from "react"
import { useMultistepForm } from "../components/createWorkout/useMultistepForm"
import "./CreateWorkout.css"
import { StepOne } from "../components/createWorkout/workoutFormSteps/StepOne"
import { StepTwo } from "../components/createWorkout/workoutFormSteps/StepTwo"
import { StepThree } from "../components/createWorkout/workoutFormSteps/StepThree"
import leftArrow from "../assets/leftArrow.svg"
import { NavLink } from "react-router-dom"

const INITIAL_DATA = {}

export function CreateWorkout() {
    const [data, setData] = useState(INITIAL_DATA)
    const { steps, stepIndex, step, isFirstStep, isLastStep, back, next } = useMultistepForm([ <StepOne />, <StepTwo />, <StepThree /> ])

    function onSubmit(e: FormEvent) {
        e.preventDefault()
        if (!isLastStep) return next()
        alert("Successful Workout Creation")
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