import { ReactElement, useState } from "react";

export function useMultistepForm(steps: ReactElement[]) {
    const [stepIndex, setStepIndex] = useState(0)

    const next = () => {
        setStepIndex(i => {
            if (i > steps.length - 1) return i
            return i + 1
        })
    }

    const back = () => {
        setStepIndex(i => {
            if (i <= 0) return i
            return i - 1
        })
    }

    const goTo = (index: number) => {
        setStepIndex(index)
    }

    return {
        stepIndex,
        step: steps[stepIndex],
        steps,
        isFirstStep: stepIndex === 0,
        isLastStep: stepIndex === steps.length - 1,
        next,
        back,
        goTo,
    }
}