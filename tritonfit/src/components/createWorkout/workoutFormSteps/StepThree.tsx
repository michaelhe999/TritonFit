import React, {PropsWithChildren} from "react"
import SelectButton from "../SelectButton";
import { FormWrapper } from "../FormWrapper";

export function StepThree() {
    return (
        <FormWrapper title="Time">
            <SelectButton info="20-30 min" />
            <SelectButton info="30-50 min" />
            <SelectButton info="60 min +" />
        </FormWrapper>
    )
}