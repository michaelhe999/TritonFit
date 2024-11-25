import { useState } from "react"
import SelectButton from "../SelectButton";
import { FormWrapper } from "../FormWrapper";

type UserData = {
    goal: string
}

type Props = UserData & {
    updateFields: (fields: Partial<UserData>) => void
}

export function StepTwo({ goal, updateFields }: Props) {
    const [selectedValue, setSelectedValue] = useState(goal);
    
    const onSelect = (info: string) => {
        setSelectedValue(info);
        updateFields({ goal: info });
    }

    return (
        <FormWrapper title="Goal Specification">
            <p className="desc">
                Tell us what you are looking for in your workout
            </p>
            <SelectButton info="Weight loss" selected={selectedValue === "Weight loss"} onSelect={() => onSelect("Weight loss")} />
            <SelectButton info="Muscle gain" selected={selectedValue === "Muscle gain"} onSelect={() => onSelect("Muscle gain")} />
            <SelectButton info="Maintenance" selected={selectedValue === "Maintenance"} onSelect={() => onSelect("Maintenance")} />
            <SelectButton info="Improved general health" selected={selectedValue === "Improved general health"} onSelect={() => onSelect("Improved general health")} />
        </FormWrapper>
    )
}