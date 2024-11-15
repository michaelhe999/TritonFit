import React, {PropsWithChildren} from "react"
import SelectButton from "../SelectButton";
import { FormWrapper } from "../FormWrapper";

export function StepOne() {
    return (
        <FormWrapper title="Gender">
            <SelectButton info="Female" />
            <SelectButton info="Male" />
            <SelectButton info="Neither" />
            <SelectButton info="Prefer not to say" />
        </FormWrapper>
    )
}