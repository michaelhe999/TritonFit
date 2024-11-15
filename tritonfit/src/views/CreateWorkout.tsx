import { FormEvent, useState } from "react"
import { useMultistepForm } from "../components/createWorkout/useMultistepForm"
import "./CreateWorkout.css"
import { StepOne } from "../components/createWorkout/workoutFormSteps/StepOne"
import { StepTwo } from "../components/createWorkout/workoutFormSteps/StepTwo"
import { StepThree } from "../components/createWorkout/workoutFormSteps/StepThree"

const INITIAL_DATA = {}

export function CreateWorkout() {
    const [data, setData] = useState(INITIAL_DATA)
    const { steps, stepIndex, step, isFirstStep, isLastStep, back, next } = useMultistepForm([ <StepOne />, <StepTwo />, <StepThree /> ])

    function onSubmit(e: FormEvent) {
        e.preventDefault()
        next()
    }

    return (
        <div className="workoutForm">
            <form onSubmit={onSubmit}>
                <div className="stepTracker">
                    {stepIndex + 1} / {steps.length}
                </div>
                {step}
                <div className="buttonSpace">
                    {!isFirstStep && (
                        <button type="button" onClick={back}>
                            Back
                        </button>)}
                    <button type="submit">
                        {isLastStep ? "Submit" : "Next"}
                    </button>
                </div>
            </form>
        </div>
    )
}