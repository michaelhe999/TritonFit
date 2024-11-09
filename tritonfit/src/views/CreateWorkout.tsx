import { useMultistepForm } from "../components/createWorkout/useMultistepForm"
import "./CreateWorkout.css"
import { StepOne } from "../components/createWorkout/workoutFormSteps/StepOne"
import { StepTwo } from "../components/createWorkout/workoutFormSteps/StepTwo"
import { StepThree } from "../components/createWorkout/workoutFormSteps/StepThree"

export function CreateWorkout() {
    const { steps, stepIndex, step, isFirstStep, isLastStep, back, next } = useMultistepForm([ <StepOne />, <StepTwo />, <StepThree /> ])

    
    return (
        <div className="workoutForm">
            <form>
                <div className="stepTracker">
                    {stepIndex + 1} / {steps.length}
                </div>
                {step}
                <div className="buttonSpace">
                    {!isFirstStep && (
                        <button type="button" onClick={back}>
                            Back
                        </button>)}
                    <button type="button" onClick={next}>
                        {isLastStep ? "Submit" : "Next"}
                    </button>
                </div>
            </form>
        </div>
    )
}