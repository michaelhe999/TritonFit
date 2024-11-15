import React, {PropsWithChildren} from "react"
import SelectButton from "../SelectButton";
import { FormWrapper } from "../FormWrapper";

export function StepTwo() {
    return (
        <FormWrapper title="Muscle">
            <p className="desc">
                What areas of your body do you want to target for this workout?
            </p>
            <SelectButton info="Shoulders" />
            <SelectButton info="Chest" />
            <SelectButton info="Triceps" />
            <SelectButton info="Biceps" />
            <SelectButton info="Back" />
            <SelectButton info="Legs" />
        </FormWrapper>
    )
}